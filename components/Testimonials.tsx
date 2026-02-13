import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "CEO",
    company: "StartTech",
    text: "O Matheus não só entregou o código impecável, mas trouxe ideias de design que elevaram nosso produto. A edição do vídeo de lançamento foi a cereja do bolo.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 2,
    name: "Julia Santos",
    role: "Marketing Director",
    company: "Creative Agency",
    text: "Profissionalismo raro. Ele entende a linguagem técnica e a artística. O jogo promocional que ele fez para nossa campanha viralizou em 24 horas.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 3,
    name: "Roberto Fischer",
    role: "Product Owner",
    company: "FinApp",
    text: "Velocidade e qualidade. Refez toda nossa interface web em tempo recorde e com uma performance incrível. Recomendo de olhos fechados.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 4,
    name: "Amanda Costa",
    role: "Founder",
    company: "GreenSolutions",
    text: "A automação de robótica que o Matheus desenvolveu para nosso protótipo foi essencial para conseguirmos o investimento anjo. Brilhante!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 5,
    name: "Lucas Pereira",
    role: "Tech Lead",
    company: "DevHouse",
    text: "Trabalhar com o Matheus é ter a certeza de que o prazo será cumprido. A qualidade do código React dele é de nível sênior.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const lastWheelTime = useRef(0);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) {
        nextSlide();
        lastWheelTime.current = now;
      } else if (e.deltaX < -30) {
        prevSlide();
        lastWheelTime.current = now;
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setTouchEnd(null);
    setIsDragging(true);
    const clientX = 'touches' in e ? e.targetTouches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchStart(clientX);
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.targetTouches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchEnd(clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) { setIsDragging(false); return; }
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0a0f1e] scroll-mt-20" onWheel={handleWheel}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-900/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span>
              <span className="text-xs font-bold text-pink-300 tracking-widest uppercase font-display">Client Feedback</span>
           </div>
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Relatórios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-color-cycle">Missão</span></h2>
        </div>

        <div className="relative group select-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}>
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-4 rounded-full bg-[#0b1221]/80 hover:bg-white/10 text-white backdrop-blur-xl transition-all border border-white/10 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-4 rounded-full bg-[#0b1221]/80 hover:bg-white/10 text-white backdrop-blur-xl transition-all border border-white/10 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"><ChevronRight className="w-6 h-6" /></button>

          <div className="overflow-hidden px-4 md:px-0 py-10 -my-10">
            <div 
              className={`flex transition-transform duration-500 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
              onMouseDown={onTouchStart} onMouseMove={onTouchMove} onMouseUp={onTouchEnd}
              onMouseLeave={() => { if(isDragging) onTouchEnd(); }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="flex-shrink-0 px-4 md:px-6" style={{ width: `${100 / itemsPerPage}%` }}>
                  <div className="h-full relative group/card">
                     <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl group-hover/card:from-pink-500 group-hover/card:via-purple-500 group-hover/card:to-indigo-500 transition-all duration-500 opacity-50 group-hover/card:opacity-100 blur-[1px]"></div>
                     <div className="relative h-full bg-[#0b1221]/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-6">
                              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-white/20 to-white/5 group-hover/card:from-pink-500 group-hover/card:to-indigo-500 transition-all duration-500">
                                <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover border-2 border-[#0b1221]" />
                              </div>
                              <Quote className="w-8 h-8 text-white/10 group-hover/card:text-pink-500/50 transition-colors duration-300" />
                           </div>
                           <div className="mb-6"><p className="text-gray-300 text-sm md:text-base leading-relaxed italic">"{t.text}"</p></div>
                        </div>
                        <div className="relative z-10 pt-6 border-t border-white/5">
                           <h4 className="font-bold text-white text-lg">{t.name}</h4>
                           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover/card:text-pink-400 transition-colors">{t.role} @ {t.company}</p>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-12 bg-gradient-to-r from-pink-500 to-purple-500' : 'w-3 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;