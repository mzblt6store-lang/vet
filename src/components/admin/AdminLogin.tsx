import React, { useState } from 'react';
import { Activity, Lock, Mail, ArrowRight, AlertCircle, Loader2, Phone, MessageSquare, Sparkles, KeyRound } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('admin@vetamor.com');
  const [password, setPassword] = useState('admin123');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickTestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Quick Test Credential Validation
    if (authMethod === 'password' && email === 'admin@vetamor.com' && password === 'admin123') {
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 600);
      return;
    }

    if (authMethod === 'otp') {
      if (!otpSent) {
        // Send OTP Simulation for n8n / Evolution API
        setTimeout(() => {
          setIsLoading(false);
          setOtpSent(true);
        }, 800);
        return;
      } else {
        // Verify OTP Simulation
        if (otpCode === '123456' || otpCode.length === 6) {
          setTimeout(() => {
            setIsLoading(false);
            onLogin();
          }, 600);
          return;
        } else {
          setIsLoading(false);
          setError('Código OTP inválido. Prueba con 123456');
          return;
        }
      }
    }

    // Real Supabase Auth fallback
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.session) onLogin();
    } catch (err: any) {
      setError(err.message || 'Credenciales no válidas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden text-slate-100">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-900/40">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Portal Administrador
        </h2>
        <p className="mt-1 text-center text-sm text-emerald-200/80">
          Clínica Veterinaria Amor & Huellitas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800">
          
          {/* Method Selector Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setAuthMethod('password'); setError(''); }}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMethod === 'password'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Contraseña
            </button>

            <button
              type="button"
              onClick={() => { setAuthMethod('otp'); setError(''); }}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                authMethod === 'otp'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              OTP WhatsApp
            </button>
          </div>

          {/* Quick Demo Login Pill */}
          <div className="mb-6 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-300">Modo Demo Activo</p>
                <p className="text-slate-400">Acceso instantáneo para evaluación</p>
              </div>
            </div>
            <button
              onClick={handleQuickTestLogin}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-lg transition-all shrink-0 cursor-pointer shadow-md"
            >
              Entrar Ya
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-950/80 border border-rose-800 p-3 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-200">{error}</p>
              </div>
            )}

            {authMethod === 'password' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-600"
                      placeholder="admin@vetamor.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {!otpSent ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Número de Teléfono (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-600"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">
                      ⚡ Preparado para integrar flujo automatizado con <strong>n8n</strong> y <strong>Evolution API</strong>.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Código de Verificación OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-xl font-mono tracking-widest text-emerald-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="123456"
                    />
                    <p className="mt-2 text-center text-xs text-slate-400">
                      Ingresa el código enviado a tu WhatsApp (Usa <strong>123456</strong> para probar)
                    </p>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  {authMethod === 'otp' && !otpSent ? 'Enviar Código por WhatsApp' : 'Ingresar al Portal Admin'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Volver al sitio público
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
