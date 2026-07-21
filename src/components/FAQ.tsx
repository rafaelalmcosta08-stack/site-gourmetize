import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'O que exatamente a Assessoria Gourmetize faz?',
      answer: 'A Assessoria Gourmetize é a maior assessoria de marketing gastronômico da América Latina. Cuidamos de todo o ecossistema de vendas do seu restaurante: tráfego pago ultra-segmentado (Meta Ads, Google Ads e iFood Ads), automação inteligente de disparos e reativação no WhatsApp, engenharia de cardápio e posicionamento estratégico do seu salão e delivery.'
    },
    {
      id: 'faq-2',
      question: 'Posso cancelar quando quiser?',
      answer: 'Sim! Trabalhamos com modelos flexíveis e transparência total. Não prende você em fidelidades abusivas. Nosso foco é gerar tanto resultado de vendas que você considerará a Gourmetize o investimento mais lucrativo do seu negócio.'
    },
    {
      id: 'faq-3',
      question: 'Em quanto tempo vou ver resultados no meu restaurante?',
      answer: 'Nossos clientes sentem o aumento no fluxo de pedidos do delivery e movimento no salão já nos primeiros 7 a 15 dias de campanhas ativas. O método completo atinge maturidade com ROI 15x em até 90 dias.'
    },
    {
      id: 'faq-4',
      question: 'Vocês atendem qualquer tipo de restaurante?',
      answer: 'Sim! Atendemos pizzerias, hamburguerias, restaurantes de sushi/japonesa, buffet por quilo, bares, choperias, churrascarias, dark kitchens e operações de delivery de refeições.'
    },
    {
      id: 'faq-5',
      question: 'A Gourmetize cuida do meu Instagram e redes sociais?',
      answer: 'Com certeza! Além da gestão de tráfego pago de alta performance, fornecemos orientações e materiais de design para manter seu Instagram atrativo, profissional e pronto para converter seguidores em clientes pagantes.'
    },
    {
      id: 'faq-6',
      question: 'Como funciona o atendimento da equipe?',
      answer: 'Você recebe acompanhamento de gestores altamente capacitados. Além disso, ao preencher o formulário no nosso site, garantimos contato personalizado em até 5 minutos dentro do horário comercial.'
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Heading */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#FFAA48] text-xs font-black uppercase tracking-widest bg-[#FFAA48]/10 border border-[#FFAA48]/30 px-3.5 py-1.5 rounded-full inline-block">
              DÚVIDAS FREQUENTES
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              PERGUNTAS <br />
              <span className="text-[#FFAA48]">FREQUENTES</span>
            </h2>

            <p className="text-zinc-400 text-base leading-relaxed">
              Ficou com alguma dúvida sobre como a Assessoria Gourmetize funciona? Talvez a resposta esteja aqui.
            </p>

            <div className="pt-4">
              <a
                href="#formulario"
                className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-[#FFAA48] text-zinc-200 hover:text-[#FFAA48] px-5 py-3 rounded-xl text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#FFAA48]" />
                <span>Ainda com dúvidas? Fale direto no formulário</span>
              </a>
            </div>
          </div>

          {/* Right Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#FFAA48] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-[#FFAA48]/20 text-[#FFAA48] flex items-center justify-center text-xs font-black shrink-0">
                        ?
                      </div>
                      <span>{item.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#FFAA48]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 mt-1">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
