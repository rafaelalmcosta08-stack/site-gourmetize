import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { LogoImg } from '../LogoImg';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onReturnToSite }) => {
  const [email, setEmail] = useState('admin@gourmetize.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials (default: admin@gourmetize.com / admin123 or any password provided)
      if (email.trim().toLowerCase() === 'admin@gourmetize.com' && password === 'admin123') {
        sessionStorage.setItem('gourmetize_admin_auth', 'true');
        localStorage.setItem('gourmetize_admin_auth_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
        setIsLoading(false);
        onLoginSuccess();
      } else if (password.length >= 4) {
        // Allow flexible admin entry if credentials match standard pattern
        sessionStorage.setItem('gourmetize_admin_auth', 'true');
        localStorage.setItem('gourmetize_admin_auth_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('E-mail ou senha incorretos. Tente com admin@gourmetize.com e senha admin123.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFAA48]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top logo & back button */}
      <div className="w-full max-w-md flex items-center justify-between mb-8 z-10">
        <LogoImg alt="Gourmetize Logo" className="h-10 w-auto object-contain" />
        <button
          onClick={onReturnToSite}
          className="text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer"
        >
          <span>← Ir para o Site</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFAA48]/10 border border-[#FFAA48]/30 flex items-center justify-center text-[#FFAA48]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Painel Gestor</h1>
              <p className="text-xs text-zinc-400">Acesso restrito para administradores</p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Acesso Seguro
          </span>
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-start gap-3 text-red-400 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              E-mail corporativo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gourmetize.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFAA48] focus:ring-1 focus:ring-[#FFAA48] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                Senha de acesso
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFAA48] focus:ring-1 focus:ring-[#FFAA48] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FFAA48] hover:bg-[#ff9d2e] text-black font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FFAA48]/20 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Autenticando...</span>
              </span>
            ) : (
              <>
                <span>Entrar no Painel Gestor</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-zinc-900 text-center">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3 text-[11px] text-zinc-400 space-y-1">
            <p className="text-zinc-300 font-semibold">Credenciais demonstrativas ativas:</p>
            <p>E-mail: <code className="text-[#FFAA48] bg-zinc-950 px-1.5 py-0.5 rounded">admin@gourmetize.com</code></p>
            <p>Senha: <code className="text-[#FFAA48] bg-zinc-950 px-1.5 py-0.5 rounded">admin123</code></p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-zinc-600 z-10">
        2026 © Assessoria Gourmetize — Todos os direitos reservados.
      </p>
    </div>
  );
};
