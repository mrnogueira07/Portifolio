import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
    name: "Amanda Rocha",
    role: "Creative Director",
    company: "Visionary Studio",
    text: "Trabalhar com o Matheus é ter a certeza de que a interface será belíssima e a experiência do usuário será prioridade. Um talento multitarefa incrível.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 5,
    name: "Lucas Lima",
    role: "Lead Developer",
    company: "TechFlow",
    text: "Código limpo e arquitetura bem pensada. Ele integrou nossa stack de IA com uma fluidez que poucos desenvolvedores seniores conseguem.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 6,
    name: "Marina Silva",
    role: "Founder",
    company: "GreenSolution",
    text: "O app que ele desenvolveu para nossa startup de sustentabilidade mudou nosso patamar. A gamificação que ele sugeriu aumentou nossa retenção em 40%.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 7,
    name: "Henrique Souza",
    role: "E-commerce Manager",
    company: "ModaVibe",
    text: "Aumentamos nossa taxa de conversão em 25% após a reformulação da landing page. O Matheus entende de negócios, não só de código.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);

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

  const totalSlides = testimonials.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Drag handlers for mouse/touch
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    setDragOffset(deltaX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80;
    if (dragOffset > threshold && currentIndex > 0) {
      prevSlide();
    } else if (dragOffset < -threshold && currentIndex < maxIndex) {
      nextSlide();
    }
    setDragOffset(0);
  };

  // Wheel/Trackpad handler
  const handleWheel = (e: React.WheelEvent) => {
    // Detect horizontal scroll (common on trackpads)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      scrollAccumulator.current += e.deltaX;
      setDragOffset(-scrollAccumulator.current);

      const threshold = 150;
      if (scrollAccumulator.current > threshold) {
        if (currentIndex < maxIndex) nextSlide();
        scrollAccumulator.current = 0;
        setDragOffset(0);
      } else if (scrollAccumulator.current < -threshold) {
        if (currentIndex > 0) prevSlide();
        scrollAccumulator.current = 0;
        setDragOffset(0);
      }
    }
  };

  const getTranslateX = () => {
    const baseTranslate = -(currentIndex * (100 / itemsPerPage));
    if ((isDragging || Math.abs(dragOffset) > 0) && sliderRef.current) {
      const percentageOffset = (dragOffset / sliderRef.current.offsetWidth) * 100;
      return baseTranslate + percentageOffset;
    }
    return baseTranslate;
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-transparent scroll-mt-20 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-4">
              <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase">Relatórios de Missão</span>
           </div>
           <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight">O que dizem os <span className="text-secondary">Aliados</span></h2>
           <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto font-light">
             Feedback real de quem transformou visão em resultado através da nossa engenharia.
           </p>
        </div>

        <div 
          className="relative group" 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 hidden md:flex ${currentIndex === 0 ? 'pointer-events-none opacity-10' : ''}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 hidden md:flex ${currentIndex === maxIndex ? 'pointer-events-none opacity-10' : ''}`}
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={sliderRef}
            className={`overflow-hidden py-6 ${isDragging ? 'cursor-grabbing scale-[0.99]' : 'cursor-grab'} transition-transform duration-500`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
          >
            <div 
              className={`flex transition-transform ${isDragging || Math.abs(dragOffset) > 0 ? 'duration-100' : 'duration-700 cubic-bezier(0.16, 1, 0.3, 1)'}`}
              style={{ transform: `translateX(${getTranslateX()}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="flex-shrink-0 px-4" style={{ width: `${100 / itemsPerPage}%` }}>
                  <div className="relative h-full bg-[#0d0d12]/50 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between border border-white/5 hover:border-secondary/20 transition-all duration-700 group/card">
                    <div className="relative z-10">
                       <div className="flex justify-between items-start mb-8">
                          <div className="relative">
                            <div className="absolute -inset-2 bg-secondary/20 blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 p-0.5 group-hover/card:scale-110 transition-transform duration-500">
                              <img src={t.avatar} alt={t.name} className="w-full h-full rounded-xl object-cover grayscale-[40%] group-hover/card:grayscale-0" />
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                             <Quote className="w-10 h-10 text-white/[0.03] mb-2" />
                             <div className="flex gap-0.5">
                               {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-secondary text-secondary" />)}
                             </div>
                          </div>
                       </div>
                       <p className="text-gray-400 text-sm md:text-base leading-relaxed italic font-light mb-8">"{t.text}"</p>
                    </div>
                    <div className="relative z-10 pt-8 border-t border-white/5">
                       <h4 className="font-bold text-white text-base tracking-tight">{t.name}</h4>
                       <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover/card:text-secondary transition-colors">{t.role} @ {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-12 bg-secondary shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;