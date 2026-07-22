import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  Trash2,
  Download,
  Plus,
  Send,
  Eye,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  UserCheck,
} from 'lucide-react';
import { LeadSubmission } from '../../types/admin';

interface PreenchimentosTabProps {
  submissions: LeadSubmission[];
  onUpdateStatus: (id: string, newStatus: LeadSubmission['status']) => void;
  onSendToCRM: (sub: LeadSubmission) => void;
  onDeleteSubmission: (id: string) => void;
  onAddManualSubmission: (sub: Omit<LeadSubmission, 'id' | 'createdAt'>) => void;
}

export const PreenchimentosTab: React.FC<PreenchimentosTabProps> = ({
  submissions,
  onUpdateStatus,
  onSendToCRM,
  onDeleteSubmission,
  onAddManualSubmission,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedSub, setSelectedSub] = useState<LeadSubmission | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Pagination & Bulk Selection State
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<'createdAt' | 'companyName' | 'name' | 'segment' | 'status'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    segment: 'Pizzarias',
    monthlyRevenue: 'Selecionar',
    notes: '',
  });

  // Filter Logic
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);

    const matchesSegment = segmentFilter === 'Todos' || item.segment === segmentFilter;
    const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter;

    return matchesSearch && matchesSegment && matchesStatus;
  });

  // Sorting
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    if (sortField === 'createdAt') {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination Slicing
  const totalPages = Math.ceil(sortedSubmissions.length / pageSize) || 1;
  const paginatedSubmissions = sortedSubmissions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedSubmissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedSubmissions.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleBulkStatusChange = (newStatus: LeadSubmission['status']) => {
    selectedIds.forEach((id) => onUpdateStatus(id, newStatus));
    setSelectedIds([]);
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['ID,Nome,Email,Telefone,Empresa,Segmento,Faturamento,Status,Data'];
    const rows = submissions.map(
      (s) =>
        `"${s.id}","${s.name}","${s.email}","${s.phone}","${s.companyName}","${s.segment}","${
          s.monthlyRevenue
        }","${s.status}","${new Date(s.createdAt).toLocaleString()}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `preenchimentos_gourmetize_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      alert('Preencha o nome e o telefone.');
      return;
    }
    onAddManualSubmission({
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      companyName: newLead.companyName || 'Empresa não informada',
      segment: newLead.segment,
      monthlyRevenue: newLead.monthlyRevenue,
      status: 'Novo',
      notes: newLead.notes,
    });
    setShowAddModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      segment: 'Pizzarias',
      monthlyRevenue: 'R$ 20k a R$ 50k',
      notes: '',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Title & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[#FFAA48] text-xs font-black uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formulários Capturados</span>
          </div>
          <h1 className="text-2xl font-black text-white">Preenchimentos do Site</h1>
          <p className="text-xs text-zinc-400">
            Veja todos os restaurantes que solicitaram análise gratuita na landing page.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold border border-zinc-700 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FFAA48]" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#FFAA48] hover:bg-[#f09c38] text-black px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-lg shadow-[#FFAA48]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Registro Manual</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, restaurante, e-mail ou WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFAA48]"
          />
        </div>

        {/* Segment Filter */}
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFAA48] cursor-pointer"
          >
            <option value="Todos">Todos os Segmentos</option>
            <option value="Pizzarias">Pizzarias</option>
            <option value="Hamburguerias">Hamburguerias</option>
            <option value="Restaurante comida brasileira">Restaurante comida brasileira</option>
            <option value="Churrascaria steakhouse">Churrascaria steakhouse</option>
            <option value="Restaurante japonês">Restaurante japonês</option>
            <option value="Restaurante massas italiano">Restaurante massas italiano</option>
            <option value="Restaurante comida árabe">Restaurante comida árabe</option>
            <option value="Açaí / sorveteria">Açaí / sorveteria</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Doceria">Doceria</option>
            <option value="Gastrobar">Gastrobar</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFAA48] cursor-pointer"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Novo">Novo</option>
            <option value="Em Atendimento">Em Atendimento</option>
            <option value="Convertido CRM">Convertido em CRM</option>
            <option value="Arquivado">Arquivado</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions Banner */}
      {selectedIds.length > 0 && (
        <div className="bg-[#FFAA48]/10 border border-[#FFAA48]/30 p-4 rounded-2xl flex items-center justify-between text-xs animate-fadeIn">
          <span className="font-bold text-[#FFAA48]">
            {selectedIds.length} item(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange('Em Atendimento')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-bold border border-zinc-700"
            >
              Marcar Em Atendimento
            </button>
            <button
              onClick={() => handleBulkStatusChange('Arquivado')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-bold border border-zinc-700"
            >
              Arquivar Selecionados
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-zinc-400 hover:text-white underline ml-2"
            >
              Desmarcar
            </button>
          </div>
        </div>
      )}

      {/* Submissions Data Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-zinc-800 text-[11px] font-black uppercase tracking-wider text-zinc-400 select-none">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedSubmissions.length > 0 &&
                      selectedIds.length === paginatedSubmissions.length
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#FFAA48] rounded cursor-pointer"
                  />
                </th>
                <th
                  onClick={() => handleSort('companyName')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Restaurante / Empresa {sortField === 'companyName' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Contato Solicitante {sortField === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('segment')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Segmento {sortField === 'segment' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="py-3.5 px-4">Faturamento</th>
                <th
                  onClick={() => handleSort('createdAt')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Data Envio {sortField === 'createdAt' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Status {sortField === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {paginatedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-zinc-500">
                    Nenhum formulário encontrado com esses filtros.
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  const phoneDigits = sub.phone.replace(/\D/g, '');
                  const whatsappUrl = `https://wa.me/55${phoneDigits}?text=Ol%C3%A1%20${encodeURIComponent(
                    sub.name
                  )}%21%20Sou%20da%20Assessoria%20Gourmetize%20referente%20%C3%A0%20sua%20solicita%C3%A7%C3%A3o%20de%20an%C3%A1lise%20gratuita.`;

                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-zinc-800/40 transition-colors group ${
                        isSelected ? 'bg-[#FFAA48]/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(sub.id)}
                          className="w-4 h-4 accent-[#FFAA48] rounded cursor-pointer"
                        />
                      </td>

                      {/* Empresa */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#FFAA48] shrink-0" />
                          <span className="truncate max-w-[180px]">{sub.companyName}</span>
                        </div>
                      </td>

                      {/* Nome e Telefone */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-zinc-200">{sub.name}</div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                          <span>{sub.phone}</span>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline text-[10px] font-bold flex items-center gap-0.5"
                          >
                            WhatsApp ↗
                          </a>
                        </div>
                      </td>

                      {/* Segmento */}
                      <td className="py-4 px-4 text-zinc-300">
                        <span className="bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                          {sub.segment}
                        </span>
                      </td>

                      {/* Faturamento */}
                      <td className="py-4 px-4 font-bold text-emerald-400">
                        {sub.monthlyRevenue}
                      </td>

                      {/* Data */}
                      <td className="py-4 px-4 text-zinc-400 text-[11px]">
                        {new Date(sub.createdAt).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <select
                          value={sub.status}
                          onChange={(e) =>
                            onUpdateStatus(sub.id, e.target.value as LeadSubmission['status'])
                          }
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none border ${
                            sub.status === 'Novo'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : sub.status === 'Em Atendimento'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : sub.status === 'Convertido CRM'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          <option value="Novo">Novo</option>
                          <option value="Em Atendimento">Em Atendimento</option>
                          <option value="Convertido CRM">Convertido em CRM</option>
                          <option value="Arquivado">Arquivado</option>
                        </select>
                      </td>

                      {/* Ações */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Send to CRM */}
                          <button
                            onClick={() => onSendToCRM(sub)}
                            title="Enviar para o Funil de Vendas CRM"
                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>

                          {/* View details */}
                          <button
                            onClick={() => setSelectedSub(sub)}
                            title="Ver Raio-X Completo"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Remover preenchimento de ${sub.companyName}?`)) {
                                onDeleteSubmission(sub.id);
                              }
                            }}
                            title="Excluir"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-zinc-950 px-6 py-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div>
            Mostrando <strong className="text-white">{paginatedSubmissions.length}</strong> de{' '}
            <strong className="text-white">{sortedSubmissions.length}</strong> registros
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white font-bold transition-colors cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-zinc-300 font-bold px-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white font-bold transition-colors cursor-pointer"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Lead Raio-X Detail View */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFAA48]/10 text-[#FFAA48] flex items-center justify-center font-black text-xl">
                {selectedSub.companyName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#FFAA48] tracking-widest">
                  RAIO-X DO PREENCHIMENTO
                </span>
                <h3 className="text-xl font-black text-white">{selectedSub.companyName}</h3>
                <p className="text-xs text-zinc-400">{selectedSub.segment}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-zinc-950 p-4 rounded-2xl space-y-2 border border-zinc-800">
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Solicitante:</span>
                  <span className="font-bold text-white">{selectedSub.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">E-mail:</span>
                  <span className="font-bold text-white">{selectedSub.email || 'Não informado'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">WhatsApp/Telefone:</span>
                  <span className="font-bold text-emerald-400">{selectedSub.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Faturamento Declarado:</span>
                  <span className="font-bold text-[#FFAA48]">{selectedSub.monthlyRevenue}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Data e Hora de Envio:</span>
                  <span className="font-medium text-zinc-300">
                    {new Date(selectedSub.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              {selectedSub.notes && (
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Observações</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedSub.notes}</p>
                </div>
              )}
            </div>

            {/* Quick Action Footer */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/55${selectedSub.phone.replace(
                  /\D/g,
                  ''
                )}?text=Ol%C3%A1%20${encodeURIComponent(
                  selectedSub.name
                )}%21%20Sou%20da%20Assessoria%20Gourmetize.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Chamar no WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onSendToCRM(selectedSub);
                  setSelectedSub(null);
                }}
                className="flex-1 bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Mover para o CRM</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Lead */}
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
              <h3 className="text-xl font-black text-white">Novo Preenchimento Manual</h3>
              <p className="text-xs text-zinc-400">Cadastre um lead diretamente no sistema</p>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nome do Contato *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João Souza"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Nome da Empresa / Restaurante</label>
                <input
                  type="text"
                  placeholder="Ex: Pizzaria Mamma Mia"
                  value={newLead.companyName}
                  onChange={(e) => setNewLead({ ...newLead, companyName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Telefone (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 99999-8888"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">E-mail</label>
                  <input
                    type="email"
                    placeholder="joao@pizzaria.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Segmento</label>
                  <select
                    value={newLead.segment}
                    onChange={(e) => setNewLead({ ...newLead, segment: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  >
                    <option value="Pizzarias">Pizzarias</option>
                    <option value="Hamburguerias">Hamburguerias</option>
                    <option value="Restaurante comida brasileira">Restaurante comida brasileira</option>
                    <option value="Churrascaria steakhouse">Churrascaria steakhouse</option>
                    <option value="Restaurante japonês">Restaurante japonês</option>
                    <option value="Restaurante massas italiano">Restaurante massas italiano</option>
                    <option value="Restaurante comida árabe">Restaurante comida árabe</option>
                    <option value="Açaí / sorveteria">Açaí / sorveteria</option>
                    <option value="Cafeteria">Cafeteria</option>
                    <option value="Doceria">Doceria</option>
                    <option value="Gastrobar">Gastrobar</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Faturamento Estimado</label>
                  <select
                    value={newLead.monthlyRevenue}
                    onChange={(e) => setNewLead({ ...newLead, monthlyRevenue: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                  >
                    <option value="Selecionar">Selecionar</option>
                    <option value="Até 30 mil">Até 30 mil</option>
                    <option value="30 mil até 50 mil">30 mil até 50 mil</option>
                    <option value="50 mil até 80 mil">50 mil até 80 mil</option>
                    <option value="80 mil até 100 mil">80 mil até 100 mil</option>
                    <option value="100 mil até 150 mil">100 mil até 150 mil</option>
                    <option value="150 mil até 250 mil">150 mil até 250 mil</option>
                    <option value="250 mil até 400 mil">250 mil até 400 mil</option>
                    <option value="400 mil até 600 mil">400 mil até 600 mil</option>
                    <option value="600 mil até 1 milhão">600 mil até 1 milhão</option>
                    <option value="Mais de 1 milhão">Mais de 1 milhão</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Cadastrar Preenchimento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
