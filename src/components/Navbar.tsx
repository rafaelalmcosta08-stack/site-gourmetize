import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, PhoneCall } from 'lucide-react';

export const GOURMETIZE_LOGO = "https://res.cloudinary.com/epo1w9hl/image/upload/v1784657082/3.0_Gourmetize_udgsmm.png";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 py-3 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src={GOURMETIZE_LOGO}
            alt="Assessoria Gourmetize"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => scrollToSection('depoimentos')}
            className="hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            Depoimentos
          </button>
          <button
            onClick={() => scrollToSection('quem-somos')}
            className="hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            Quem Somos
          </button>
          <button
            onClick={() => scrollToSection('o-que-fazemos')}
            className="hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            Serviços
          </button>
          <button
            onClick={() => scrollToSection('calculadora')}
            className="hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            Calculadora ROI
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#FFAA48] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA / Status */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Atendimento Online</span>
          </div>

          <button
            onClick={() => scrollToSection('formulario')}
            className="bg-[#00E676] hover:bg-[#00c865] text-black font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all transform hover:scale-105 shadow-lg green-neon-glow cursor-pointer"
          >
            <span>Alavancar Restaurante</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => scrollToSection('formulario')}
            className="bg-[#00E676] text-black text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1 cursor-pointer"
          >
            <span>Contato</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('depoimentos')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-yellow-400"
          >
            Depoimentos
          </button>
          <button
            onClick={() => scrollToSection('quem-somos')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-yellow-400"
          >
            Quem Somos
          </button>
          <button
            onClick={() => scrollToSection('o-que-fazemos')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-yellow-400"
          >
            O Que Fazemos
          </button>
          <button
            onClick={() => scrollToSection('calculadora')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-yellow-400"
          >
            Calculadora ROI
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-yellow-400"
          >
            Perguntas Frequentes
          </button>
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('formulario')}
              className="w-full bg-[#00E676] text-black font-extrabold text-sm py-3 rounded-full flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Quero falar com um especialista</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
