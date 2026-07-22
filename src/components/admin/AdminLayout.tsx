import React, { useState, useRef, useEffect } from 'react';
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
  FileText,
  X,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { LogoImg } from '../LogoImg';
import { LeadSubmission, CRMLead, ClientRecord } from '../../types/admin';

export type AdminTab = 'dashboard' | 'preenchimentos' | 'crm' | 'clientes' | 'relatorios' | 'configuracoes';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  unreadCount?: number;
  children: React.ReactNode;
  onResetData?: () => void;
  onLogout?: () => void;
  submissions?: LeadSubmission[];
  crmLeads?: CRMLead[];
  clients?: ClientRecord[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onExitAdmin,
  unreadCount = 0,
  children,
  onResetData,
  onLogout,
  submissions = [],
  crmLeads = [],
  clients = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Sample notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Novo Preenchimento Recebido',
      desc: 'Pizzaria Bella Italia enviou um formulário.',
      time: 'Há 15 min',
      read: false,
      tab: 'preenchimentos' as AdminTab,
    },
    {
      id: 'n2',
      title: 'Alerta de Lead Parado',
      desc: 'Churrascaria Fogo Vivo sem interação há 4 dias.',
      time: 'Há 2h',
      read: false,
      tab: 'crm' as AdminTab,
    },
    {
      id: 'n3',
      title: 'Novo Cliente Cadastrado',
      desc: 'Doceria Cacau & Amor iniciou contrato de R$ 2.800/mês.',
      time: 'Ontem',
      read: true,
      tab: 'clientes' as AdminTab,
    },
  ]);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Global search filtering across preenchimentos, crm, and clients
  const searchResults = globalSearch.trim().length > 1
    ? [
        ...submissions
          .filter(
            (s) =>
              s.companyName.toLowerCase().includes(globalSearch.toLowerCase()) ||
              s.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
              s.phone.includes(globalSearch)
          )
          .map((s) => ({ id: s.id, type: 'Preenchimento', title: s.companyName, subtitle: s.name, tab: 'preenchimentos' as AdminTab })),
        ...crmLeads
          .filter(
            (c) =>
              c.companyName.toLowerCase().includes(globalSearch.toLowerCase()) ||
              c.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
              c.phone.includes(globalSearch)
          )
          .map((c) => ({ id: c.id, type: 'Oportunidade CRM', title: c.companyName, subtitle: c.stage, tab: 'crm' as AdminTab })),
        ...clients
          .filter(
            (cl) =>
              cl.companyName.toLowerCase().includes(globalSearch.toLowerCase()) ||
              cl.responsibleName.toLowerCase().includes(globalSearch.toLowerCase()) ||
              cl.phone.includes(globalSearch)
          )
          .map((cl) => ({ id: cl.id, type: 'Cliente Carteira', title: cl.companyName, subtitle: cl.status, tab: 'clientes' as AdminTab })),
      ]
    : [];

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
    {
      id: 'relatorios' as AdminTab,
      label: 'Relatórios',
      icon: FileText,
      badge: null,
      description: 'Inteligência de Vendas',
    },
    {
      id: 'configuracoes' as AdminTab,
      label: 'Configurações',
      icon: Settings,
      badge: null,
      description: 'Integrações & Acessos',
    },
  ];

  const getBreadcrumbLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Principal';
      case 'preenchimentos':
        return 'Preenchimentos do Site';
      case 'crm':
        return 'CRM Funil de Vendas';
      case 'clientes':
        return 'Clientes & MRR';
      case 'relatorios':
        return 'Central de Relatórios';
      case 'configuracoes':
        return 'Configurações do Sistema';
      default:
        return 'Visão Geral';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-[#FFAA48] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-4 shrink-0">
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

        {/* Global Search Input Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Busca global de leads, restaurantes ou clientes..."
            value={globalSearch}
            onChange={(e) => {
              setGlobalSearch(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48] transition-colors"
          />
          {globalSearch && (
            <button
              onClick={() => {
                setGlobalSearch('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search Overlay dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 max-h-80 overflow-y-auto">
              <p className="text-[10px] font-black text-zinc-500 uppercase px-3 py-1">Resultados Encontrados</p>
              {searchResults.map((res, idx) => (
                <button
                  key={`${res.id}-${idx}`}
                  onClick={() => {
                    setActiveTab(res.tab);
                    setShowSearchResults(false);
                    setGlobalSearch('');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-white">{res.title}</div>
                    <div className="text-[10px] text-zinc-400">{res.subtitle}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFAA48]/10 text-[#FFAA48]">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell Icon */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors cursor-pointer"
              title="Notificações do Sistema"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFAA48] text-black text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#FFAA48]" />
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">Notificações</h4>
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-zinc-400 hover:text-[#FFAA48] cursor-pointer"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setActiveTab(n.tab);
                        setShowNotifications(false);
                      }}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-colors ${
                        !n.read
                          ? 'bg-zinc-800/90 border-[#FFAA48]/30 hover:border-[#FFAA48]'
                          : 'bg-zinc-950/60 border-zinc-800/60 hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-white mb-0.5">
                        <span className="text-xs text-[#FFAA48]">{n.title}</span>
                        <span className="text-[10px] text-zinc-500 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

      {/* Context Breadcrumbs Banner */}
      <div className="bg-zinc-900/50 border-b border-zinc-800/60 px-4 sm:px-8 py-2 text-[11px] text-zinc-400 flex items-center gap-2">
        <span className="text-zinc-500 font-bold">Gourmetize Back-Office</span>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-[#FFAA48] font-bold">{getBreadcrumbLabel()}</span>
      </div>

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
                Sincronização em tempo real ativa. Novos formulários entram no CRM automaticamente.
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
