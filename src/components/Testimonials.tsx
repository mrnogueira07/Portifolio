/**
 * @file Testimonials.tsx
 * @description Seção de Depoimentos e Avaliações Reais de Clientes em Nuvem (Firebase Firestore).
 * 
 * Permite aos visitantes visualizar avaliações em tempo real sincronizadas com a nuvem
 * e submeter novas avaliações em estrelas (1 a 5) com validação rigorosa anti-palavrões,
 * xingamentos, abusos e moderação de conteúdo em tempo real.
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Star, Quote, ChevronLeft, ChevronRight, 
  Plus, X, AlertTriangle, CheckCircle2, User, Sparkles
} from 'lucide-react';
import { collection, addDoc, onSnapshot, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsData } from '../data/portfolioData';
import { Testimonial } from '../types/portfolio';
import { checkProfanity } from '../utils/profanityFilter';

const LOCAL_STORAGE_REVIEWS_KEY = 'portfolio_user_reviews_cache';

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Lista de avaliações (estáticas base + dados em tempo real da nuvem Firestore)
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
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

  // Sincronização em tempo real com o Firebase Firestore (Cloud Database)
  useEffect(() => {
    let isMounted = true;

    // 1. Tenta carregar cache local prévio de imediato
    let localCached: Testimonial[] = [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (saved) {
        localCached = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao ler cache local de avaliações:', e);
    }

    const mergeReviews = (cloudReviews: Testimonial[]) => {
      const staticReviews = testimonialsData.map(item => ({ ...item, rating: item.rating || 5 }));
      
      // Prioridade: Nuvem (cloudReviews) > Cache local (localCached) > Depoimentos fixos
      const allMerged = [...cloudReviews, ...localCached, ...staticReviews];
      
      const uniqueMap = new Map<string | number, Testimonial>();
      allMerged.forEach((item) => {
        const key = item.id || `${item.name}-${typeof item.text === 'string' ? item.text : item.text.pt}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });

      if (isMounted) {
        setReviews(Array.from(uniqueMap.values()));
      }
    };

    // 2. Escuta mudanças em tempo real na coleção 'reviews' do Firestore
    try {
      const reviewsCol = collection(db, 'reviews');
      const unsubscribe = onSnapshot(
        reviewsCol,
        (querySnapshot) => {
          const cloudList: (Testimonial & { timestampNum: number })[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            let dateStr: string | undefined = undefined;
            let timeVal = 0;

            if (data.createdAt) {
              if (typeof data.createdAt.toDate === 'function') {
                const d = data.createdAt.toDate();
                dateStr = d.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US');
                timeVal = d.getTime();
              } else if (typeof data.createdAt === 'string') {
                const d = new Date(data.createdAt);
                dateStr = d.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US');
                timeVal = d.getTime();
              }
            } else if (data.publishedAtIso) {
              const d = new Date(data.publishedAtIso);
              dateStr = d.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US');
              timeVal = d.getTime();
            }

            cloudList.push({
              id: doc.id,
              name: data.name || 'Cliente',
              role: data.role || data.companyRole || t('Cliente Verificado', 'Verified Client'),
              company: data.company || '',
              text: data.comment || data.text || '',
              avatar: data.avatar || '',
              rating: Number(data.rating) || 5,
              createdAt: dateStr || new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US'),
              timestampNum: timeVal || Date.now()
            });
          });

          // Ordena os mais recentes no topo
          cloudList.sort((a, b) => b.timestampNum - a.timestampNum);

          mergeReviews(cloudList);
        },
        (error) => {
          console.warn('Erro ao escutar Firestore em tempo real, tentando busca pontual:', error);
          // Fallback de busca simples caso onSnapshot falhe
          getDocs(collection(db, 'reviews'))
            .then((snap) => {
              const cloudList: Testimonial[] = [];
              snap.forEach((doc) => {
                const data = doc.data();
                cloudList.push({
                  id: doc.id,
                  name: data.name || 'Cliente',
                  role: data.role || data.companyRole || t('Cliente Verificado', 'Verified Client'),
                  company: '',
                  text: data.comment || data.text || '',
                  avatar: '',
                  rating: Number(data.rating) || 5,
                  createdAt: new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')
                });
              });
              mergeReviews(cloudList);
            })
            .catch(() => {
              mergeReviews([]);
            });
        }
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (err) {
      console.warn('Inicialização do listener do Firestore:', err);
      mergeReviews([]);
      return () => {
        isMounted = false;
      };
    }
  }, [language]);

  // Validação em tempo real ao digitar o comentário
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length > 500) return;

    setFormData(prev => ({ ...prev, comment: val }));
    setGeneralError(null);

    if (val.trim()) {
      const check = checkProfanity(val);
      if (check.containsProfanity) {
        setProfanityError(
          t(
            'Linguagem imprópria ou termos ofensivos detectados. Por favor, mantenha um comentário respeitoso e profissional.',
            'Inappropriate language or offensive terms detected. Please keep your review respectful and professional.'
          )
        );
      } else {
        setProfanityError(null);
      }
    } else {
      setProfanityError(null);
    }
  };

  // Validação ao digitar nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, name: val }));
    setGeneralError(null);

    if (val.trim()) {
      const check = checkProfanity(val);
      if (check.containsProfanity) {
        setProfanityError(
          t('Por favor, informe um nome válido e respeitoso.', 'Please provide a valid and respectful name.')
        );
      } else {
        setProfanityError(null);
      }
    }
  };

  // Submissão da avaliação para a Nuvem (Firebase Firestore)
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Validações de campos obrigatórios
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

    // Verificação estrita de palavras de baixo calão, xingamentos e abusos
    const commentCheck = checkProfanity(formData.comment);
    const nameCheck = checkProfanity(formData.name);
    const roleCheck = formData.companyRole ? checkProfanity(formData.companyRole) : { containsProfanity: false };

    if (commentCheck.containsProfanity || nameCheck.containsProfanity || roleCheck.containsProfanity) {
      setProfanityError(
        t(
          'Comentário bloqueado: detectamos termos ofensivos ou palavras de baixo calão. Por favor, revise seu texto.',
          'Review blocked: offensive terms or profanities detected. Please revise your text.'
        )
      );
      return;
    }

    setSubmitting(true);

    const nowIso = new Date().toISOString();
    const newReviewItem: Testimonial = {
      id: `cloud-rev-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.companyRole.trim() || t('Cliente Verificado', 'Verified Client'),
      company: '',
      text: formData.comment.trim(),
      rating: formData.rating,
      createdAt: new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')
    };

    // 1. Salva na Nuvem (Firebase Firestore) com timeout de proteção para NUNCA travar
    try {
      const savePromise = addDoc(collection(db, 'reviews'), {
        name: newReviewItem.name,
        role: newReviewItem.role,
        comment: newReviewItem.text,
        rating: newReviewItem.rating,
        createdAt: serverTimestamp(),
        publishedAtIso: nowIso
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firebase timeout')), 4000)
      );

      const res: any = await Promise.race([savePromise, timeoutPromise]);
      if (res && res.id) {
        newReviewItem.id = res.id;
      }
    } catch (err) {
      console.warn('Persistindo atualização otimista localmente:', err);
    }

    // 2. Salva no cache local do navegador
    try {
      const currentCache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY) || '[]');
      const updatedCache = [newReviewItem, ...currentCache.filter((r: any) => r.id !== newReviewItem.id)];
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updatedCache));
    } catch (err) {
      console.warn('Erro ao salvar no localStorage:', err);
    }

    // 3. Atualização otimista imediata na interface
    setReviews(prev => [newReviewItem, ...prev.filter(r => r.id !== newReviewItem.id)]);
    setActiveIndex(0);

    setSubmitting(false);
    setSubmittedSuccess(true);

    // Reseta formulário após animação de sucesso e fecha modal
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setFormData({ name: '', companyRole: '', rating: 5, comment: '' });
      setProfanityError(null);
    }, 1800);
  };

  // Navegação do carrossel
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Cálculo da média de avaliação
  const totalRating = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
  const averageScore = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '5.0';

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
    return t('Cliente Verificado', 'Verified Client');
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
            </div>
          </div>

          {/* Ações do Cabeçalho: Botão de Nova Avaliação e Controles do Carrossel */}
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
                      <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
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

                {/* Autor do Depoimento */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                    {item.name ? item.name.substring(0, 2).toUpperCase() : 'CL'}
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
                  {t("Avaliação Publicada!", "Review Published!")}
                </h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  {t(
                    "Sua avaliação foi salva na nuvem e já está visível publicamente no portfólio. Muito obrigado!",
                    "Your review has been saved to the cloud and is now publicly visible on the portfolio. Thank you!"
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t("Avaliação em Tempo Real", "Real-Time Review")}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t("Adicionar Avaliação", "Leave a Review")}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("Avalie os projetos e serviços com estrelas e comentário moderado.", "Rate projects and services with stars and a moderated review.")}
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
                      onChange={handleNameChange}
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
                      "Descreva sua experiência com os projetos, entregas ou desenvolvimento de Matheus Nogueira...",
                      "Share your experience working with Matheus Nogueira..."
                    )}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-gray-500 focus:outline-none transition-all resize-none ${
                      profanityError
                        ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                {/* Alerta de Linguagem Ofensiva / Baixo Calão / Abusos */}
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
                        <span>{t("Publicando...", "Publishing...")}</span>
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
