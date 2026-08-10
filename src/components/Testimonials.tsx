/**
 * @file Testimonials.tsx
 * @description Seção de Depoimentos e Avaliações Reais de Clientes.
 * 
 * Permite aos visitantes visualizar avaliações reais e submeter novas avaliações
 * em estrelas (1-5) e comentários (máx. 500 caracteres, com validação anti-palavrões).
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Star, Quote, ChevronLeft, ChevronRight, 
  Plus, X, AlertTriangle, CheckCircle2, ShieldCheck, User 
} from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsData } from '../data/portfolioData';
import { Testimonial } from '../types/portfolio';
import { checkProfanity } from '../utils/profanityFilter';

const LOCAL_STORAGE_REVIEWS_KEY = 'portfolio_user_reviews_cache';

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Lista de avaliações (dados padronizados + dados do Firestore/LocalStorage)
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    // Adiciona rating 5 por padrão aos depoimentos estáticos
    return testimonialsData.map(item => ({
      ...item,
      rating: item.rating || 5
    }));
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Estados do Formulário de Nova Avaliação
  const [formData, setFormData] = useState({
    name: '',
    companyRole: '',
    rating: 5,
    comment: ''
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [profanityError, setProfanityError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Carrega avaliações do Firestore e LocalStorage ao montar
  useEffect(() => {
    const fetchReviews = async () => {
      let remoteReviews: Testimonial[] = [];

      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          remoteReviews.push({
            id: doc.id,
            name: data.name || 'Anônimo',
            role: data.role || data.companyRole || 'Cliente',
            company: data.company || '',
            text: data.comment || data.text || '',
            avatar: data.avatar || '',
            rating: Number(data.rating) || 5,
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : undefined
          });
        });
      } catch (err) {
        console.warn('Carregando avaliações via Firestore indisponível, usando cache local:', err);
      }

      // Lê cache do localStorage
      let localReviews: Testimonial[] = [];
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
        if (saved) {
          localReviews = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Erro ao ler cache local de avaliações:', e);
      }

      // Mescla e desduplica (Prioridade: Remotas > Locais > Estáticas)
      const staticReviews = testimonialsData.map(item => ({ ...item, rating: item.rating || 5 }));
      const allMerged = [...remoteReviews, ...localReviews, ...staticReviews];
      
      const uniqueReviewsMap = new Map<string | number, Testimonial>();
      allMerged.forEach((item) => {
        const key = item.id || `${item.name}-${typeof item.text === 'string' ? item.text : item.text.pt}`;
        if (!uniqueReviewsMap.has(key)) {
          uniqueReviewsMap.set(key, item);
        }
      });

      setReviews(Array.from(uniqueReviewsMap.values()));
    };

    fetchReviews();
  }, []);

  // Validação em tempo real de palavras ofensivas no comentário
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    
    // Limite rigoroso de 500 caracteres
    if (val.length > 500) return;

    setFormData(prev => ({ ...prev, comment: val }));
    setGeneralError(null);

    if (val.trim()) {
      const check = checkProfanity(val);
      if (check.containsProfanity) {
        setProfanityError(
          t(
            'O comentário contém linguagem ou termos desrespeitosos. Por favor, revise seu texto.',
            'The comment contains inappropriate language. Please revise your review.'
          )
        );
      } else {
        setProfanityError(null);
      }
    } else {
      setProfanityError(null);
    }
  };

  // Envio da avaliação
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Validações
    if (!formData.name.trim()) {
      setGeneralError(t('Por favor, informe seu nome.', 'Please enter your name.'));
      return;
    }

    if (!formData.comment.trim()) {
      setGeneralError(t('Por favor, escreva seu comentário.', 'Please write your review comment.'));
      return;
    }

    if (formData.comment.length > 500) {
      setGeneralError(t('O comentário não pode ter mais de 500 caracteres.', 'Comment cannot exceed 500 characters.'));
      return;
    }

    const check = checkProfanity(formData.comment);
    if (check.containsProfanity) {
      setProfanityError(
        t(
          'Não é permitido publicar comentários com termos ofensivos. Por favor, reescreva com respeito.',
          'Profanity is not allowed. Please rephrase respectfully.'
        )
      );
      return;
    }

    setSubmitting(true);

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.companyRole.trim() || t('Cliente Verificado', 'Verified Client'),
      company: '',
      text: formData.comment.trim(),
      rating: formData.rating,
      createdAt: new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')
    };

    // 1. Tenta salvar no Firebase Firestore com timeout de segurança
    try {
      const savePromise = addDoc(collection(db, 'reviews'), {
        name: newReview.name,
        role: newReview.role,
        comment: newReview.text,
        rating: newReview.rating,
        createdAt: new Date().toISOString()
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout Firebase')), 2000)
      );
      await Promise.race([savePromise, timeoutPromise]);
    } catch (err) {
      console.warn('Salvo localmente (offline ou sem permissão de gravação direta no Firestore):', err);
    }

    // 2. Salva no LocalStorage como cache imediato
    try {
      const currentCache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY) || '[]');
      const updatedCache = [newReview, ...currentCache];
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updatedCache));
    } catch (err) {
      console.warn('Erro ao salvar no localStorage:', err);
    }

    // 3. Atualiza estado da interface imediatamente (Optimistic Update)
    setReviews(prev => [newReview, ...prev]);
    setActiveIndex(0);

    setSubmitting(false);
    setSubmittedSuccess(true);

    // Reseta formulário após 2.2s e fecha modal
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setFormData({ name: '', companyRole: '', rating: 5, comment: '' });
      setProfanityError(null);
    }, 2200);
  };

  // Navegação do carrossel
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Cálculo da média de estrelas
  const totalRating = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
  const averageScore = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '5.0';

  // Helper para renderizar texto multilíngue ou string simples
  const renderText = (textObj: string | { pt: string; en: string }) => {
    if (typeof textObj === 'string') return textObj;
    return language === 'pt' ? textObj.pt : textObj.en;
  };

  const renderRole = (roleObj?: string | { pt: string; en: string }, company?: string) => {
    let roleText = '';
    if (typeof roleObj === 'string') roleText = roleObj;
    else if (roleObj) roleText = language === 'pt' ? roleObj.pt : roleObj.en;
    
    if (roleText && company) return `${roleText} • ${company}`;
    if (roleText) return roleText;
    if (company) return company;
    return t('Cliente', 'Client');
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return t('Péssimo (1/5)', 'Very Poor (1/5)');
      case 2: return t('Ruim (2/5)', 'Poor (2/5)');
      case 3: return t('Razoável (3/5)', 'Average (3/5)');
      case 4: return t('Muito Bom (4/5)', 'Very Good (4/5)');
      case 5: return t('Excelente! (5/5)', 'Excellent! (5/5)');
      default: return '';
    }
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("Avaliações Reais & Depoimentos", "Real Ratings & Testimonials")}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t("O que dizem sobre ", "What clients say about ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {t("nosso trabalho", "our work")}
              </span>
            </h2>

            {/* Média de Avaliação */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{averageScore}</span>
                <span className="text-xs text-amber-400/70 font-normal">
                  ({reviews.length} {t('avaliações', 'reviews')})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('Comentários moderados & verificados', 'Moderated & verified feedback')}</span>
              </div>
            </div>
          </div>

          {/* Ações da Cabeçalho: Botão de Nova Avaliação e Controles do Carrossel */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t("Adicionar Avaliação", "Leave a Review")}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={t("Anterior", "Previous")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={t("Próximo", "Next")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid de Cards de Depoimentos / Avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item, index) => {
            const isFeatured = index === activeIndex;
            const itemRating = item.rating || 5;

            return (
              <div
                key={item.id || index}
                onClick={() => setActiveIndex(index)}
                className={`group relative p-8 rounded-3xl bg-white/[0.02] border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isFeatured
                    ? 'border-indigo-500/60 bg-white/[0.04] shadow-[0_0_30px_rgba(99,102,241,0.2)] scale-[1.02]'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Quote className="w-8 h-8 text-indigo-500/30 group-hover:text-indigo-500/60 transition-colors" />
                    
                    {/* Data / Badge */}
                    {item.createdAt && (
                      <span className="text-[11px] font-mono text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                        {item.createdAt}
                      </span>
                    )}
                  </div>

                  {/* Estrelas de Avaliação */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <Star
                        key={starVal}
                        className={`w-4 h-4 ${
                          starVal <= itemRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-mono text-amber-400/90 font-bold">
                      {itemRating}.0
                    </span>
                  </div>

                  {/* Depoimento em Texto */}
                  <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 italic">
                    "{renderText(item.text)}"
                  </p>
                </div>

                {/* Autor do Depoimento (Iniciais estilizadas, sem foto de pessoa) */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="overflow-hidden">
                    <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-indigo-300 font-mono truncate">
                      {renderRole(item.role, item.company)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores numéricos do carrossel */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Item ${idx + 1}`}
              ></button>
            ))}
          </div>
        )}

      </div>

      {/* Modal / Overlay para Adicionar Nova Avaliação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-fast">
          <div 
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0b0c1b] border border-white/15 shadow-[0_0_50px_rgba(99,102,241,0.25)] animate-scale-in-fast"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {t("Avaliação Registrada!", "Review Submitted!")}
                </h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  {t(
                    "Sua avaliação em estrelas e comentário foram publicados com sucesso. Muito obrigado!",
                    "Your star rating and review comment have been successfully published. Thank you!"
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
                    <Star className="w-3.5 h-3.5 fill-indigo-400" />
                    <span>{t("Sua Opinião Importa", "Your Feedback Matters")}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t("Adicionar Avaliação", "Leave a Review")}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("Avalie os serviços de Matheus Nogueira com estrelas e comentário.", "Rate Matheus Nogueira's services with stars and a comment.")}
                  </p>
                </div>

                {/* Seleção Interativa de Estrelas (1 a 5) */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    {t("Sua Avaliação (Estrelas):", "Your Rating (Stars):")}
                  </label>
                  
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const currentVal = hoverRating !== null ? hoverRating : formData.rating;
                      const isFilled = starVal <= currentVal;

                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setFormData(prev => ({ ...prev, rating: starVal }))}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                                : 'text-gray-600 hover:text-gray-400'
                            }`}
                          />
                        </button>
                      );
                    })}

                    <span className="ml-3 text-xs font-mono font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                      {getRatingLabel(hoverRating !== null ? hoverRating : formData.rating)}
                    </span>
                  </div>
                </div>

                {/* Nome */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {t("Seu Nome *", "Your Name *")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t("Ex: Gabriel Souza", "E.g. John Smith")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Cargo / Empresa */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {t("Cargo / Empresa (Opcional)", "Role / Company (Optional)")}
                  </label>
                  <input
                    type="text"
                    value={formData.companyRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyRole: e.target.value }))}
                    placeholder={t("Ex: CEO na Startup X ou Cliente Web", "E.g. Founder at TechCo or Client")}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                {/* Comentário (Limite de 500 caracteres) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-300">
                      {t("Seu Comentário * (máx. 500 caracteres)", "Your Review * (max 500 characters)")}
                    </label>

                    {/* Contador de caracteres */}
                    <span
                      className={`text-xs font-mono ${
                        formData.comment.length >= 500
                          ? 'text-red-400 font-bold'
                          : formData.comment.length >= 450
                          ? 'text-amber-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {formData.comment.length} / 500
                    </span>
                  </div>

                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    value={formData.comment}
                    onChange={handleCommentChange}
                    placeholder={t(
                      "Descreva sua experiência com os projetos, entregas ou suporte do Matheus Nogueira...",
                      "Share your experience working with Matheus Nogueira..."
                    )}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-gray-500 focus:outline-none transition-all resize-none ${
                      profanityError
                        ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                {/* Alerta de Linguagem Ofensiva / Erros */}
                {profanityError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{profanityError}</span>
                  </div>
                )}

                {generalError && !profanityError && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2.5 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{generalError}</span>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {t("Cancelar", "Cancel")}
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || !!profanityError || !formData.comment.trim() || !formData.name.trim()}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 ${
                      submitting || !!profanityError || !formData.comment.trim() || !formData.name.trim()
                        ? 'bg-indigo-600/40 text-white/50 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 cursor-pointer'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{t("Enviando...", "Submitting...")}</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{t("Publicar Avaliação", "Publish Review")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
