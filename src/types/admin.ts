export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  segment: string;
  monthlyRevenue: string;
  createdAt: string; // ISO String
  status: 'Novo' | 'Em Atendimento' | 'Convertido CRM' | 'Arquivado';
  notes?: string;
}

export type CRMStage =
  | 'novo_lead'
  | 'contato_inicial'
  | 'reuniao_agendada'
  | 'proposta_enviada'
  | 'em_negociacao'
  | 'fechado'
  | 'perdido';

export interface CRMLead {
  id: string;
  submissionId?: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  segment: string;
  monthlyRevenue: string;
  stage: CRMStage;
  estimatedValue: number; // Monthly contract value estimation e.g. 2500
  createdAt: string;
  lastContactAt?: string;
  notes: string[];
  responsible: string;
}

export interface ClientRecord {
  id: string;
  companyName: string;
  responsibleName: string;
  email: string;
  phone: string;
  segment: string;
  monthlyRevenue: string;
  contractValue: number; // e.g. 2500
  status: 'Ativo' | 'Em Implantação' | 'Pendente' | 'Cancelado';
  startDate: string;
  notes?: string;
}

export interface DashboardStats {
  totalSubmissions: number;
  newSubmissionsToday: number;
  totalCRMLeads: number;
  totalClients: number;
  activeClientsCount: number;
  totalMonthlyRevenue: number; // Sum of active client contracts
  conversionRate: number; // % converted to client
  leadsPerSegment: Record<string, number>;
  leadsPerRevenue: Record<string, number>;
}
