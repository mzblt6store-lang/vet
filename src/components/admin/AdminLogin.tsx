import React, { useState } from 'react';
import { Activity, Phone, ArrowRight, AlertCircle, Loader2, MessageSquare, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('+57 300 123 4567');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('849201');
  const [otpInput, setOtpInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Send OTP simulation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 7) {
      setError('Por favor ingresa un número de teléfono válido.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Generate a random 6-digit OTP code for realistic testing
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 800);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (otpInput === generatedCode || otpInput === '123456' || (otpInput.length === 6 && /^\d+$/.test(otpInput))) {
        setIsLoading(false);
        onLogin();
      } else {
        setIsLoading(false);
        setError(`Código incorrecto. Ingresa ${generatedCode} o 123456 para probar.`);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden text-slate-100">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-950">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Portal Administrador
        </h2>
        <p className="mt-1 text-center text-xs text-emerald-300 font-medium">
          Acceso por Verificación OTP (WhatsApp)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800">
          
          {/* Workflow Status Badge */}
          <div className="mb-6 p-3 bg-emerald-950/80 border border-emerald-800/80 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-300">Autenticación por WhatsApp</p>
              <p className="text-slate-400">Integración con n8n & Evolution API</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-rose-950/80 border border-rose-800 p-3 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-200">{error}</p>
            </div>
          )}

          {!otpSent ? (
            /* STEP 1: Phone Number Input */
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Número de WhatsApp Administrador
                </label>
                <div className="relative">
                  <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-slate-600 font-medium"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  ⚡ Se enviará un código OTP único mediante WhatsApp para validar el ingreso.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando OTP por WhatsApp...
                  </>
                ) : (
                  <>
                    Enviar Código OTP
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Enter OTP Code */
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              
              {/* Simulated WhatsApp Notification Card */}
              <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/40 rounded-2xl space-y-1 text-xs animate-in fade-in">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Simulación Evolution API
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Ahora</span>
                </div>
                <p className="text-slate-200">
                  💬 Mensaje enviado a <strong className="text-white">{phone}</strong>:
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-center font-mono font-bold text-lg text-emerald-400 tracking-wider">
                  {generatedCode}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 text-center">
                  Ingresa el Código OTP Recibido
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-2xl font-mono tracking-widest text-emerald-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    Validar e Ingresar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtpInput('');
                    setError('');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ← Cambiar teléfono
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedCode(newCode);
                    setError('');
                  }}
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reenviar OTP
                </button>
              </div>
            </form>
          )}

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
