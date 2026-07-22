import React from 'react';
import { ShieldCheck, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { LogoImg } from './LogoImg';

export const GOURMETIZE_LOGO = "https://res.cloudinary.com/epo1w9hl/image/upload/v1784750767/Gourmetize__1_-removebg-preview_bdznbn.png";

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative bg-[#FFAA48] orange-gradient-bg min-h-[75vh] sm:min-h-[80vh] flex flex-col justify-center items-center py-10 sm:py-14 text-black overflow-hidden">
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Company Logo Centered & Close to Title */}
        <div className="mb-2 sm:mb-3 transform hover:scale-105 transition-transform duration-300">
          <LogoImg
            alt="Assessoria Gourmetize"
            className="h-28 sm:h-36 md:h-44 w-auto mx-auto object-contain"
          />
        </div>

        {/* Main Headline styled like the reference layout */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.12] text-black max-w-3xl mx-auto">
          <span className="font-semibold block">DO CARDÁPIO AO CAIXA:</span>
          <span className="font-semibold block">TUDO QUE SEU RESTAURANTE PRECISA,</span>
          <span className="font-black block text-black">NUM SÓ LUGAR.</span>
        </h1>

        {/* Description Text */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-medium text-black/95 max-w-2xl mx-auto leading-relaxed text-center">
          Cardápio digital, site profissional e um sistema completo pra controlar financeiro, entregas e clientes — sem depender de planilha, caderno ou cinco apps diferentes. A gente cuida do marketing, você cuida do salão.
        </p>

        {/* Vibrant Green CTA Button with Arrow */}
        <div className="mt-6 sm:mt-7">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-[#00E676] hover:bg-[#00c966] text-black font-extrabold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Quero meu site pronto em 7 dias</span>
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
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

