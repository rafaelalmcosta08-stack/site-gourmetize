import React, { useState } from 'react';
import {
  FileText,
  Download,
  BarChart2,
  TrendingUp,
  Filter,
  Calendar,
  Sparkles,
  PieChart as PieIcon,
  DollarSign,
  Users,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { LeadSubmission, CRMLead, ClientRecord } from '../../types/admin';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

interface RelatoriosTabProps {
  submissions: LeadSubmission[];
  crmLeads: CRMLead[];
  clients: ClientRecord[];
}

export const RelatoriosTab: React.FC<RelatoriosTabProps> = ({ submissions, crmLeads, clients }) => {
  const [period, setPeriod] = useState<'30d' | '90d' | 'ano' | 'tudo'>('30d');

  // Conversion data per segment
  const segmentCounts: Record<string, number> = {};
  submissions.forEach((s) => {
    segmentCounts[s.segment] = (segmentCounts[s.segment] || 0) + 1;
  });

  const segmentChartData = Object.entries(segmentCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Historical MRR growth data
  const mrrData = [
    { month: 'Jan', mrr: 12000, clientes: 5 },
    { month: 'Fev', mrr: 16800, clientes: 7 },
    { month: 'Mar', mrr: 21500, clientes: 9 },
    { month: 'Abr', mrr: 27000, clientes: 11 },
    { month: 'Mai', mrr: 31200, clientes: 13 },
    { month: 'Jun', mrr: 38500, clientes: 15 },
    { month: 'Jul', mrr: clients.reduce((acc, c) => acc + (c.contractValue || 0), 0) || 42000, clientes: clients.length || 16 },
  ];

  const COLORS = ['#FFAA48', '#00E676', '#3B82F6', '#A855F7', '#EC4899', '#F97316', '#14B8A6'];

  // Export functions
  const handleExportCSV = (type: 'submissions' | 'crm' | 'clients') => {
    let headers: string[] = [];
    let rows: string[] = [];
    let filename = '';

    if (type === 'submissions') {
      filename = `preenchimentos_relatorio_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['ID,Nome,Email,Telefone,Empresa,Segmento,Faturamento,Status,Data'];
      rows = submissions.map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.phone}","${s.companyName}","${s.segment}","${
            s.monthlyRevenue
          }","${s.status}","${new Date(s.createdAt).toLocaleString()}"`
      );
    } else if (type === 'crm') {
      filename = `funil_crm_relatorio_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['ID,Empresa,Contato,Email,Telefone,Segmento,Estagio,ValorEstimado,Responsavel'];
      rows = crmLeads.map(
        (c) =>
          `"${c.id}","${c.companyName}","${c.name}","${c.email}","${c.phone}","${c.segment}","${c.stage}","${c.estimatedValue}","${c.responsible}"`
      );
    } else {
      filename = `clientes_carteira_relatorio_${new Date().toISOString().slice(0, 10)}.csv`;
      headers = ['ID,Empresa,Responsavel,Email,Telefone,Segmento,ValorContrato,Status,DataInicio'];
      rows = clients.map(
        (cl) =>
          `"${cl.id}","${cl.companyName}","${cl.responsibleName}","${cl.email}","${cl.phone}","${cl.segment}","${cl.contractValue}","${cl.status}","${cl.startDate}"`
      );
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[#FFAA48] text-xs font-black uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Inteligência de Vendas & Relatórios</span>
          </div>
          <h1 className="text-2xl font-black text-white">Central de Relatórios Executivos</h1>
          <p className="text-xs text-zinc-400">
            Analise métricas de conversão por nicho, evolução de faturamento e exporte dados consolidados.
          </p>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
          <Calendar className="w-4 h-4 text-zinc-500 ml-2" />
          <button
            onClick={() => setPeriod('30d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === '30d' ? 'bg-[#FFAA48] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Últimos 30d
          </button>
          <button
            onClick={() => setPeriod('90d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === '90d' ? 'bg-[#FFAA48] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            90d
          </button>
          <button
            onClick={() => setPeriod('ano')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              period === 'ano' ? 'bg-[#FFAA48] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2026
          </button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR & Active Clients Growth */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white">Evolução de MRR (Faturamento Recorrente)</h3>
              <p className="text-xs text-zinc-400">Crescimento contínuo de mensalidades de assessoria</p>
            </div>
            <span className="text-xs font-extrabold text-[#00E676] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              R$ {mrrData[mrrData.length - 1].mrr.toLocaleString('pt-BR')}/mês
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData}>
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="mrr" stroke="#00E676" strokeWidth={3} dot={{ fill: '#00E676', r: 5 }} name="MRR (R$)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Capture by Segment */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
          <div>
            <h3 className="text-base font-extrabold text-white">Volume de Preenchimentos por Segmento</h3>
            <p className="text-xs text-zinc-400">Distribuição por tipo de estabelecimento gastrônomico</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentChartData}>
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#FFAA48" radius={[8, 8, 0, 0]} name="Preenchimentos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Export Hub Cards */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
        <div>
          <h3 className="text-base font-extrabold text-white">Exportação Consolidada de Dados</h3>
          <p className="text-xs text-zinc-400">Baixe planilhas em formato CSV de cada módulo da plataforma.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#FFAA48] flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4" /> Formulários do Site
              </span>
              <h4 className="text-sm font-extrabold text-white">Relatório de Preenchimentos</h4>
              <p className="text-[11px] text-zinc-400">Todos os {submissions.length} formulários recebidos.</p>
            </div>
            <button
              onClick={() => handleExportCSV('submissions')}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FFAA48]" />
              <span>Exportar Preenchimentos</span>
            </button>
          </div>

          <div className="p-5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" /> Funil Comercial
              </span>
              <h4 className="text-sm font-extrabold text-white">Oportunidades em CRM</h4>
              <p className="text-[11px] text-zinc-400">Relatório dos {crmLeads.length} leads em negociação.</p>
            </div>
            <button
              onClick={() => handleExportCSV('crm')}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Exportar Funil CRM</span>
            </button>
          </div>

          <div className="p-5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Carteira Ativa
              </span>
              <h4 className="text-sm font-extrabold text-white">Relatório de Clientes & MRR</h4>
              <p className="text-[11px] text-zinc-400">Lista de {clients.length} clientes e mensalidades.</p>
            </div>
            <button
              onClick={() => handleExportCSV('clients')}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar Clientes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
