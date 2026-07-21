import { LeadSubmission, CRMLead, ClientRecord, DashboardStats } from '../types/admin';
import { LeadFormData } from '../types';
import {
  fetchClientsFromSupabase,
  insertClientToSupabase,
  updateClientInSupabase,
  deleteClientFromSupabase,
  fetchSubmissionsFromSupabase,
  insertSubmissionToSupabase,
  fetchCRMLeadsFromSupabase,
  insertCRMLeadToSupabase,
} from '../lib/supabase';

const STORAGE_KEYS = {
  SUBMISSIONS: 'gourmetize_submissions_v2',
  CRM_LEADS: 'gourmetize_crm_leads_v2',
  CLIENTS: 'gourmetize_clients_v2',
};

// All initial default seed lists are now empty per user request!
const INITIAL_SUBMISSIONS: LeadSubmission[] = [];
const INITIAL_CRM_LEADS: CRMLead[] = [];
const INITIAL_CLIENTS: ClientRecord[] = [];

// Helper to get from localStorage
export function getStoredSubmissions(): LeadSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading submissions:', err);
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmissions(list: LeadSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
}

export function getStoredCRMLeads(): CRMLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CRM_LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CRM_LEADS, JSON.stringify(INITIAL_CRM_LEADS));
      return INITIAL_CRM_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading CRM leads:', err);
    return INITIAL_CRM_LEADS;
  }
}

export function saveCRMLeads(list: CRMLead[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CRM_LEADS, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving CRM leads:', err);
  }
}

export function getStoredClients(): ClientRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading clients:', err);
    return INITIAL_CLIENTS;
  }
}

export function saveClients(list: ClientRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving clients:', err);
  }
}

/**
 * Sync all storage with Supabase database if configured
 */
export async function syncStorageWithSupabase(): Promise<{
  clients: ClientRecord[];
  submissions: LeadSubmission[];
  crmLeads: CRMLead[];
}> {
  let clients = getStoredClients();
  let submissions = getStoredSubmissions();
  let crmLeads = getStoredCRMLeads();

  try {
    const remoteClients = await fetchClientsFromSupabase();
    if (remoteClients) {
      clients = remoteClients;
      saveClients(clients);
    }

    const remoteSubmissions = await fetchSubmissionsFromSupabase();
    if (remoteSubmissions) {
      submissions = remoteSubmissions;
      saveSubmissions(submissions);
    }

    const remoteCRM = await fetchCRMLeadsFromSupabase();
    if (remoteCRM) {
      crmLeads = remoteCRM;
      saveCRMLeads(crmLeads);
    }
  } catch (err) {
    console.warn('Could not sync with Supabase (using local data):', err);
  }

  return { clients, submissions, crmLeads };
}

/**
 * Call this when a new lead fills out the form on the landing page!
 */
export function registerNewFormSubmission(data: LeadFormData): LeadSubmission {
  const submissions = getStoredSubmissions();
  
  const newSub: LeadSubmission = {
    id: `sub-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    companyName: data.companyName || 'Empresa não informada',
    segment: data.segment || 'Geral',
    monthlyRevenue: data.monthlyRevenue || 'Não informado',
    createdAt: new Date().toISOString(),
    status: 'Novo',
    notes: 'Lead enviado diretamente pelo site em tempo real.',
  };

  const updatedSubmissions = [newSub, ...submissions];
  saveSubmissions(updatedSubmissions);

  // Send to Supabase asynchronously
  insertSubmissionToSupabase(newSub).catch(console.error);

  // Automatically also populate in CRM as a new lead
  const crmLeads = getStoredCRMLeads();
  const estimatedVal = data.monthlyRevenue.includes('100.000')
    ? 3500
    : data.monthlyRevenue.includes('50k')
    ? 2800
    : 2200;

  const newCRMLead: CRMLead = {
    id: `crm-${Date.now()}`,
    submissionId: newSub.id,
    name: data.name,
    companyName: data.companyName || 'Empresa não informada',
    email: data.email,
    phone: data.phone,
    segment: data.segment || 'Geral',
    monthlyRevenue: data.monthlyRevenue || 'Não informado',
    stage: 'novo_lead',
    estimatedValue: estimatedVal,
    createdAt: new Date().toISOString(),
    notes: ['Cadastrado automaticamente via formulário do site.'],
    responsible: 'Equipe Comercial',
  };

  saveCRMLeads([newCRMLead, ...crmLeads]);
  insertCRMLeadToSupabase(newCRMLead).catch(console.error);

  return newSub;
}

/**
 * Calculates realtime stats for the Admin Dashboard
 */
export function getDashboardStats(): DashboardStats {
  const submissions = getStoredSubmissions();
  const crmLeads = getStoredCRMLeads();
  const clients = getStoredClients();

  const activeClients = clients.filter((c) => c.status === 'Ativo');
  const totalRevenue = activeClients.reduce((acc, c) => acc + (c.contractValue || 0), 0);

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const newToday = submissions.filter((s) => new Date(s.createdAt).getTime() >= startOfDay).length;

  const leadsPerSegment: Record<string, number> = {};
  submissions.forEach((s) => {
    const seg = s.segment || 'Outros';
    leadsPerSegment[seg] = (leadsPerSegment[seg] || 0) + 1;
  });

  const leadsPerRevenue: Record<string, number> = {};
  submissions.forEach((s) => {
    const rev = s.monthlyRevenue || 'Outros';
    leadsPerRevenue[rev] = (leadsPerRevenue[rev] || 0) + 1;
  });

  const conversionRate = submissions.length > 0
    ? Math.round((clients.length / submissions.length) * 100)
    : 0;

  return {
    totalSubmissions: submissions.length,
    newSubmissionsToday: newToday,
    totalCRMLeads: crmLeads.length,
    totalClients: clients.length,
    activeClientsCount: activeClients.length,
    totalMonthlyRevenue: totalRevenue,
    conversionRate,
    leadsPerSegment,
    leadsPerRevenue,
  };
}

/**
 * Reset all data to empty state
 */
export function resetAdminDataToDefaults(): void {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.CRM_LEADS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify([]));
}
