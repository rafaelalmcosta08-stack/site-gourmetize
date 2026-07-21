import React, { useState } from 'react';
import {
  Kanban,
  Plus,
  Search,
  Building2,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UserCheck,
  MessageSquare,
  DollarSign,
  X,
  Trash2,
  MoreVertical,
  ChevronRight,
} from 'lucide-react';
import { CRMLead, CRMStage } from '../../types/admin';

interface CrmTabProps {
  leads: CRMLead[];
  onUpdateStage: (id: string, newStage: CRMStage) => void;
  onConvertToClient: (lead: CRMLead) => void;
  onAddCRMLead: (lead: Omit<CRMLead, 'id' | 'createdAt' | 'notes'>) => void;
  onDeleteCRMLead: (id: string) => void;
  onAddNote: (id: string, noteText: string) => void;
}

const STAGES: { id: CRMStage; label: string; color: string; bgColor: string; icon: string }[] = [
  { id: 'novo_lead', label: 'Novo Lead', color: 'text-amber-400', bgColor: 'bg-amber-500/10 border-amber-500/20', icon: '📥' },
  { id: 'contato_inicial', label: 'Contato Inicial', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/20', icon: '📞' },
  { id: 'reuniao_agendada', label: 'Análise Agendada', color: 'text-purple-400', bgColor: 'bg-purple-500/10 border-purple-500/20', icon: '📅' },
  { id: 'proposta_enviada', label: 'Proposta Enviada', color: 'text-indigo-400', bgColor: 'bg-indigo-500/10 border-indigo-500/20', icon: '📄' },
  { id: 'em_negociacao', label: 'Em Negociação', color: 'text-orange-400', bgColor: 'bg-orange-500/10 border-orange-500/20', icon: '🤝' },
  { id: 'fechado', label: 'Fechado (Cliente)', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20', icon: '🎉' },
  { id: 'perdido', label: 'Perdido', color: 'text-zinc-500', bgColor: 'bg-zinc-800/40 border-zinc-700/40', icon: '❌' },
];

export const CrmTab: React.FC<CrmTabProps> = ({
  leads,
  onUpdateStage,
  onConvertToClient,
  onAddCRMLead,
  onDeleteCRMLead,
  onAddNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    segment: 'Pizzarias',
    monthlyRevenue: 'R$ 20k a R$ 50k',
    stage: 'novo_lead' as CRMStage,
    estimatedValue: 2500,
    responsible: 'Equipe Comercial',
  });

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm)
  );

  const totalPipelineValue = filteredLeads
    .filter((l) => l.stage !== 'perdido')
    .reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.phone) {
      alert('Informe o restaurante e o telefone.');
      return;
    }
    onAddCRMLead(form);
    setShowAddModal(false);
    setForm({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      segment: 'Pizzarias',
      monthlyRevenue: 'R$ 20k a R$ 50k',
      stage: 'novo_lead',
      estimatedValue: 2500,
      responsible: 'Equipe Comercial',
    });
  };

  const handleAddNoteSubmit = () => {
    if (!newNote.trim() || !selectedLead) return;
    onAddNote(selectedLead.id, newNote);
    setSelectedLead({
      ...selectedLead,
      notes: [...selectedLead.notes, `${new Date().toLocaleDateString('pt-BR')} - ${newNote}`],
    });
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[#FFAA48] text-xs font-black uppercase tracking-wider mb-1">
            <Kanban className="w-4 h-4" />
            <span>Funil Comercial de Oportunidades</span>
          </div>
          <h1 className="text-2xl font-black text-white">CRM & Pipeline de Vendas</h1>
          <p className="text-xs text-zinc-400">
            Acompanhe o andamento das reuniões, propostas e negociações com donos de restaurante.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-2xl text-xs">
            <span className="text-zinc-400 font-medium">Pipeline Estimado: </span>
            <span className="text-emerald-400 font-black text-sm ml-1">
              R$ {totalPipelineValue.toLocaleString('pt-BR')} /mês
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#FFAA48] hover:bg-[#f09c38] text-black px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-lg shadow-[#FFAA48]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Oportunidade</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filtrar por nome do restaurante, contato ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48]"
        />
      </div>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stageObj) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stageObj.id);
          const stageSum = stageLeads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

          return (
            <div
              key={stageObj.id}
              className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-3 flex flex-col min-w-[260px] lg:min-w-[220px]"
            >
              {/* Column Header */}
              <div className={`p-3 rounded-xl border ${stageObj.bgColor} mb-3 space-y-1`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold flex items-center gap-1.5 ${stageObj.color}`}>
                    <span>{stageObj.icon}</span>
                    <span>{stageObj.label}</span>
                  </span>
                  <span className="text-[10px] font-black bg-black/40 px-2 py-0.5 rounded-full text-zinc-300">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-zinc-300">
                  R$ {stageSum.toLocaleString('pt-BR')}
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-8 text-[11px] text-zinc-600 italic border border-dashed border-zinc-800 rounded-xl">
                    Nenhuma oportunidade nesta etapa
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const phoneDigits = lead.phone.replace(/\D/g, '');
                    const whatsappUrl = `https://wa.me/55${phoneDigits}`;

                    return (
                      <div
                        key={lead.id}
                        className="bg-zinc-950 border border-zinc-800 hover:border-[#FFAA48]/60 p-3.5 rounded-2xl shadow-md space-y-3 transition-all group relative"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                              {lead.segment}
                            </span>
                            <h4 className="text-xs font-black text-white group-hover:text-[#FFAA48] transition-colors">
                              {lead.companyName}
                            </h4>
                            <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{lead.name}</p>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-black text-[#00E676]">
                              R$ {lead.estimatedValue}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-900">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>

                          <span className="text-[10px] text-zinc-500">
                            {lead.responsible}
                          </span>
                        </div>

                        {/* Stage Movement Controls & Conversion Action */}
                        <div className="flex items-center justify-between gap-1 pt-1">
                          {/* Left / Right Quick Shift Dropdown */}
                          <select
                            value={lead.stage}
                            onChange={(e) => onUpdateStage(lead.id, e.target.value as CRMStage)}
                            className="text-[10px] bg-zinc-900 text-zinc-300 font-bold border border-zinc-800 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                          >
                            {STAGES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.icon} {s.label}
                              </option>
                            ))}
                          </select>

                          {/* Detail View */}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white text-[10px] font-bold cursor-pointer"
                            title="Ver Notas / Histórico"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Convert to Client Button */}
                          {lead.stage !== 'fechado' && (
                            <button
                              onClick={() => {
                                if (confirm(`Convert ${lead.companyName} into an Active Client?`)) {
                                  onConvertToClient(lead);
                                }
                              }}
                              title="Converter em Cliente Ativo"
                              className="p-1.5 rounded-lg bg-[#00E676]/20 text-[#00E676] hover:bg-[#00E676]/30 transition-colors cursor-pointer"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Lead CRM Detail & Notes Manager */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFAA48]/10 text-[#FFAA48] flex items-center justify-center font-black text-xl">
                {selectedLead.companyName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#FFAA48] tracking-widest">
                  DETALHES DA OPORTUNIDADE (CRM)
                </span>
                <h3 className="text-xl font-black text-white">{selectedLead.companyName}</h3>
                <p className="text-xs text-zinc-400">
                  {selectedLead.name} • {selectedLead.segment}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <div>
                <span className="text-zinc-500 block">Valor Estimado do Contrato:</span>
                <span className="font-extrabold text-[#00E676] text-sm">
                  R$ {selectedLead.estimatedValue}/mês
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Responsável Comercial:</span>
                <span className="font-bold text-white">{selectedLead.responsible}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Telefone:</span>
                <span className="font-bold text-white">{selectedLead.phone}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">E-mail:</span>
                <span className="font-bold text-white">{selectedLead.email || 'N/A'}</span>
              </div>
            </div>

            {/* Notes Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                Histórico & Notas de Atendimento
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedLead.notes.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">Nenhuma observação cadastrada.</p>
                ) : (
                  selectedLead.notes.map((n, i) => (
                    <div
                      key={i}
                      className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-300 leading-relaxed"
                    >
                      {n}
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Nova nota ou resumo de ligação..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48]"
                />
                <button
                  onClick={handleAddNoteSubmit}
                  className="bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold px-3 py-2 rounded-xl text-xs cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
              <button
                onClick={() => {
                  if (confirm(`Remover ${selectedLead.companyName} do CRM?`)) {
                    onDeleteCRMLead(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir Oportunidade</span>
              </button>

              <button
                onClick={() => {
                  onConvertToClient(selectedLead);
                  setSelectedLead(null);
                }}
                className="bg-[#00E676] hover:bg-[#00c865] text-black font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Converter em Cliente Fechado</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add CRM Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-black text-white">Nova Oportunidade Comercial</h3>
              <p className="text-xs text-zinc-400">Insira dados do lead para o funil CRM</p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nome do Restaurante *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cantina Italia"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Nome do Contato</label>
                  <input
                    type="text"
                    placeholder="Ex: Pedro Silva"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 99999-8888"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Etapa do Funil</label>
                  <select
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value as CRMStage })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Valor do Contrato (R$)</label>
                  <input
                    type="number"
                    step="100"
                    value={form.estimatedValue}
                    onChange={(e) => setForm({ ...form, estimatedValue: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Cadastrar no CRM
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
