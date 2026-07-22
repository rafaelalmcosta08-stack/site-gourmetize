import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Users,
  Key,
  Globe,
  Bell,
  CheckCircle2,
  Lock,
  UserPlus,
  Trash2,
  Clock,
  Sparkles,
  Database,
  Webhook,
  Sliders,
  DollarSign,
} from 'lucide-react';
import { SupabaseConfigCard } from './SupabaseConfigCard';

export const ConfiguracoesTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'integracoes' | 'usuarios' | 'preferencias'>('integracoes');

  // Sample users data for user management
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Rafael Costa', email: 'admin@gourmetize.com.br', role: 'Administrador', status: 'Ativo', lastLogin: 'Hoje às 11:42' },
    { id: 'u2', name: 'Equipe Comercial', email: 'vendas@gourmetize.com.br', role: 'Gestor Comercial', status: 'Ativo', lastLogin: 'Ontem às 18:15' },
    { id: 'u3', name: 'Atendimento & Suporte', email: 'suporte@gourmetize.com.br', role: 'Operador', status: 'Ativo', lastLogin: '20/07/2026' },
  ]);

  const [auditLogs] = useState([
    { id: 'l1', action: 'Atualização de credenciais Supabase', user: 'Rafael Costa', date: 'Hoje às 10:15' },
    { id: 'l2', action: 'Exportação de relatório CSV de leads', user: 'Equipe Comercial', date: 'Ontem às 16:30' },
    { id: 'l3', action: 'Alteração de estágio do lead "Churrascaria Fogo Vivo"', user: 'Equipe Comercial', date: '19/07/2026' },
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Gestor Comercial' });

  // System preferences state
  const [prefs, setPrefs] = useState({
    leadStagnantDays: 3,
    emailNotifications: true,
    currency: 'BRL (R$)',
    autoAssignLeads: true,
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers([
      ...users,
      {
        id: `u-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'Ativo',
        lastLogin: 'Primeiro acesso pendente',
      },
    ]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'Gestor Comercial' });
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Remover este usuário do painel de gestão?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[#FFAA48] text-xs font-black uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Configurações Gerais & Segurança</span>
          </div>
          <h1 className="text-2xl font-black text-white">Central de Configurações</h1>
          <p className="text-xs text-zinc-400">
            Gerencie conexões de banco de dados, chaves de API, acessos de usuários e preferências da plataforma.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 shrink-0">
          <button
            onClick={() => setSubTab('integracoes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'integracoes'
                ? 'bg-[#FFAA48] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Integrações & BD</span>
          </button>
          <button
            onClick={() => setSubTab('usuarios')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'usuarios'
                ? 'bg-[#FFAA48] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Usuários & Permissões</span>
          </button>
          <button
            onClick={() => setSubTab('preferencias')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'preferencias'
                ? 'bg-[#FFAA48] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Preferências</span>
          </button>
        </div>
      </div>

      {/* SubTab Content */}
      {subTab === 'integracoes' && (
        <div className="space-y-6">
          {/* Supabase Config Component */}
          <SupabaseConfigCard />

          {/* Webhook & WhatsApp Integration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Webhook className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">Endpoint Webhook Formularíoc</h3>
                  <p className="text-xs text-zinc-400">Captura automática de leads do site</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Cada preenchimento no formulário de landing page é enviado via POST diretamente para o seu banco de dados local ou Supabase.
              </p>
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center justify-between text-xs text-zinc-300 font-mono">
                <span className="truncate">https://gourmetize.com.br/api/lead-capture</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                  Ativo (200 OK)
                </span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">WhatsApp & E-mail Gateway</h3>
                  <p className="text-xs text-zinc-400">Notificações instantâneas de novos leads</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Envie notificações automáticas no WhatsApp do gestor comercial assim que um restaurante preencher o formulário.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-300 font-bold">Notificação WhatsApp</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Habilitado
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'usuarios' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-base font-extrabold text-white">Usuários com Acesso ao Painel</h3>
                <p className="text-xs text-zinc-400">
                  Defina quais membros da equipe têm permissão de gerenciamento.
                </p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Adicionar Usuário</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-black tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">Nome / E-mail</th>
                    <th className="px-4 py-3">Nível de Acesso</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Último Acesso</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[11px] text-zinc-400">{u.email}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            u.role === 'Administrador'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : u.role === 'Gestor Comercial'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-400">{u.lastLogin}</td>
                      <td className="px-4 py-3.5 text-right">
                        {u.email !== 'admin@gourmetize.com.br' && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-zinc-500 hover:text-red-400 p-1 rounded transition-colors"
                            title="Excluir Usuário"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Audit Log Box */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFAA48]" />
                Log de Auditoria & Alterações Recentes
              </h4>
              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-200 font-medium">{log.action}</span>
                    <span className="text-[11px] text-zinc-500">
                      por <strong className="text-zinc-300">{log.user}</strong> em {log.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'preferencias' && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-6 shadow-lg max-w-2xl">
          <div>
            <h3 className="text-base font-extrabold text-white">Preferências do Sistema</h3>
            <p className="text-xs text-zinc-400">Ajuste regras do funil e notificações da plataforma.</p>
          </div>

          <div className="space-y-4 divide-y divide-zinc-800">
            <div className="flex items-center justify-between pt-2">
              <div>
                <label className="text-xs font-bold text-white block">
                  Alerta de Estagnação de Leads (dias)
                </label>
                <p className="text-[11px] text-zinc-400">
                  Destacar no CRM leads sem movimentação há mais de X dias
                </p>
              </div>
              <select
                value={prefs.leadStagnantDays}
                onChange={(e) => setPrefs({ ...prefs, leadStagnantDays: Number(e.target.value) })}
                className="bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#FFAA48]"
              >
                <option value={2}>2 dias</option>
                <option value={3}>3 dias (Padrão)</option>
                <option value={5}>5 dias</option>
                <option value={7}>7 dias</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <label className="text-xs font-bold text-white block">Notificações por E-mail</label>
                <p className="text-[11px] text-zinc-400">Receber alerta a cada novo formulário enviado</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.emailNotifications}
                onChange={(e) => setPrefs({ ...prefs, emailNotifications: e.target.checked })}
                className="w-4 h-4 accent-[#FFAA48] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <label className="text-xs font-bold text-white block">
                  Atribuição Automática de Leads
                </label>
                <p className="text-[11px] text-zinc-400">Atribuir novos preenchimentos para a Equipe Comercial</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.autoAssignLeads}
                onChange={(e) => setPrefs({ ...prefs, autoAssignLeads: e.target.checked })}
                className="w-4 h-4 accent-[#FFAA48] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-black text-white">Cadastrar Novo Usuário</h3>
            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-bold mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="carlos@gourmetize.com.br"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Função / Nível</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFAA48]"
                >
                  <option value="Gestor Comercial">Gestor Comercial</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Operador">Operador</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#FFAA48] hover:bg-[#f09c38] text-black font-extrabold px-4 py-2 rounded-xl"
                >
                  Salvar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
