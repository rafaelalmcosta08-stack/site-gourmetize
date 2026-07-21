import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { LeadFormData } from '../types';

interface LeadCaptureProps {
  onSubmitSuccess: (data: LeadFormData) => void;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    segment: 'Pizzarias',
    monthlyRevenue: 'R$ 20k a R$ 50k',
  });

  const capitalizeWords = (str: string) => {
    if (!str) return '';
    return str.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
  };

  const handleEmailChange = (val: string) => {
    return val.replace(/\s+/g, '');
  };

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (val: string) => {
    // Strip all non-digit characters so no letters or illegal symbols can be typed
    const digitsOnly = val.replace(/\D/g, '');
    const trimmed = digitsOnly.slice(0, 11);

    if (trimmed.length >= 10 && phoneError) {
      setPhoneError('');
    }

    if (trimmed.length === 0) return '';
    if (trimmed.length <= 2) return `(${trimmed}`;
    if (trimmed.length <= 6) return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2)}`;
    if (trimmed.length <= 10) return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 6)}-${trimmed.slice(6)}`;
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 7)}-${trimmed.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setPhoneError('Por favor, informe todos os dígitos do telefone com DDD (10 ou 11 dígitos).');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setPhoneError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 600);
  };

  return (
    <section id="formulario" className="py-16 md:py-24 bg-white text-zinc-900 relative overflow-hidden border-t border-zinc-100">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FFAA48]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Copy & Instructions */}
          <div className="lg:col-span-6 space-y-8">
            {/* Aviso Badge */}
            <div>
              <span className="inline-block bg-[#FFAA48] text-black font-extrabold text-xs uppercase px-3 py-1 rounded-sm tracking-wider mb-4 shadow-sm">
                AVISO
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-zinc-950">
                NÃO SAIA AGORA! <br />
                FALTAM <span className="text-[#F2942C] underline decoration-[#F2942C]/40">POUCOS SEGUNDOS</span> PARA SEU RESTAURANTE MUDAR.
              </h2>
            </div>

            {/* Steps List */}
            <div className="space-y-6 pt-2">
              {/* Step 1 */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex gap-5 items-start shadow-md transform transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#FFAA48] text-black font-black flex items-center justify-center text-lg shrink-0 shadow-md">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-1">
                    Complete o formulário
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Forneça suas informações no formulário ao lado. Garantimos a segurança total de seus dados. Serão usados apenas para contato oficial da Assessoria Gourmetize.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex gap-5 items-start shadow-md transform transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#FFAA48] text-black font-black flex items-center justify-center text-lg shrink-0 shadow-md">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-1">
                    Receba uma ligação personalizada
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Em um prazo de até <span className="text-[#F2942C] font-extrabold">5 minutos</span> em horário comercial, um dos nossos especialistas em marketing gastronômico entrará em contato diretamente para agendar a reunião mais importante com você.
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Trust Seals */}
            <div className="flex items-center gap-6 pt-4 text-xs text-zinc-600 border-t border-zinc-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F2942C]" />
                <span className="font-semibold">Dados 100% Protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Sem Compromisso</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-6">
            <div className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="mb-6 border-b border-zinc-800 pb-4">
                <h3 className="text-xl font-extrabold text-white">Solicitar Análise Gratuita</h3>
                <p className="text-xs text-zinc-400 mt-1">Descubra como multiplicar o faturamento do seu restaurante</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Seu nome <span className="text-[#FFAA48]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoCapitalize="words"
                    placeholder="Ex: Carlos Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: capitalizeWords(e.target.value) })}
                    className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48] transition-colors capitalize"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Seu melhor e-mail <span className="text-[#FFAA48]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoCapitalize="none"
                    placeholder="carlos@restaurante.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: handleEmailChange(e.target.value) })}
                    onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }}
                    className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48] transition-colors"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Telefone (WhatsApp) <span className="text-[#FFAA48]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1 text-xs text-zinc-400 pointer-events-none border-r border-zinc-700 pr-2">
                      <span>🇧🇷</span>
                      <span>+55</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-8888"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: handlePhoneChange(e.target.value) })}
                      className={`w-full bg-zinc-800/90 border ${
                        phoneError ? 'border-red-500' : 'border-zinc-700/80'
                      } rounded-lg pl-20 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48] transition-colors`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-400 text-xs font-semibold mt-1.5 flex items-center gap-1">
                      <span>⚠️</span> {phoneError}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Nome da empresa / Restaurante
                  </label>
                  <input
                    type="text"
                    autoCapitalize="words"
                    placeholder="Ex: Bella Napoli Pizzaria"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: capitalizeWords(e.target.value) })}
                    className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48] transition-colors capitalize"
                  />
                </div>

                {/* Segment Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Selecionar segmento
                  </label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFAA48] transition-colors cursor-pointer"
                  >
                    <option value="Pizzarias">Pizzarias</option>
                    <option value="Hamburguerias">Hamburguerias</option>
                    <option value="Comida Japonesa / Sushi">Comida Japonesa / Sushi</option>
                    <option value="Restaurante Quilo / Buffet">Restaurante Quilo / Buffet</option>
                    <option value="Bar / Pub / Choperia">Bar / Pub / Choperia</option>
                    <option value="Delivery de Marmitas">Delivery de Marmitas / Fit</option>
                    <option value="Doceria / Confeitaria / Açaiteria">Doceria / Confeitaria / Açaiteria</option>
                    <option value="Bistrô / À la Carte">Bistrô / À la Carte</option>
                    <option value="Outro Segmento">Outro Segmento Gastronômico</option>
                  </select>
                </div>

                {/* Revenue Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Coloque seu faturamento atual
                  </label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFAA48] transition-colors cursor-pointer"
                  >
                    <option value="Até R$ 20.000 /mês">Até R$ 20.000 /mês</option>
                    <option value="R$ 20k a R$ 50k">R$ 20.000 a R$ 50.000 /mês</option>
                    <option value="R$ 50k a R$ 100k">R$ 50.000 a R$ 100.000 /mês</option>
                    <option value="Acima de R$ 100.000 /mês">Acima de R$ 100.000 /mês</option>
                  </select>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#00E676] hover:bg-[#00c865] text-black font-black text-base py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg green-neon-glow cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Enviando solicitação...</span>
                    </span>
                  ) : (
                    <>
                      <span>Receber mais informações</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Seus dados estão seguros e não enviamos spam.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
