import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, Copy, Check, RefreshCw, Key, Link } from 'lucide-react';
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  getSupabaseClient,
  resetSupabaseClientInstance,
  SUPABASE_SQL_SCHEMA,
} from '../../lib/supabase';

interface SupabaseConfigCardProps {
  onDataSynced?: () => void;
}

export const SupabaseConfigCard: React.FC<SupabaseConfigCardProps> = ({ onDataSynced }) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [copied, setCopied] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cfg = getStoredSupabaseConfig();
    setUrl(cfg.url);
    setAnonKey(cfg.anonKey);
    if (cfg.url && cfg.anonKey) {
      testConnection(cfg.url, cfg.anonKey);
    }
  }, []);

  const testConnection = async (testUrl: string, testKey: string) => {
    if (!testUrl || !testKey) {
      setStatus('disconnected');
      return;
    }
    setStatus('testing');
    setMessage('');

    try {
      saveSupabaseConfig({ url: testUrl, anonKey: testKey });
      resetSupabaseClientInstance();
      const supabase = getSupabaseClient();
      if (!supabase) {
        setStatus('disconnected');
        return;
      }

      // Quick ping to check if Supabase key/URL is valid
      const { error } = await supabase.from('clients').select('id').limit(1);
      if (error && error.code !== 'PGRST116' && !error.message.includes('relation "public.clients" does not exist')) {
        console.warn('Supabase test warning:', error.message);
      }

      setStatus('connected');
      setMessage('Conexão estabelecida com sucesso!');
      if (onDataSynced) onDataSynced();
    } catch (err: any) {
      console.error('Supabase connection error:', err);
      setStatus('disconnected');
      setMessage('Não foi possível conectar. Verifique a URL e a chave Anon.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    testConnection(url.trim(), anonKey.trim());
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Integração Supabase</span>
              {status === 'connected' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Conectado
                </span>
              )}
              {status === 'disconnected' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="w-3 h-3" />
                  Aguardando Credenciais
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-400">
              Conecte seu banco de dados Supabase para sincronizar clientes, leads e preenchimentos.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSqlModal(true)}
          className="text-xs font-semibold text-[#00E676] bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Script SQL das Tabelas</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs pt-2 border-t border-zinc-800/80">
        <div className="md:col-span-5 relative">
          <label className="block text-zinc-400 font-semibold mb-1">Project URL do Supabase</label>
          <div className="relative">
            <Link className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E676]"
            />
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <label className="block text-zinc-400 font-semibold mb-1">Anon Public Key</label>
          <div className="relative">
            <Key className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="eyJhY2Nlc3NfdG9rZW4iOi..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E676]"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={status === 'testing'}
            className="w-full bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {status === 'testing' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span>Salvar & Testar</span>
            )}
          </button>
        </div>
      </form>

      {message && (
        <p className={`text-xs ${status === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`}>
          {message}
        </p>
      )}

      {/* SQL Script Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Estrutura SQL para o Supabase</h3>
                <p className="text-xs text-zinc-400">Copie e cole este código no SQL Editor do seu projeto Supabase</p>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="text-zinc-400 hover:text-white text-xs bg-zinc-800 px-3 py-1.5 rounded-full"
              >
                Fechar
              </button>
            </div>

            <pre className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 text-[11px] text-zinc-300 font-mono max-h-80 overflow-y-auto whitespace-pre-wrap">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-zinc-500">
                Cria as tabelas <code>clients</code>, <code>submissions</code> e <code>crm_leads</code>.
              </span>
              <button
                onClick={copySql}
                className="bg-[#00E676] hover:bg-[#00c865] text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-black" />
                    <span>Copiar SQL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
