import React, { useState } from 'react';
import { Users, Award, Building2, Sparkles, CheckCircle2, ShieldCheck, Target, Zap, ArrowRight, MapPin } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const galleryImages = [
    {
      title: "Time Gourmetize",
      subtitle: "Mais de 80 especialistas trabalhando pelo seu restaurante",
      badge: "80+ PROFISSIONAIS",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      tagline: "União, estratégia e obsessão por gerar vendas todos os dias."
    },
    {
      title: "Sede Presencial",
      subtitle: "Estrutura física própria de alta performance",
      badge: "100% PRESENCIAL",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      tagline: "Infraestrutura completa dedicada à aceleração gastronômica."
    },
    {
      title: "Cultura Sangue no Olho",
      subtitle: "Foco total em métricas de faturamento e lucro",
      badge: "FOCO EM RESULTADO",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
      tagline: "Trabalhamos como se o seu restaurante fosse o nosso."
    }
  ];

  const pillars = [
    {
      icon: <Building2 className="w-5 h-5 text-[#FFAA48]" />,
      title: "Estrutura 100% Presencial",
      description: "Nada de freelancers isolados. Uma equipe unida na mesma sede ajustando suas campanhas diariamente."
    },
    {
      icon: <Target className="w-5 h-5 text-[#FFAA48]" />,
      title: "Especialistas Gastronômicos",
      description: "Conhecemos a rotina de cozinha, margem de CMV, taxa de entrega de iFood e vendas de salão."
    },
    {
      icon: <Zap className="w-5 h-5 text-[#FFAA48]" />,
      title: "Velocidade de Execução",
      description: "Seu site, cardápio engenheirado e tráfego rodando em apenas 7 dias após o alinhamento."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FFAA48]" />,
      title: "Comprovado no Mercado",
      description: "Mais de R$ 500 Milhões em vendas geradas para mais de +250 restaurantes em todo o Brasil."
    }
  ];

  return (
    <section id="quem-somos" className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
      {/* Background radial glow & grid texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FFAA48]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFAA48]/10 border border-[#FFAA48]/30 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-[#FFAA48]" />
            <span className="text-[#FFAA48] text-xs font-black uppercase tracking-widest">
              A MAIOR ASSESSORIA DA AMÉRICA LATINA
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
            NÃO SOMOS APENAS UMA AGÊNCIA. <br />
            SOMOS OS SEUS <span className="text-[#FFAA48] underline decoration-[#FFAA48]/40">PARCEIROS DE CRESCIMENTO</span>.
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Conheça os bastidores da estrutura física e da equipe presencial que transforma cardápios estagnados em máquinas de vendas diárias.
          </p>
        </div>

        {/* Main Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Headquarters Showcase */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Featured Active Display */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={galleryImages[activeTab].image}
                alt={galleryImages[activeTab].title}
                className="w-full h-full object-cover transition-all duration-700 filter contrast-105 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="bg-emerald-500 text-black font-black text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  {galleryImages[activeTab].badge}
                </span>

                <span className="bg-black/70 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FFAA48]" />
                  <span>Sede Própria</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 space-y-1">
                <p className="text-[#FFAA48] text-xs font-bold uppercase tracking-wider">
                  {galleryImages[activeTab].subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                  {galleryImages[activeTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 italic">
                  "{galleryImages[activeTab].tagline}"
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Tabs */}
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-2 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeTab === idx
                      ? 'bg-zinc-800 border-[#FFAA48] text-white shadow-lg shadow-[#FFAA48]/10'
                      : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-2 bg-zinc-900">
                    <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold truncate block">
                    {img.title}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Narrative & Pillars Grid */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Narrative text */}
            <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>
                Na <strong className="text-white font-bold">Assessoria Gourmetize</strong>, ajudamos restaurantes a romper a barreira do faturamento estagnado. Nascemos da paixão pela gastronomia e pela engenharia de vendas.
              </p>
              <p>
                Enquanto agências comuns focam em curtidas e posts estéticos, nosso time de mais de <strong className="text-[#FFAA48] font-bold">80 profissionais altamente qualificados</strong> foca no que realmente importa: <strong className="text-white font-bold">pedidos no caixa do seu restaurante todos os dias</strong>.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/90 border border-zinc-800/90 hover:border-[#FFAA48]/50 p-4 rounded-2xl transition-all hover:-translate-y-0.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-[#FFAA48]/10 border border-[#FFAA48]/20 w-fit mb-3 group-hover:bg-[#FFAA48]/20 transition-colors">
                    {pillar.icon}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mb-1 uppercase tracking-wide">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Key Numbers Banner */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
              <div className="text-center border-r border-zinc-800 pr-2">
                <p className="text-xl sm:text-2xl font-black text-[#FFAA48]">+80</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase">Especialistas</p>
              </div>
              <div className="text-center border-r border-zinc-800 px-2">
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase">Presencial</p>
              </div>
              <div className="text-center pl-2">
                <p className="text-xl sm:text-2xl font-black text-[#FFAA48]">+250</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase">Restaurantes</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

