import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { TickerTape } from './components/TickerTape';
import { LeadCapture } from './components/LeadCapture';
import { Testimonials } from './components/Testimonials';
import { WhoWeAre } from './components/WhoWeAre';
import { WhatWeDo } from './components/WhatWeDo';
import { YellowCallout } from './components/YellowCallout';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { Navbar } from './components/Navbar';
import { ScrollReveal } from './components/ScrollReveal';
import { LeadFormData } from './types';

// Admin Panel Imports
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { DashboardTab } from './components/admin/DashboardTab';
import { PreenchimentosTab } from './components/admin/PreenchimentosTab';
import { CrmTab } from './components/admin/CrmTab';
import { ClientesTab } from './components/admin/ClientesTab';
import { RelatoriosTab } from './components/admin/RelatoriosTab';
import { ConfiguracoesTab } from './components/admin/ConfiguracoesTab';
import { AdminLogin } from './components/admin/AdminLogin';

import {
  LeadSubmission,
  CRMLead,
  ClientRecord,
  CRMStage,
} from './types/admin';

import {
  getStoredSubmissions,
  saveSubmissions,
  getStoredCRMLeads,
  saveCRMLeads,
  getStoredClients,
  saveClients,
  registerNewFormSubmission,
  syncStorageWithSupabase,
  resetAdminDataToDefaults,
} from './utils/adminStorage';

