import React from 'react';
import { CoolButton } from './CoolButton';

interface YellowCalloutProps {
  onCtaClick: () => void;
}

export const YellowCallout: React.FC<YellowCalloutProps> = ({ onCtaClick }) => {
  return (
    <section className="bg-[#FFAA48] orange-gradient-bg py-16 md:py-20 text-black overflow-hidden relative border-y border-[#FFAA48]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        {/* Badge */}
        <div className="inline-block bg-black text-[#FFAA48] font-extrabold text-xs uppercase px-4 py-1.5 rounded-full tracking-widest shadow-lg">
          RECEBA UM TIME EXCLUSIVO
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight max-w-4xl mx-auto text-black">
          A <span className="underline decoration-black/30">ASSESSORIA GOURMETIZE</span> ESTRUTURA O MARKETING DO SEU RESTAURANTE COM BASE NA SUA <span className="underline decoration-black/30">NECESSIDADE</span>
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg font-medium text-black/90 max-w-3xl mx-auto leading-relaxed">
          Tenha um time de especialistas ao seu lado ou terceirize totalmente seu marketing e setor comercial com a Gourmetize. Sem dor de cabeça com contratações, gestão de equipe, riscos trabalhistas ou burocracias. Você foca na cozinha e no atendimento do seu restaurante, e a gente foca em fazer ele crescer todos os dias.
        </p>

        {/* Scroll to Form CTA */}
        <div className="pt-4 flex justify-center">
          <CoolButton
            onClick={onCtaClick}
            variant="black"
            className="px-8 py-4 text-base sm:text-lg rounded-full"
            showPulse={false}
            showShimmer={true}
          >
            Preencher Formulário de Diagnóstico
          </CoolButton>
        </div>

      </div>
    </section>
  );
};
