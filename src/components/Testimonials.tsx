import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsData } from '../data/portfolioData';
import { Testimonial } from '../types/portfolio';

const LOCAL_STORAGE_REVIEWS_KEY = 'portfolio_user_reviews_cache';
type LocalizedText = string | { pt: string; en: string };

const isLocalizedText = (value: unknown): value is LocalizedText => typeof value === 'string' || (
  typeof value === 'object' && value !== null && 'pt' in value && 'en' in value &&
  typeof value.pt === 'string' && typeof value.en === 'string'
);

function validReview(value: unknown): value is Testimonial {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (typeof item.id === 'string' || typeof item.id === 'number') && typeof item.name === 'string' &&
    isLocalizedText(item.text) && (item.role === undefined || isLocalizedText(item.role)) &&
    (item.company === undefined || typeof item.company === 'string');
}

const getRating = (value: unknown): number | undefined => {
  const rating = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
  return Number.isFinite(rating) && rating >= 1 && rating <= 5 ? rating : undefined;
};

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [reviews, setReviews] = useState<Testimonial[]>(testimonialsData);
  const [position, setPosition] = useState({ first: 0, last: 0, canPrevious: false, canNext: false });
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scroll: number } | null>(null);

  useEffect(() => {
    let cached: Testimonial[] = [];
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY) || '[]');
      if (Array.isArray(parsed)) cached = parsed.filter(validReview);
    } catch {
      // Unavailable or malformed storage must not prevent the portfolio from rendering.
    }
    const merge = (items: Testimonial[]) => Array.from(new Map(
      [...testimonialsData, ...items].map(item => [String(item.id), item]),
    ).values());
    setReviews(merge(cached));

    return onSnapshot(collection(db, 'reviews'), snapshot => {
      const cloudReviews = snapshot.docs.map(document => {
        const data = document.data();
        const rawDate = data.createdAt instanceof Timestamp ? data.createdAt.toDate() :
          typeof data.createdAt === 'string' ? new Date(data.createdAt) :
            typeof data.publishedAtIso === 'string' ? new Date(data.publishedAtIso) : null;
        const hasDate = rawDate !== null && Number.isFinite(rawDate.getTime());
        const text = data.comment || data.text;
        return {
          id: document.id,
          name: typeof data.name === 'string' ? data.name : (language === 'pt' ? 'Cliente' : 'Client'),
          role: isLocalizedText(data.role) ? data.role : typeof data.companyRole === 'string' ? data.companyRole : undefined,
          company: typeof data.company === 'string' ? data.company : undefined,
          text: isLocalizedText(text) ? text : '',
          rating: getRating(data.rating),
          createdAt: hasDate ? rawDate!.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US') : undefined,
          timestamp: hasDate ? rawDate!.getTime() : 0,
        };
      }).filter(item => typeof item.text === 'string' ? item.text.trim().length > 0 : Boolean(item.text.pt || item.text.en))
        .sort((a, b) => b.timestamp - a.timestamp);
      // A successful snapshot is authoritative; deleted cloud reviews must not reappear from cache.
      const cloudIds = new Set(cloudReviews.map(item => String(item.id)));
      setReviews([...cloudReviews, ...testimonialsData.filter(item => !cloudIds.has(String(item.id)))]);
    }, () => {
      setReviews(merge(cached));
    });
  }, [language]);

  const updatePosition = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const viewport = slider.getBoundingClientRect();
    const visible = Array.from(slider.children).reduce<number[]>((indices, card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.right > viewport.left + 10 && rect.left < viewport.right - 10) indices.push(index);
      return indices;
    }, []);
    const next = {
      first: visible[0] ?? 0,
      last: visible[visible.length - 1] ?? 0,
      canPrevious: slider.scrollLeft > 2,
      canNext: slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 2,
    };
    setPosition(previous => Object.keys(next).every(key => previous[key as keyof typeof next] === next[key as keyof typeof next]) ? previous : next);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(slider);
    return () => observer.disconnect();
  }, [reviews]);

  const navigate = (direction: -1 | 1) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const max = Math.max(0, slider.scrollWidth - slider.clientWidth);
    const stops = Array.from(new Set([0, ...Array.from(slider.children).map(card => Math.min((card as HTMLElement).offsetLeft, max)), max])).sort((a, b) => a - b);
    const target = direction === 1
      ? stops.find(stop => stop > slider.scrollLeft + 2) ?? max
      : stops.slice().reverse().find(stop => stop < slider.scrollLeft - 2) ?? 0;
    slider.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const renderText = (value?: LocalizedText) => typeof value === 'string' ? value : value ? value[language] : '';
  const ratedReviews = reviews.map(review => getRating(review.rating)).filter((rating): rating is number => rating !== undefined);
  const average = ratedReviews.length ? (ratedReviews.reduce((sum, rating) => sum + rating, 0) / ratedReviews.length).toFixed(1) : null;

  return (
    <section id="testimonials" className="section-shell relative" aria-labelledby="testimonials-heading">
      <div className="page-container">
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">{t('Depoimentos', 'Testimonials')}</p>
            <h2 id="testimonials-heading" className="section-title mt-4">{t('Parcerias construídas com confiança.', 'Partnerships built on trust.')}</h2>
            <p className="section-copy mt-5">{t('Perspectivas de clientes e parceiros sobre os projetos e a colaboração.', 'Client and partner perspectives on the projects and collaboration.')}</p>
            {average && <p className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300"><Star className="h-4 w-4 text-amber-300" aria-hidden="true" />{average} / 5 · {ratedReviews.length} {t('avaliações com nota', 'rated reviews')}</p>}
          </div>
          {reviews.length > 1 && <div className="flex shrink-0 items-center gap-3">
            <span className="mr-2 text-xs font-mono text-slate-400" aria-live="polite">{String(position.first + 1).padStart(2, '0')}{position.last > position.first ? `—${String(position.last + 1).padStart(2, '0')}` : ''} / {String(reviews.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => navigate(-1)} disabled={!position.canPrevious} aria-label={t('Depoimentos anteriores', 'Previous testimonials')} aria-controls="testimonials-slider" className="rounded-full border border-white/10 p-3 text-slate-300 transition-colors hover:bg-white/10 disabled:cursor-default disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => navigate(1)} disabled={!position.canNext} aria-label={t('Próximos depoimentos', 'Next testimonials')} aria-controls="testimonials-slider" className="rounded-full border border-white/10 p-3 text-slate-300 transition-colors hover:bg-white/10 disabled:cursor-default disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
          </div>}
        </div>
        <div
          id="testimonials-slider"
          ref={sliderRef}
          role="region"
          aria-roledescription={t('carrossel', 'carousel')}
          aria-label={t('Depoimentos de clientes e parceiros', 'Client and partner testimonials')}
          tabIndex={0}
          onScroll={updatePosition}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              navigate(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}
          onPointerDown={event => {
            if (event.pointerType !== 'mouse' || event.button !== 0 || !sliderRef.current) return;
            dragRef.current = { x: event.clientX, scroll: sliderRef.current.scrollLeft };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }}
          onPointerMove={event => {
            if (dragRef.current && sliderRef.current) sliderRef.current.scrollLeft = dragRef.current.scroll - (event.clientX - dragRef.current.x);
          }}
          onPointerUp={event => {
            dragRef.current = null;
            setDragging(false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onLostPointerCapture={() => { dragRef.current = null; setDragging(false); }}
          onPointerCancel={() => { dragRef.current = null; setDragging(false); }}
          className={`relative flex gap-5 overflow-x-auto pb-4 ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{ scrollSnapType: dragging ? 'none' : 'x mandatory', scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}
        >
          {reviews.map((item, index) => {
            const rating = getRating(item.rating);
            const role = [renderText(item.role), item.company].filter(Boolean).join(' · ');
            const initials = item.name.trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
            return (
              <article key={item.id} role="group" aria-roledescription={t('depoimento', 'testimonial')} aria-label={`${index + 1} ${t('de', 'of')} ${reviews.length}`} className="surface-card flex w-[88%] shrink-0 snap-start flex-col p-7 sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]">
                <div className="mb-6 flex items-center justify-between gap-4"><Quote className="h-6 w-6 text-blue-400/60" aria-hidden="true" />{rating !== undefined && <span className="inline-flex items-center gap-1.5 text-xs text-amber-200" aria-label={`${rating} ${t('de 5 estrelas', 'out of 5 stars')}`}><Star className="h-3.5 w-3.5" aria-hidden="true" />{rating.toFixed(1)}</span>}</div>
                <blockquote className="mb-8 flex-1 text-sm leading-7 text-slate-300">“{renderText(item.text)}”</blockquote>
                <div className="flex items-center gap-3 border-t border-slate-800/80 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-medium text-blue-200" aria-hidden="true">{initials || '—'}</div>
                  <div className="min-w-0"><h3 className="text-sm font-medium text-white">{item.name}</h3>{role && <p className="mt-1 text-xs leading-5 text-slate-400">{role}</p>}{typeof item.createdAt === 'string' && <p className="mt-1 text-[11px] text-slate-500">{item.createdAt}</p>}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
