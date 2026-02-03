import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';
import ParticleBackground from './ParticleBackground';

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
  
  // Drag/Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Responsive logic to determine how many items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate maximum index to prevent empty space at the end
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // --- Swipe/Drag Logic ---
  const minSwipeDistance = 50;

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
    if (!touchStart || !touchEnd) {
        setIsDragging(false);
        return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide();
    } else if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    } else if (isLeftSwipe && currentIndex === maxIndex) {
        // Optional: Wrap around on swipe
        setCurrentIndex(0);
    } else if (isRightSwipe && currentIndex === 0) {
        // Optional: Wrap around on swipe
        setCurrentIndex(maxIndex);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden scroll-mt-28">
      {/* Top & Bottom Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10"></div>

      {/* Particles Background - Low opacity for subtlety */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl font-bold mb-4">O que dizem os <span className="text-secondary">Clientes</span></h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
              setIsPaused(false);
              setIsDragging(false); // Ensure drag resets on leave
          }}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 p-3 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-md transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:block"
            disabled={currentIndex === 0 && false}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 p-3 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-md transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Track Wrapper - INCREASED PADDING (px-6 md:px-8) to fix clipping issues */}
          <div className="overflow-hidden px-6 md:px-8 py-12 -my-8">
            <div 
              className={`flex transition-transform duration-500 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
              
              // Touch Events (Mobile)
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              
              // Mouse Events (Desktop Drag)
              onMouseDown={onTouchStart}
              onMouseMove={onTouchMove}
              onMouseUp={onTouchEnd}
              onMouseLeave={() => {
                  if(isDragging) onTouchEnd();
              }}
            >
              {testimonials.map((t) => (
                <div 
                  key={t.id} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="glass-card p-6 md:p-8 rounded-2xl relative h-full flex flex-col justify-between hover:bg-white/5 transition-colors duration-300 shadow-xl">
                    <div>
                      <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg z-10">
                        <Quote className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                      </div>
                      
                      <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base">"{t.text}"</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white/20 object-cover pointer-events-none" />
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-xs text-primary">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;