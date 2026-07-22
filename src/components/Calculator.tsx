import React, { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CoolButton } from './CoolButton';

export const Calculator: React.FC = () => {
  const [currentRevenue, setCurrentRevenue] = useState(40000);
  const [adSpend, setAdSpend] = useState(2000);

  // Gourmetize 15x ROI multiplier calculation
  const projectedReturn = adSpend * 15;
  const projectedTotalRevenue = currentRevenue + projectedReturn;

  return (
    <section id="calculadora" className="py-20 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#FFAA48] text-xs font-black uppercase tracking-widest bg-[#FFAA48]/10 border border-[#FFAA48]/30 px-3.5 py-1.5 rounded-full inline-block">
              PLANOS PERSONALIZADOS
            </span>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
              VOCÊ <span className="text-[#FFAA48]">ESCOLHE A SOLUÇÃO CERTA</span> PARA A FASE QUE SEU RESTAURANTE VIVE HOJE.
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              Oferecemos nossos serviços por planos flexíveis e adaptáveis. Você escolhe conforme sua condição atual. O mais importante é continuar apostando em estratégias com comprovação matemática de resultado.
            </p>

            {/* Platform Partners Badges */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Estratégia integrada nos principais canais:</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-zinc-200">
                <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Meta Ads (Instagram/Facebook)
                </span>
                <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> iFood Ads
                </span>
                <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp Business
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive ROI Simulator Widget */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <CalcIcon className="w-5 h-5 text-[#FFAA48]" />
                  <h3 className="text-lg font-bold text-white">Simulador de Faturamento Gourmetize</h3>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Multiplicador Recomendado
                </span>
              </div>

              <div className="space-y-6">
                {/* Input 1: Current Revenue Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-300">Faturamento Mensal Atual do Restaurante</span>
                    <span className="text-[#FFAA48] font-extrabold text-sm">
                      {currentRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                    className="w-full accent-[#FFAA48] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Input 2: Marketing Investment Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-300">Investimento Mensal Pretendido em Tráfego Pago</span>
                    <span className="text-emerald-400 font-extrabold text-sm">
                      {adSpend.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="500"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Projected Result Box */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                  {/* Rising Curve Graphic Effect */}
                  <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                    <svg className="w-48 h-24 text-[#FFAA48]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M0 45 C 30 40, 60 20, 100 5" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <div>
                      <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        Vendas Adicionais Estimadas
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                        +{projectedReturn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        Novo Faturamento Projetado
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-[#FFAA48] mt-1">
                        {projectedTotalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <CoolButton
                  href="#formulario"
                  variant="green"
                  fullWidth={true}
                  className="py-4 text-sm"
                  showPulse={true}
                  showShimmer={true}
                  icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                >
                  Quero Alcançar Este Resultado Na Minha Região
                </CoolButton>

                <p className="text-[11px] text-zinc-500 text-center">
                  *Projeção baseada na média histórica do método Gourmetize em mais de 2.000 operações ativas.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
