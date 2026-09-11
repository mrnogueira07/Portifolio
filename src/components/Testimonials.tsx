/**
 * @file Testimonials.tsx
 * @description Seção de Depoimentos e Avaliações Reais de Clientes.
 * 
 * Exibe as avaliações em carrossel horizontal de 1 linha com 3 cards visíveis,
 * navegação fluida item a item (sem pular nenhum comentário), sem looping nas extremidades,
 * com contagem clara (ex: 01 / 06), botões desabilitados nos limites e suporte a arrastar (drag/touch).
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Star, Quote, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsData } from '../data/portfolioData';
import { Testimonial } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

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

  // Referências e estados para controle do Slider e Drag
  const sliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Estados de arrastar (Drag por mouse / touch)
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);
  const testimonialsSectionRef = useRef<HTMLElement | null>(null);

  // Animação de cabeçalho com GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-testimonials-header', {
        scrollTrigger: {
          trigger: '.gsap-testimonials-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, testimonialsSectionRef);

    return () => ctx.revert();
  }, []);

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

  // Transição suave para um slide específico garantindo que nenhum item seja pulado
  const goToSlide = (index: number) => {
    if (index < 0 || index >= reviews.length || !sliderRef.current) return;

    setActiveIndex(index);
    isProgrammaticScroll.current = true;

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    const container = sliderRef.current;
    const cards = container.children;
    if (!cards[index]) return;

    const card = cards[index] as HTMLElement;
    const cardLeft = card.offsetLeft - container.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = container.clientWidth;
    const maxScroll = Math.max(0, container.scrollWidth - containerWidth);

    let targetLeft: number;
    if (index === 0) {
      targetLeft = 0;
    } else if (index === reviews.length - 1) {
      targetLeft = maxScroll;
    } else {
      targetLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    }

    const finalScroll = Math.max(0, Math.min(targetLeft, maxScroll));

    container.scrollTo({
      left: finalScroll,
      behavior: 'smooth'
    });

    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  };

  // Navegação anterior (sem looping ao chegar no primeiro)
  const handlePrev = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
  };

  // Navegação próxima (sem looping ao chegar no último)
  const handleNext = () => {
    if (activeIndex < reviews.length - 1) {
      goToSlide(activeIndex + 1);
    }
  };

  // Eventos de Mouse Drag (Arrastar no Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragDeltaX.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    dragDeltaX.current = e.pageX - dragStartX.current;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const delta = dragDeltaX.current;
    dragDeltaX.current = 0;

    // Arrastou para a esquerda (quer ir para o próximo comentário)
    if (delta < -40) {
      if (activeIndex < reviews.length - 1) {
        goToSlide(activeIndex + 1);
      } else {
        goToSlide(activeIndex);
      }
    } 
    // Arrastou para a direita (quer voltar para o comentário anterior)
    else if (delta > 40) {
      if (activeIndex > 0) {
        goToSlide(activeIndex - 1);
      } else {
        goToSlide(activeIndex);
      }
    } else {
      goToSlide(activeIndex);
    }
  };

  // Eventos de Touch (Arrastar no Celular / Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    dragDeltaX.current = e.touches[0].clientX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const delta = dragDeltaX.current;
    dragDeltaX.current = 0;

    if (delta < -40) {
      if (activeIndex < reviews.length - 1) {
        goToSlide(activeIndex + 1);
      } else {
        goToSlide(activeIndex);
      }
    } else if (delta > 40) {
      if (activeIndex > 0) {
        goToSlide(activeIndex - 1);
      } else {
        goToSlide(activeIndex);
      }
    } else {
      goToSlide(activeIndex);
    }
  };

  // Atualiza activeIndex se o usuário rolar manualmente com touchpad / roda do mouse
  const handleScroll = () => {
    if (isProgrammaticScroll.current || isDraggingRef.current || !sliderRef.current) return;

    const container = sliderRef.current;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (currentScroll <= 15) {
      if (activeIndex !== 0) setActiveIndex(0);
      return;
    }
    if (currentScroll >= maxScroll - 15) {
      if (activeIndex !== reviews.length - 1) setActiveIndex(reviews.length - 1);
      return;
    }

    const containerCenter = currentScroll + container.clientWidth / 2;
    let closestIdx = activeIndex;
    let minDiff = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft - container.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  // Limpeza de timeouts
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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

  const isAtFirst = activeIndex === 0;
  const isAtLast = activeIndex >= reviews.length - 1;

  return (
    <section ref={testimonialsSectionRef} id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção com GSAP ScrollTrigger */}
        <div className="gsap-testimonials-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
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

          {/* Ações do Cabeçalho: Contagem & Controles de Passagem (Sem looping) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            {/* Contagem visual precisa dos comentários (ex: 01 / 06) */}
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono select-none shadow-sm">
              <span className="text-indigo-400 font-bold text-sm">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">
                {String(reviews.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Botão Anterior (Desabilitado no primeiro item para não haver looping) */}
              <motion.button
                whileHover={!isAtFirst ? { scale: 1.08 } : undefined}
                whileTap={!isAtFirst ? { scale: 0.94 } : undefined}
                onClick={handlePrev}
                disabled={isAtFirst}
                className={`p-3 rounded-2xl border transition-all select-none shadow-lg ${
                  isAtFirst
                    ? 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-30 scale-100'
                    : 'bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white border-white/10 cursor-pointer'
                }`}
                title={isAtFirst ? t("Primeiro comentário", "First review") : t("Anterior", "Previous")}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Botão Próximo (Desabilitado no último item para não haver looping) */}
              <motion.button
                whileHover={!isAtLast ? { scale: 1.08 } : undefined}
                whileTap={!isAtLast ? { scale: 0.94 } : undefined}
                onClick={handleNext}
                disabled={isAtLast}
                className={`p-3 rounded-2xl border transition-all select-none shadow-lg ${
                  isAtLast
                    ? 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-30 scale-100'
                    : 'bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white border-white/10 cursor-pointer'
                }`}
                title={isAtLast ? t("Último comentário", "Last review") : t("Próximo", "Next")}
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Carrossel Horizontal em Linha Única com 3 Cards Visíveis e Suporte a Arrastar (Drag/Touch) */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            className={`flex gap-6 overflow-x-auto pb-6 pt-2 select-none no-scrollbar ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {reviews.map((item, index) => {
              const isFeatured = index === activeIndex;
              const itemRating = item.rating || 5;

              return (
                <div
                  key={item.id || index}
                  onClick={() => goToSlide(index)}
                  className={`group relative p-8 rounded-3xl bg-white/[0.02] border transition-all duration-500 flex flex-col justify-between shrink-0 cursor-pointer ${
                    /* 3 cards por linha no desktop, 2 no tablet, 1 no mobile */
                    'w-[88vw] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] min-h-[340px]'
                  } ${
                    isFeatured
                      ? 'border-indigo-500/70 bg-white/[0.04] shadow-[0_0_35px_rgba(99,102,241,0.25)] scale-[1.01]'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Quote className={`w-8 h-8 transition-colors ${
                        isFeatured ? 'text-indigo-400/70' : 'text-indigo-500/30 group-hover:text-indigo-500/60'
                      }`} />
                      
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
                    <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 italic line-clamp-4">
                      "{renderText(item.text)}"
                    </p>
                  </div>

                  {/* Autor do Depoimento */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md transition-all ${
                      isFeatured
                        ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-white/40 ring-2 ring-indigo-500/40'
                        : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border border-white/20'
                    }`}>
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
        </div>

        {/* Indicadores numéricos do carrossel */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-8 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Item ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
