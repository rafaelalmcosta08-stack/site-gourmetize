import React from 'react';
import { CheckCircle2, MessageCircle, X, Sparkles, PhoneCall, Clock } from 'lucide-react';
import { LeadFormData } from '../types';
import { GOURMETIZE_LOGO } from './Navbar';

interface LeadModalProps {
  leadData: LeadFormData | null;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ leadData, onClose }) => {
  if (!leadData) return null;

  const handleWhatsAppRedirect = () => {
    const text = `Olá! Acabei de enviar minhas informações no site da Assessoria Gourmetize.%0A%0A*Nome:* ${encodeURIComponent(leadData.name)}%0A*Empresa:* ${encodeURIComponent(leadData.companyName || 'Não informado')}%0A*Segmento:* ${encodeURIComponent(leadData.segment)}%0A*Faturamento:* ${encodeURIComponent(leadData.monthlyRevenue)}%0A%0AGostaria de agendar meu diagnóstico gratuito de tráfego pago!`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-8 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex justify-center">
          <img src={GOURMETIZE_LOGO} alt="Assessoria Gourmetize" className="h-10 w-auto object-contain mix-blend-multiply bg-white rounded-md p-1" />
        </div>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        {/* Headline */}
        <div>
          <span className="text-[11px] font-bold text-[#FFAA48] uppercase tracking-widest bg-[#FFAA48]/10 border border-[#FFAA48]/30 px-3 py-1 rounded-full inline-block mb-2">
            Solicitação Recebida!
          </span>
          <h3 className="text-2xl font-black text-white uppercase">
            Perfeito, {leadData.name.split(' ')[0]}!
          </h3>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            Nossos especialistas em marketing para <strong className="text-[#FFAA48]">{leadData.segment}</strong> já estão analisando o seu perfil.
          </p>
        </div>

        {/* Form Summary Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">Restaurante:</span>
            <span className="font-bold text-white">{leadData.companyName || 'Registrado'}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-zinc-500">Faturamento Atual:</span>
            <span className="font-bold text-[#FFAA48]">{leadData.monthlyRevenue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Garantia de Atendimento:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Em até 5 min
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-transform transform hover:scale-105 shadow-xl green-neon-glow cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>Falar no WhatsApp com Especialista</span>
          </button>

          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white transition-colors block w-full py-1"
          >
            Fechar e continuar navegando no site
          </button>
        </div>

      </div>
    </div>
  );
};
