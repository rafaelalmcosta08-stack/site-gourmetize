import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Kanban,
  Users,
  Settings,
  Globe,
  Plus,
  RefreshCw,
  LogOut,
  Bell,
  Search,
  Sparkles,
  TrendingUp,
  Building2,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { LogoImg } from '../LogoImg';

export type AdminTab = 'dashboard' | 'preenchimentos' | 'crm' | 'clientes' | 'configuracoes';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  unreadCount?: number;
  children: React.ReactNode;
  onResetData?: () => void;
  onLogout?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onExitAdmin,
  unreadCount = 0,
  children,
  onResetData,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Visão Geral & Indicadores',
    },
    {
      id: 'preenchimentos' as AdminTab,
      label: 'Preenchimentos',
      icon: FileSpreadsheet,
      badge: unreadCount > 0 ? unreadCount : null,
      description: 'Formulários do Site',
    },
    {
      id: 'crm' as AdminTab,
      label: 'CRM Funil',
      icon: Kanban,
      badge: null,
      description: 'Gestão de Oportunidades',
    },
    {
      id: 'clientes' as AdminTab,
      label: 'Clientes',
      icon: Users,
      badge: null,
      description: 'Carteira Ativa & MRR',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-[#FFAA48] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LogoImg className="h-9 w-auto object-contain" />
            <div className="h-6 w-px bg-zinc-800 hidden sm:block" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black uppercase text-[#FFAA48] tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Painel do Gestor
              </span>
              <span className="text-[11px] text-zinc-400 font-medium">Gourmetize Back-Office</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Links */}
        <div className="flex items-center gap-3">
          {/* Quick Return to Site Button */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-700 transition-all cursor-pointer shadow-sm"
            title="Voltar para a Landing Page Pública"
          >
            <Globe className="w-4 h-4 text-[#FFAA48]" />
            <span className="hidden sm:inline">Ver Site Público</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 bg-zinc-900 border-r border-zinc-800 shrink-0 p-4 space-y-6 flex flex-col justify-between`}
        >
          <div className="space-y-6">
            <div className="px-2 pt-2">
              <p className="text-[10px] font-black tracking-widest uppercase text-zinc-500 mb-3">
                NAVEGAÇÃO PRINCIPAL
              </p>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FFAA48] text-black shadow-lg shadow-[#FFAA48]/20 font-extrabold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            isActive ? 'bg-black text-white' : 'bg-[#FFAA48] text-black'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick System Info Box */}
            <div className="p-3.5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Status do Servidor
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Online</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Sincronização em tempo real ativa. Novos formulários entram automaticamente no CRM.
              </p>
            </div>
          </div>

          {/* Footer Action to Reset or Logout */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            {onResetData && (
              <button
                onClick={() => {
                  if (confirm('Deseja restaurar os dados de demonstração originais?')) {
                    onResetData();
                  }
                }}
                className="w-full flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Dados Demo</span>
              </button>
            )}

            <button
              onClick={onLogout || onExitAdmin}
              className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 text-xs px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do Painel</span>
            </button>
          </div>
        </aside>

        {/* Main Content View Container */}
        <main className="flex-1 bg-zinc-950 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
