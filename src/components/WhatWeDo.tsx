import React, { useState } from 'react';
import {
  MessageSquare,
  Target,
  Utensils,
  BarChart3,
  CheckCircle2,
  Zap,
  Sparkles,
  TrendingUp,
  Smartphone,
  Flame,
  ArrowRight,
  Send,
  Eye,
  Award,
  CircleDollarSign,
  Users
} from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 'whatsapp',
      badge: 'AUTOMAÇÃO INTELIGENTE',
      tag: 'WhatsApp & Reativação',
      title: 'Máquina de Vendas via WhatsApp',
      shortDesc: 'Disparos estratégicos e recuperação de clientes sumidos.',
      icon: MessageSquare,
      color: '#25D366', // WhatsApp Green
      metrics: [
        { label: 'Conversão Média', value: '28.4%' },
        { label: 'Clientes Reativados', value: '+420/mês' }
      ],
      bullets: [
        {
          title: 'Disparos Automáticos de Ofertas',
          desc: 'Envie promoções irresistíveis, combos e novidades direto no WhatsApp dos seus clientes em horários de pico de fome.'
        },
        {
          title: 'Reativação de Clientes Inativos',
          desc: 'Traga de volta automaticamente os clientes que não pedem há mais de 30 ou 60 dias com cupom exclusivo de retorno.'
        },
        {
          title: 'Atendimento e Pedidos Rápidos',
          desc: 'Reduza a fila do WhatsApp com respostas instantâneas que direcionam para o cardápio e fecham a venda em segundos.'
        }
      ],
      mockup: (
        <div className="relative w-full max-w-[300px] mx-auto bg-zinc-950 border-4 border-zinc-800 rounded-[36px] p-4 shadow-2xl overflow-hidden text-left">
          {/* Top Speaker / Notch */}
          <div className="w-20 h-4 bg-zinc-800 rounded-full mx-auto mb-3" />
          
          {/* Header */}
          <div className="bg-emerald-950/80 border border-emerald-500/30 p-2.5 rounded-2xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-200">Disparo em Massa Ativo</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-black px-2 py-0.5 rounded-full">
              1.420 Clientes
            </span>
          </div>

          {/* Chat Messages */}
          <div className="space-y-2.5 text-xs">
            {/* Incoming Message */}
            <div className="bg-zinc-800/90 border border-zinc-700/60 p-3 rounded-2xl rounded-tl-xs text-zinc-200 shadow-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#FFAA48] text-[10px]">Pizzaria Gourmet</span>
                <span className="text-[9px] text-zinc-400">18:45</span>
              </div>
              <p className="text-[11px] leading-snug">
                🍕 Fala, Gabriel! Sentimos sua falta! Que tal uma Pizza Grande + Guaraná por apenas R$ 49,90 hoje?
              </p>
            </div>

            {/* Outgoing Client Response */}
            <div className="bg-[#25D366] text-black font-semibold p-2.5 rounded-2xl rounded-tr-xs text-[11px] ml-4 shadow-md leading-snug">
              Opa! Quero sim! Como faço pra pedir?
            </div>

            {/* Automated Link Trigger */}
            <div className="bg-zinc-900 border border-emerald-500/40 p-2.5 rounded-2xl text-[11px] text-zinc-200 shadow-lg">
              <p className="text-emerald-400 font-bold mb-1">⚡ Link Promocional Ativado</p>
              <p className="text-zinc-400 text-[10px]">Clique abaixo para confirmar o endereço e finalizar em 30s:</p>
              <div className="mt-2 bg-[#FFAA48] text-black font-extrabold text-[11px] py-1.5 px-3 rounded-xl text-center shadow-sm">
                Fazer Pedido com Desconto →
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'trafego',
      badge: 'TRÁFEGO PAGO DE ALTA DENSIDADE',
      tag: 'Meta Ads, iFood & Google',
      title: 'Anúncios que Loteiam o Salão e o Delivery',
      shortDesc: 'Atração contínua de pessoas famintas a até 10km da sua loja.',
      icon: Target,
      color: '#FFAA48',
      metrics: [
        { label: 'ROAS Médio', value: '15.2x' },
        { label: 'Alcance Local', value: '+85.000 pessoas' }
      ],
      bullets: [
        {
          title: 'Raio Estratégico de Fome',
          desc: 'Seus vídeos suculentos são exibidos no Instagram e Facebook exatamente para quem está no raio de entrega do seu restaurante na hora do almoço e do jantar.'
        },
        {
          title: 'iFood Ads & Google Pesquisa',
          desc: 'Apareça nos primeiros lugares das buscas do iFood e do Google quando o cliente pesquisar por onde comer na sua cidade.'
        },
        {
          title: 'Otimização Diária de Orçamento',
          desc: 'Monitoramento constante para garantir o menor custo por pedido e o maior retorno financeiro possível.'
        }
      ],
      mockup: (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 sm:p-5 space-y-3.5 shadow-2xl text-left">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFAA48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFAA48]"></span>
              </span>
              <span className="text-xs font-black uppercase text-white tracking-wider">Painel de Campanhas Ativas</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/30">
              AO VIVO
            </span>
          </div>

          <div className="space-y-2">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Meta Ads (Instagram / FB)</p>
                <p className="text-[10px] text-zinc-400">Raio de 5km • Foco em Vídeo Almoço</p>
              </div>
              <span className="bg-[#FFAA48] text-black font-black text-xs px-2.5 py-1 rounded-lg">
                ROAS 18.2x
              </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">iFood Ads Impulsionado</p>
                <p className="text-[10px] text-zinc-400">Topo de Categoria Delivery</p>
              </div>
              <span className="bg-emerald-500 text-black font-black text-xs px-2.5 py-1 rounded-lg">
                +1.120 Pedidos
              </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Google Ads (Restaurante Perto)</p>
                <p className="text-[10px] text-zinc-400">Intenção de Compra Direta</p>
              </div>
              <span className="bg-zinc-800 text-zinc-200 font-bold text-xs px-2.5 py-1 rounded-lg border border-zinc-700">
                CTR 9.4%
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FFAA48]/10 border border-[#FFAA48]/30 rounded-2xl flex items-center justify-between text-xs text-[#FFAA48] font-bold">
            <span>Faturamento Gerado no Mês</span>
            <span className="text-white text-sm font-black">R$ 128.450,00</span>
          </div>
        </div>
      )
    },
    {
      id: 'cardapio',
      badge: 'DESIGN & ENGENHARIA',
      tag: 'Cardápio & Aumento de Ticket',
      title: 'Engenharia de Cardápio de Alta Conversão',
      shortDesc: 'Apresentação visual estratégica desenvolvida para vender mais.',
      icon: Utensils,
      color: '#F2942C',
      metrics: [
        { label: 'Aumento Ticket Médio', value: '+35%' },
        { label: 'Margem Otimizada', value: 'Até 65%' }
      ],
      bullets: [
        {
          title: 'Design Gastronômico Desejável',
          desc: 'Apresentação visual com fotos de altíssimo impacto, descrições apetitosas e organização psicológica de itens.'
        },
        {
          title: 'Destaque nos Pratos de Maior Margem',
          desc: 'Posicionamento estratégico dos seus produtos "Estrela" para induzir a escolha dos pratos mais lucrativos para a cozinha.'
        },
        {
          title: 'Ancoragem e Venda Casada (Upsell)',
          desc: 'Inclusão inteligente de adicionais, bebidas e sobremesas que aumentam o valor médio de cada pedido sem esforço.'
        }
      ],
      mockup: (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 space-y-3 shadow-2xl text-left">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#FFAA48]">
              <Sparkles className="w-4 h-4" />
              <span>Cardápio Estratégico</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              +35% Ticket Médio
            </span>
          </div>

          <div className="space-y-2">
            {/* Featured Item */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-[#FFAA48]/40 p-3 rounded-2xl relative overflow-hidden">
              <span className="absolute top-2 right-2 bg-[#FFAA48] text-black font-black text-[9px] uppercase px-2 py-0.5 rounded">
                Mais Vendido
              </span>
              <p className="text-xs font-black text-white">Combo Smash Duplo Bacon + Fritas</p>
              <p className="text-[10px] text-zinc-300 mt-0.5">Blend 160g, cheddar fatiado, bacon artesanal crocante</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-black text-[#FFAA48]">R$ 44,90</span>
                <span className="text-[10px] bg-black/60 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                  + Adicionar Milkshake (+R$ 14)
                </span>
              </div>
            </div>

            {/* Standard Item */}
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
              <p className="text-xs font-bold text-white">Burger Classic Salada</p>
              <p className="text-[10px] text-zinc-400">Pão brioche, carne 140g, alface, tomate e maionese da casa</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-200">R$ 32,90</span>
                <span className="text-[10px] text-zinc-400 font-medium">Margem Otimizada</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'growth',
      badge: 'ACOMPANHAMENTO DEDICADO',
      tag: 'Gestão & Performance',
      title: 'Consultoria e Gestão Comercial Contínua',
      shortDesc: 'Especialistas focados em fazer o seu restaurante faturar mais.',
      icon: BarChart3,
      color: '#3B82F6',
      metrics: [
        { label: 'Retenção de Clientes', value: '94%' },
        { label: 'Acompanhamento', value: 'Semanal' }
      ],
      bullets: [
        {
          title: 'Estratégias de Growth Gastronômico',
          desc: 'Planejamento personalizado adaptado ao porte e momento da sua loja com acompanhamento das principais métricas de venda.'
        },
        {
          title: 'Time de Especialistas no Ramo',
          desc: 'Atendimento direto por consultores que entendem de CMV, margens de lucro, iFood e operação real de restaurante.'
        },
        {
          title: 'Relatórios Claros de Resultados',
          desc: 'Sem métricas de vaidade. Mostramos exatamente quanto foi investido e quanto dinheiro entrou no seu caixa.'
        }
      ],
      mockup: (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 sm:p-5 space-y-3 shadow-2xl text-left">
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
            <span className="font-bold text-white">Evolução do Faturamento</span>
            <span className="text-emerald-400 font-black">+210% no Trimestre</span>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Meta Mensal de Vendas</span>
                <span className="text-[#FFAA48] font-bold">92% Concluída</span>
              </div>
              <div className="h-3 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-amber-500 to-[#FFAA48] rounded-full w-[92%]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
              <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl">
                <p className="text-[10px] text-zinc-400">Ticket Médio</p>
                <p className="font-black text-[#FFAA48] text-sm">R$ 82,40</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl">
                <p className="text-[10px] text-zinc-400">Taxa de Recompra</p>
                <p className="font-black text-emerald-400 text-sm">48% de Retorno</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentService = services[activeTab];

  return (
    <section id="o-que-fazemos" className="py-20 md:py-28 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFAA48]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFAA48]/10 border border-[#FFAA48]/30 px-4 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-[#FFAA48]" />
            <span className="text-[#FFAA48] text-xs font-black uppercase tracking-widest">
              O QUE FAZEMOS POR VOCÊ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            SOLUÇÕES DE <span className="text-[#FFAA48]">ALTO IMPACTO</span> PARA O SEU RESTAURANTE VENDER MAIS.
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg">
            Clique nas abas abaixo para explorar como cada pilar da nossa assessoria atua no seu negócio.
          </p>
        </div>

        {/* GENIUS TABS SELECTOR - 4 Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === idx;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isActive
                    ? 'bg-zinc-900 border-[#FFAA48] shadow-2xl shadow-[#FFAA48]/15 scale-[1.02]'
                    : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#FFAA48]" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-2xl transition-colors ${
                      isActive ? 'bg-[#FFAA48] text-black shadow-md' : 'bg-zinc-800 text-zinc-300 group-hover:text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      isActive
                        ? 'bg-[#FFAA48]/20 border-[#FFAA48]/40 text-[#FFAA48]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className={`text-base font-extrabold uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}>
                    {item.badge}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold">
                  <span className={isActive ? 'text-[#FFAA48]' : 'text-zinc-500 group-hover:text-zinc-300'}>
                    Ver Solução
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-[#FFAA48] translate-x-1' : 'text-zinc-600 group-hover:translate-x-1'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STAGE DISPLAY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFAA48]/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#FFAA48] text-black font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md">
                  {currentService.badge}
                </span>

                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFAA48]" />
                  <span>Método Exclusivo Gourmetize</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {currentService.title}
              </h3>

              {/* Bullet Features */}
              <div className="space-y-3.5 pt-2">
                {currentService.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 bg-black/50 border border-zinc-800/80 p-4 rounded-2xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#FFAA48] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      <strong className="text-white font-bold">{bullet.title}: </strong>
                      {bullet.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {currentService.metrics.map((m, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl">
                    <p className="text-[11px] text-zinc-400 font-bold uppercase">{m.label}</p>
                    <p className="text-xl sm:text-2xl font-black text-[#FFAA48]">{m.value}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Interactive Mockup Column */}
            <div className="lg:col-span-5 flex items-center justify-center">
              {currentService.mockup}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
