import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ClientRecord, LeadSubmission, CRMLead } from '../types/admin';

const CONFIG_KEY = 'gourmetize_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) return parsed;
    }
  } catch (err) {
    console.error('Error reading Supabase config:', err);
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving Supabase config:', err);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey);
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

export function resetSupabaseClientInstance(): void {
  supabaseInstance = null;
}

// SQL Schema generator helper for user
export const SUPABASE_SQL_SCHEMA = `-- EXECUTE ESTE SQL NO SEU PAINEL DO SUPABASE (SQL EDITOR):

-- 1. Tabela de Clientes
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  responsible_name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  segment TEXT,
  monthly_revenue TEXT,
  contract_value NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Ativo',
  start_date TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Preenchimentos (Formulários do Site)
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company_name TEXT,
  segment TEXT,
  monthly_revenue TEXT,
  status TEXT DEFAULT 'Novo',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela do CRM (Oportunidades do Funil)
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id TEXT PRIMARY KEY,
  submission_id TEXT,
  name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  segment TEXT,
  monthly_revenue TEXT,
  stage TEXT DEFAULT 'novo_lead',
  estimated_value NUMERIC DEFAULT 0,
  notes JSONB DEFAULT '[]'::jsonb,
  responsible TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS e permitir Leitura/Escrita Pública (Anon)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to crm_leads" ON public.crm_leads FOR ALL USING (true) WITH CHECK (true);
`;

/**
 * Sync / Fetch Functions for Supabase
 */

// --- CLIENTS ---
export async function fetchClientsFromSupabase(): Promise<ClientRecord[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch clients error:', error.message);
      return null;
    }
    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      companyName: row.company_name,
      responsibleName: row.responsible_name || '',
      email: row.email || '',
      phone: row.phone,
      segment: row.segment || '',
      monthlyRevenue: row.monthly_revenue || '',
      contractValue: Number(row.contract_value) || 0,
      status: row.status as ClientRecord['status'],
      startDate: row.start_date || new Date().toISOString().slice(0, 10),
      notes: row.notes || '',
    }));
  } catch (err) {
    console.error('Error fetching clients from Supabase:', err);
    return null;
  }
}

export async function insertClientToSupabase(client: ClientRecord): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('clients').insert([
      {
        id: client.id,
        company_name: client.companyName,
        responsible_name: client.responsibleName,
        email: client.email,
        phone: client.phone,
        segment: client.segment,
        monthly_revenue: client.monthlyRevenue,
        contract_value: client.contractValue,
        status: client.status,
        start_date: client.startDate,
        notes: client.notes,
      },
    ]);

    if (error) {
      console.error('Supabase insert client error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to insert client to Supabase:', err);
    return false;
  }
}

export async function updateClientInSupabase(client: ClientRecord): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('clients')
      .update({
        company_name: client.companyName,
        responsible_name: client.responsibleName,
        email: client.email,
        phone: client.phone,
        segment: client.segment,
        monthly_revenue: client.monthlyRevenue,
        contract_value: client.contractValue,
        status: client.status,
        start_date: client.startDate,
        notes: client.notes,
      })
      .eq('id', client.id);

    if (error) {
      console.error('Supabase update client error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update client in Supabase:', err);
    return false;
  }
}

export async function deleteClientFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete client error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete client from Supabase:', err);
    return false;
  }
}

// --- SUBMISSIONS ---
export async function fetchSubmissionsFromSupabase(): Promise<LeadSubmission[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
    if (error) return null;
    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email || '',
      phone: row.phone,
      companyName: row.company_name || '',
      segment: row.segment || '',
      monthlyRevenue: row.monthly_revenue || '',
      createdAt: row.created_at || new Date().toISOString(),
      status: row.status as LeadSubmission['status'],
      notes: row.notes || '',
    }));
  } catch (err) {
    return null;
  }
}

export async function insertSubmissionToSupabase(sub: LeadSubmission): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('submissions').insert([
      {
        id: sub.id,
        name: sub.name,
        email: sub.email,
        phone: sub.phone,
        company_name: sub.companyName,
        segment: sub.segment,
        monthly_revenue: sub.monthlyRevenue,
        status: sub.status,
        notes: sub.notes,
        created_at: sub.createdAt,
      },
    ]);
    return !error;
  } catch (err) {
    return false;
  }
}

// --- CRM LEADS ---
export async function fetchCRMLeadsFromSupabase(): Promise<CRMLead[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.from('crm_leads').select('*').order('created_at', { ascending: false });
    if (error) return null;
    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      submissionId: row.submission_id,
      name: row.name,
      companyName: row.company_name,
      email: row.email || '',
      phone: row.phone,
      segment: row.segment || '',
      monthlyRevenue: row.monthly_revenue || '',
      stage: row.stage,
      estimatedValue: Number(row.estimated_value) || 0,
      createdAt: row.created_at || new Date().toISOString(),
      notes: Array.isArray(row.notes) ? row.notes : [],
      responsible: row.responsible || 'Equipe Comercial',
    }));
  } catch (err) {
    return null;
  }
}

export async function insertCRMLeadToSupabase(lead: CRMLead): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('crm_leads').insert([
      {
        id: lead.id,
        submission_id: lead.submissionId || null,
        name: lead.name,
        company_name: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        segment: lead.segment,
        monthly_revenue: lead.monthlyRevenue,
        stage: lead.stage,
        estimated_value: lead.estimatedValue,
        notes: lead.notes,
        responsible: lead.responsible,
        created_at: lead.createdAt,
      },
    ]);
    return !error;
  } catch (err) {
    return false;
  }
}
