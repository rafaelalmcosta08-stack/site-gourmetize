import React from 'react';
import { Star, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { LogoImg } from './LogoImg';

export const GOURMETIZE_LOGO = "https://res.cloudinary.com/epo1w9hl/image/upload/v1784657082/3.0_Gourmetize_udgsmm.png";

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative bg-[#FFAA48] orange-gradient-bg pt-8 pb-10 sm:pt-12 sm:pb-12 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 text-black overflow-hidden select-none">
      {/* Background Geometric Arrow Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center overflow-hidden">
        <svg
          className="w-[1200px] h-[1200px] text-black"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Concentric Chevron Arrows */}
          <path d="M 10 50 L 35 15 L 35 35 L 75 35 L 75 65 L 35 65 L 35 85 Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M 30 50 L 55 15 L 55 35 L 95 35 L 95 65 L 55 65 L 55 85 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M-10 50 L 15 15 L 15 35 L 55 35 L 55 65 L 15 65 L 15 85 Z" fill="currentColor" fillOpacity="0.04" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Company Logo Centered */}
        <div className="mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300">
          <div className="p-1 inline-block">
            <LogoImg
              alt="Assessoria Gourmetize"
              className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto mx-auto object-contain"
            />
          </div>
        </div>

        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 bg-black/10 border border-black/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase mb-5 text-black shadow-sm">
          <Star className="w-4 h-4 fill-black text-black" />
          <span>Método Validado para Restaurantes</span>
        </div>

        {/* Main Impact Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase text-black max-w-4xl mx-auto">
          SEU SITE E CARDÁPIO <br className="hidden sm:inline" />
          <span className="bg-black text-[#FFAA48] px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl inline-block mt-2 shadow-2xl">
            PRONTO EM 7 DIAS.
          </span>
        </h1>

        {/* Subtitle / CTA Button */}
        <div className="mt-5 sm:mt-7">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2.5 bg-black hover:bg-zinc-900 text-[#FFAA48] text-sm sm:text-base md:text-lg font-black uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-transform transform hover:scale-105 shadow-2xl"
          >
            <span>Quero Meu Site Pronto Em 7 Dias</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-black/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm md:text-base font-bold text-black/90 w-full max-w-3xl">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <span>Engenharia de Cardápio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-black shrink-0" />
            <span>Entrega em 7 Dias</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-black shrink-0" />
            <span>Alta Conversão</span>
          </div>
        </div>
      </div>
    </section>
  );
};