export default function App() {
  // Route State: true if pathname is /painel
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gourmetize_admin_auth') === 'true';
  });

  const isPainelRoute = currentPath === '/painel' || currentPath === '/painel/';

  // Admin Tab State
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');

  // Lead Submission Confirmation Modal (Landing Page)
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  // Storage State
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [crmLeads, setCrmLeads] = useState<CRMLead[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initial load and sync with Supabase
  useEffect(() => {
    setSubmissions(getStoredSubmissions());
    setCrmLeads(getStoredCRMLeads());
    setClients(getStoredClients());

    // Asynchronously pull latest from Supabase if configured
    syncStorageWithSupabase().then((synced) => {
      setClients(synced.clients);
      setSubmissions(synced.submissions);
      setCrmLeads(synced.crmLeads);
    });
  }, []);

  // Navigation handlers
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gourmetize_admin_auth');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Sync helpers
  const handleUpdateSubmissionStatus = (id: string, newStatus: LeadSubmission['status']) => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s));
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter((s) => s.id !== id);
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  const handleAddManualSubmission = (newSub: Omit<LeadSubmission, 'id' | 'createdAt'>) => {
    const created: LeadSubmission = {
      ...newSub,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...submissions];
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  const handleSendToCRM = (sub: LeadSubmission) => {
    const existing = crmLeads.find((c) => c.submissionId === sub.id);
    if (existing) {
      alert(`O lead da empresa "${sub.companyName}" já está no CRM!`);
      setActiveAdminTab('crm');
      return;
    }

    const estimatedVal = sub.monthlyRevenue.includes('100.000')
      ? 3500
      : sub.monthlyRevenue.includes('50k')
      ? 2800
      : 2200;

    const newCRMLead: CRMLead = {
      id: `crm-${Date.now()}`,
      submissionId: sub.id,
      name: sub.name,
      companyName: sub.companyName,
      email: sub.email,
      phone: sub.phone,
      segment: sub.segment,
      monthlyRevenue: sub.monthlyRevenue,
      stage: 'novo_lead',
      estimatedValue: estimatedVal,
      createdAt: new Date().toISOString(),
      notes: [`Importado da aba Preenchimentos em ${new Date().toLocaleDateString('pt-BR')}`],
      responsible: 'Equipe Comercial',
    };

    const updatedCRM = [newCRMLead, ...crmLeads];
    setCrmLeads(updatedCRM);
    saveCRMLeads(updatedCRM);

    handleUpdateSubmissionStatus(sub.id, 'Convertido CRM');

    alert(`Lead "${sub.companyName}" enviado com sucesso para o Funil de Vendas CRM!`);
    setActiveAdminTab('crm');
  };

  const handleUpdateCRMStage = (id: string, newStage: CRMStage) => {
    const updated = crmLeads.map((c) => (c.id === id ? { ...c, stage: newStage } : c));
    setCrmLeads(updated);
    saveCRMLeads(updated);
  };

  const handleAddCRMLead = (newLeadData: Omit<CRMLead, 'id' | 'createdAt' | 'notes'>) => {
    const created: CRMLead = {
      ...newLeadData,
      id: `crm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      notes: [`Cadastrado manualmente no CRM em ${new Date().toLocaleDateString('pt-BR')}`],
    };
    const updated = [created, ...crmLeads];
    setCrmLeads(updated);
    saveCRMLeads(updated);
  };

  const handleDeleteCRMLead = (id: string) => {
    const updated = crmLeads.filter((c) => c.id !== id);
    setCrmLeads(updated);
    saveCRMLeads(updated);
  };

  const handleAddCRMNote = (id: string, noteText: string) => {
    const updated = crmLeads.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          notes: [...c.notes, `${new Date().toLocaleDateString('pt-BR')} - ${noteText}`],
        };
      }
      return c;
    });
    setCrmLeads(updated);
    saveCRMLeads(updated);
  };

  const handleConvertToClient = (lead: CRMLead) => {
    const existing = clients.find((c) => c.companyName.toLowerCase() === lead.companyName.toLowerCase());
    if (existing) {
      alert(`O cliente "${lead.companyName}" já está cadastrado na carteira de Clientes.`);
      setActiveAdminTab('clientes');
      return;
    }

    const newClient: ClientRecord = {
      id: `cli-${Date.now()}`,
      companyName: lead.companyName,
      responsibleName: lead.name,
      email: lead.email,
      phone: lead.phone,
      segment: lead.segment,
      monthlyRevenue: lead.monthlyRevenue,
      contractValue: lead.estimatedValue || 2800,
      status: 'Ativo',
      startDate: new Date().toISOString().slice(0, 10),
      notes: `Convertido do CRM Funil em ${new Date().toLocaleDateString('pt-BR')}`,
    };

    const updatedClients = [newClient, ...clients];
    setClients(updatedClients);
    saveClients(updatedClients);

    handleUpdateCRMStage(lead.id, 'fechado');

    alert(`🎉 Parabéns! ${lead.companyName} agora é um CLIENTE ATIVO com contrato de R$ ${newClient.contractValue}/mês!`);
    setActiveAdminTab('clientes');
  };

  const handleAddClient = (clientData: Omit<ClientRecord, 'id'>) => {
    const created: ClientRecord = {
      ...clientData,
      id: `cli-${Date.now()}`,
    };
    const updated = [created, ...clients];
    setClients(updated);
    saveClients(updated);
  };

  const handleUpdateClient = (updatedClient: ClientRecord) => {
    const updated = clients.map((c) => (c.id === updatedClient.id ? updatedClient : c));
    setClients(updated);
    saveClients(updated);
  };

  const handleDeleteClient = (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    saveClients(updated);
  };

  const handleResetData = () => {
    resetAdminDataToDefaults();
    setSubmissions(getStoredSubmissions());
    setCrmLeads(getStoredCRMLeads());
    setClients(getStoredClients());
    alert('Dados limpos com sucesso!');
  };

  // Landing page form submission
  const handleLeadSubmitSuccess = (data: LeadFormData) => {
    registerNewFormSubmission(data);
    setSubmissions(getStoredSubmissions());
    setCrmLeads(getStoredCRMLeads());
    setSubmittedLead(data);
  };

  const scrollToForm = () => {
    const element = document.getElementById('formulario');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Statistics
  const activeClientsCount = clients.filter((c) => c.status === 'Ativo').length;
  const totalMonthlyRevenue = clients
    .filter((c) => c.status === 'Ativo')
    .reduce((acc, c) => acc + (c.contractValue || 0), 0);

  const stats = {
    totalSubmissions: submissions.length,
    newSubmissionsToday: submissions.filter((s) => {
      const today = new Date().toDateString();
      return new Date(s.createdAt).toDateString() === today;
    }).length,
    totalCRMLeads: crmLeads.length,
    totalClients: clients.length,
    activeClientsCount,
    totalMonthlyRevenue,
    conversionRate:
      submissions.length > 0 ? Math.round((clients.length / submissions.length) * 100) : 0,
    leadsPerSegment: submissions.reduce((acc, s) => {
      const seg = s.segment || 'Outros';
      acc[seg] = (acc[seg] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    leadsPerRevenue: submissions.reduce((acc, s) => {
      const rev = s.monthlyRevenue || 'Outros';
      acc[rev] = (acc[rev] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const newSubmissionsCount = submissions.filter((s) => s.status === 'Novo').length;

  /* RENDER PAINEL ROUTE (/painel) */
  if (isPainelRoute) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onReturnToSite={() => navigateTo('/')}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={activeAdminTab}
        setActiveTab={setActiveAdminTab}
        onExitAdmin={() => navigateTo('/')}
        unreadCount={newSubmissionsCount}
        onResetData={handleResetData}
        onLogout={handleLogout}
        submissions={submissions}
        crmLeads={crmLeads}
        clients={clients}
      >
        {activeAdminTab === 'dashboard' && (
          <DashboardTab
            stats={stats}
            recentSubmissions={submissions}
            crmLeads={crmLeads}
            clients={clients}
            onNavigateTab={setActiveAdminTab}
            onNewClientClick={() => setActiveAdminTab('clientes')}
          />
        )}

        {activeAdminTab === 'preenchimentos' && (
          <PreenchimentosTab
            submissions={submissions}
            onUpdateStatus={handleUpdateSubmissionStatus}
            onSendToCRM={handleSendToCRM}
            onDeleteSubmission={handleDeleteSubmission}
            onAddManualSubmission={handleAddManualSubmission}
          />
        )}

        {activeAdminTab === 'crm' && (
          <CrmTab
            leads={crmLeads}
            onUpdateStage={handleUpdateCRMStage}
            onConvertToClient={handleConvertToClient}
            onAddCRMLead={handleAddCRMLead}
            onDeleteCRMLead={handleDeleteCRMLead}
            onAddNote={handleAddCRMNote}
          />
        )}

        {activeAdminTab === 'clientes' && (
          <ClientesTab
            clients={clients}
            onAddClient={handleAddClient}
            onUpdateClient={handleUpdateClient}
            onDeleteClient={handleDeleteClient}
          />
        )}

        {activeAdminTab === 'relatorios' && (
          <RelatoriosTab
            submissions={submissions}
            crmLeads={crmLeads}
            clients={clients}
          />
        )}

        {activeAdminTab === 'configuracoes' && (
          <ConfiguracoesTab />
        )}
      </AdminLayout>
    );
  }

  /* RENDER PUBLIC LANDING PAGE (Clean view with no header bar) */
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#FFAA48] selection:text-black">
      <main>
        <Hero onCtaClick={scrollToForm} />

        <ScrollReveal duration={0.5} direction="none">
          <TickerTape />
        </ScrollReveal>

        <ScrollReveal duration={0.7} direction="up">
          <LeadCapture onSubmitSuccess={handleLeadSubmitSuccess} />
        </ScrollReveal>

        <ScrollReveal duration={0.7} direction="up">
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal duration={0.7} direction="up">
          <WhoWeAre />
        </ScrollReveal>

        <ScrollReveal duration={0.7} direction="up">
          <WhatWeDo />
        </ScrollReveal>

        <ScrollReveal duration={0.6} direction="up">
          <YellowCallout onCtaClick={scrollToForm} />
        </ScrollReveal>

        <ScrollReveal duration={0.7} direction="up">
          <FAQ />
        </ScrollReveal>
      </main>

      <ScrollReveal duration={0.5} direction="up">
        <Footer />
      </ScrollReveal>

      <LeadModal
        leadData={submittedLead}
        onClose={() => setSubmittedLead(null)}
      />
    </div>
  );
}
