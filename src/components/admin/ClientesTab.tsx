import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Building2,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { ClientRecord } from '../../types/admin';
import { SupabaseConfigCard } from './SupabaseConfigCard';

interface ClientesTabProps {
  clients: ClientRecord[];
  onAddClient: (client: Omit<ClientRecord, 'id'>) => void;
  onUpdateClient: (client: ClientRecord) => void;
  onDeleteClient: (id: string) => void;
}

export const ClientesTab: React.FC<ClientesTabProps> = ({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);

  // Form State
  const [form, setForm] = useState({
    companyName: '',
    responsibleName: '',
    email: '',
    phone: '',
    segment: 'Pizzarias',
    monthlyRevenue: 'R$ 50k a R$ 100k',
    contractValue: 2800,
    status: 'Ativo' as ClientRecord['status'],
    startDate: new Date().toISOString().slice(0, 10),
    notes: '',
  });

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.responsibleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeClients = clients.filter((c) => c.status === 'Ativo');
  const totalMRR = activeClients.reduce((acc, c) => acc + (c.contractValue || 0), 0);
  const avgContract = activeClients.length > 0 ? Math.round(totalMRR / activeClients.length) : 0;

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.phone) {
      alert('Informe o restaurante e o telefone.');
      return;
    }
    onAddClient(form);
    setShowAddModal(false);
    setForm({
      companyName: '',
      responsibleName: '',
      email: '',
      phone: '',
      segment: 'Pizzarias',
      monthlyRevenue: 'R$ 50k a R$ 100k',
      contractValue: 2800,
      status: 'Ativo',
      startDate: new Date().toISOString().slice(0, 10),
      notes: '',
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    onUpdateClient(editingClient);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[#00E676] text-xs font-black uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Gestão da Carteira de Clientes</span>
          </div>
          <h1 className="text-2xl font-black text-white">Clientes & Contratos Ativos</h1>
          <p className="text-xs text-zinc-400">
            Acompanhe os restaurantes atendidos pela Assessoria Gourmetize e o faturamento recorrente.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-2xl text-xs space-y-0.5">
            <span className="text-zinc-400 font-medium block text-[10px] uppercase tracking-wider">
              Receita Recorrente (MRR)
            </span>
            <span className="text-[#00E676] font-black text-base">
              R$ {totalMRR.toLocaleString('pt-BR')}/mês
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#00E676] hover:bg-[#00c865] text-black px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-lg green-neon-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Cliente</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection Card */}
      <SupabaseConfigCard />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Clientes Ativos</span>
            <h3 className="text-xl font-black text-white">{activeClients.length}</h3>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFAA48]/10 text-[#FFAA48] flex items-center justify-center font-black">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Ticket Médio</span>
            <h3 className="text-xl font-black text-white">R$ {avgContract.toLocaleString('pt-BR')}/mês</h3>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Retenção de Carteira</span>
            <h3 className="text-xl font-black text-white">96.8%</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do cliente, restaurante, e-mail ou WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E676]"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E676] cursor-pointer"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Em Implantação">Em Implantação</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.length === 0 ? (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-3xl">
            Nenhum cliente cadastrado com esses filtros.
          </div>
        ) : (
          filteredClients.map((client) => {
            const phoneDigits = client.phone.replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/55${phoneDigits}`;

            return (
              <div
                key={client.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-5 rounded-3xl space-y-4 shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg">
                      {client.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white group-hover:text-[#00E676] transition-colors">
                        {client.companyName}
                      </h3>
                      <p className="text-xs text-zinc-400">{client.responsibleName}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                      client.status === 'Ativo'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : client.status === 'Em Implantação'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : client.status === 'Pendente'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800/80">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contrato Mensal:</span>
                    <span className="font-black text-[#00E676]">
                      R$ {client.contractValue.toLocaleString('pt-BR')}/mês
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Segmento:</span>
                    <span className="font-semibold text-zinc-300">{client.segment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Início do Contrato:</span>
                    <span className="font-semibold text-zinc-300">{client.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">WhatsApp:</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:underline"
                    >
                      {client.phone}
                    </a>
                  </div>
                </div>

                {client.notes && (
                  <p className="text-[11px] text-zinc-400 italic line-clamp-2 bg-zinc-950/40 p-2 rounded-xl">
                    "{client.notes}"
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contatar</span>
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingClient(client)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                      title="Editar Cliente"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remover o cliente ${client.companyName}?`)) {
                          onDeleteClient(client.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Excluir Cliente"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: New Client */}
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
              <h3 className="text-xl font-black text-white">Cadastrar Novo Cliente</h3>
              <p className="text-xs text-zinc-400">Adicione um restaurante com contrato fechado</p>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nome do Restaurante *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cantina Di Capri"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Responsável</label>
                  <input
                    type="text"
                    placeholder="Ex: Eduardo Ramos"
                    value={form.responsibleName}
                    onChange={(e) => setForm({ ...form, responsibleName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">WhatsApp / Telefone *</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 99999-8888"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Valor Contrato (R$/mês)</label>
                  <input
                    type="number"
                    step="100"
                    value={form.contractValue}
                    onChange={(e) => setForm({ ...form, contractValue: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as ClientRecord['status'] })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Em Implantação">Em Implantação</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Observações do Contrato</label>
                <textarea
                  rows={2}
                  placeholder="Informações adicionais..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Cadastrar Cliente
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Client */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setEditingClient(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-black text-white">Editar Cliente</h3>
              <p className="text-xs text-zinc-400">{editingClient.companyName}</p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nome do Restaurante</label>
                <input
                  type="text"
                  required
                  value={editingClient.companyName}
                  onChange={(e) =>
                    setEditingClient({ ...editingClient, companyName: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Responsável</label>
                  <input
                    type="text"
                    value={editingClient.responsibleName}
                    onChange={(e) =>
                      setEditingClient({ ...editingClient, responsibleName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Telefone</label>
                  <input
                    type="text"
                    value={editingClient.phone}
                    onChange={(e) =>
                      setEditingClient({ ...editingClient, phone: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Valor Contrato (R$)</label>
                  <input
                    type="number"
                    value={editingClient.contractValue}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        contractValue: Number(e.target.value),
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Status</label>
                  <select
                    value={editingClient.status}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        status: e.target.value as ClientRecord['status'],
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00E676]"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Em Implantação">Em Implantação</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Observações</label>
                <textarea
                  rows={2}
                  value={editingClient.notes || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E676]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
