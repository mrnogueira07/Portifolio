import React, { useEffect, useRef } from 'react';

// Componente ParticleBackground - Cria um efeito de partículas conectadas usando HTML5 Canvas
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Ajusta o tamanho do canvas para ocupar a tela inteira e reinicia as partículas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Classe que define o comportamento de cada partícula individual
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.directionX = (Math.random() - 0.5) * 0.5; // Velocidade de movimento horizontal
        this.directionY = (Math.random() - 0.5) * 0.5; // Velocidade de movimento vertical
        this.size = Math.random() * 2 + 1;
      }

      // Atualiza a posição da partícula e faz ela rebater nas bordas do canvas
      update() {
        if (!canvas) return;

        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
      }

      // Desenha a partícula no canvas
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
    }

    // Inicializa o array de partículas com base na resolução da tela
    const initParticles = () => {
      particles = [];
      // Densidade de partículas calculada para manter performance em diferentes dispositivos
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    // Função de loop de animação
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Lógica para desenhar linhas de conexão entre partículas próximas
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Distância máxima para criar uma conexão
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - distance / 3000})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners e início da animação
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParticleBackground;