import React from 'react';
import {
  Zap,
  TrendingUp,
  Award,
  Rocket,
  MessageSquare,
  Star,
  Pizza,
  UtensilsCrossed,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const TickerTape: React.FC = () => {
  const highlightItems = [
    { icon: <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />, text: "+R$ 500 MILHÕES EM VENDAS GERADAS" },
    { icon: <Rocket className="w-4 h-4 text-orange-400" />, text: "SITE E CARDÁPIO EM 7 DIAS" },
    { icon: <Award className="w-4 h-4 text-amber-300" />, text: "+2.000 RESTAURANTES DE SUCESSO" },
    { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, text: "ROI MÉDIO DE 15X EM TRÁFEGO" },
    { icon: <MessageSquare className="w-4 h-4 text-emerald-400" />, text: "AUTOMAÇÃO INTELIGENTE DE WHATSAPP" },
    { icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" />, text: "MÉTODO NÚMERO 1 DA AMÉRICA LATINA" },
  ];

  const categoryItems = [
    { emoji: "🍕", label: "Pizzarias de Alta Conversão" },
    { emoji: "🍔", label: "Hamburguerias & Smashes" },
    { emoji: "🍣", label: "Sushi Bars & Japa" },
    { emoji: "🥩", label: "Steakhouses & Churrascarias" },
    { emoji: "🍝", label: "Cantinas & Trattorias" },
    { emoji: "🍰", label: "Docerias & Cafeterias" },
    { emoji: "🛵", label: "Delivery & Dark Kitchens" },
    { emoji: "🍺", label: "Pubs & Bares Gastronômicos" },
  ];

  return (
    <div className="relative py-3 overflow-hidden bg-black z-20 pointer-events-none">
      {/* Side Edge Fades for sleek visual transition */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

      {/* Tilted Container */}
      <div className="relative -rotate-1 sm:-rotate-2 scale-102 my-1">
        
        {/* Top Ribbon - High-Impact Black/Orange Badges Scrolling Left */}
        <div className="bg-zinc-950 border-y border-[#FFAA48]/30 py-2.5 shadow-2xl overflow-hidden relative">
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-4 sm:gap-6">
            {[...highlightItems, ...highlightItems, ...highlightItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 bg-zinc-900/90 border border-zinc-800 hover:border-[#FFAA48]/50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider text-white uppercase shadow-md transition-colors"
              >
                {item.icon}
                <span className="text-zinc-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ribbon - Restaurant Categories & Food Icons Scrolling Right */}
        <div className="bg-[#FFAA48] border-y border-[#FFAA48]/80 py-2 shadow-xl overflow-hidden relative -mt-1 rotate-1">
          <div className="animate-marquee-right whitespace-nowrap flex items-center gap-4 sm:gap-6">
            {[...categoryItems, ...categoryItems, ...categoryItems].map((cat, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black tracking-wider text-black uppercase"
              >
                <span className="text-base sm:text-lg">{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className="text-black/30 font-light mx-2">•</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

