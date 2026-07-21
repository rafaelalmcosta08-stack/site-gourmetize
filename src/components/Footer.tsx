import React from 'react';
import { LogoImg } from './LogoImg';
import { Instagram, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 py-12 text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LogoImg
              alt="Assessoria Gourmetize"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFAA48] hover:border-[#FFAA48] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFAA48] hover:border-[#FFAA48] transition-colors font-bold text-xs"
              aria-label="TikTok"
            >
              🎵
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFAA48] hover:border-[#FFAA48] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#formulario"
              className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Legal Info */}
          <div className="text-center md:text-right text-zinc-500 space-y-1">
            <p>2026 © Assessoria Gourmetize. CNPJ: 48.684.183/0001-38</p>
            <p>Todos os direitos reservados. Marketing Gastronômico de Alta Performance.</p>
          </div>

        </div>

        {/* Back to top button */}
        <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-600">
          <div className="flex items-center gap-4">
            <span>Desenvolvido para Máxima Conversão de Vendas</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
