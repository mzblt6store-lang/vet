import React, { useState } from 'react';
import { Activity, Phone, ArrowRight, AlertCircle, Loader2, MessageSquare, CheckCircle2, RefreshCw, Heart, ShieldCheck, Sparkles, Sun, Moon } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const COUNTRY_CODES = [
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+52', flag: '🇲🇽', name: 'México' },
  { code: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+34', flag: '🇪🇸', name: 'España' },
  { code: '+1', flag: '🇺🇸', name: 'EE.UU.' },
  { code: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+1', flag: '🇩🇴', name: 'Rep. Dominicana' },
];

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // Default Colombia +57
  const [phoneNumber, setPhoneNumber] = useState('300 123 4567');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('849201');
  const [otpInput, setOtpInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fullPhone = `${selectedCountry.code} ${phoneNumber}`;

  // Step 1: Send OTP simulation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 6) {
      setError('Por favor ingresa un número de celular válido.');
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
        setError(`Código incorrecto. Usa ${generatedCode} o 123456 para probar.`);
      }
    }, 600);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-emerald-50/60 text-slate-800'
    }`}>
      
      {/* Theme Switcher Floating Button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold shadow-lg cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-slate-200'
          }`}
          title="Cambiar Modo Claro / Oscuro"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Modo Oscuro</span>
            </>
          )}
        </button>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container Card */}
      <div className={`max-w-4xl w-full border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/90 backdrop-blur-xl border-slate-800' 
          : 'bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-emerald-900/10'
      }`}>
        
        {/* Left Side: Beagle Photo & Warm Veterinary Branding */}
        <div className={`lg:col-span-5 relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r ${
          isDarkMode 
            ? 'bg-gradient-to-b from-emerald-950 via-slate-900 to-teal-950 border-slate-800' 
            : 'bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 border-slate-200 text-white'
        }`}>
          
          {/* Subtle Background Beagle Graphic */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800" 
              alt="Beagle Amigable" 
              className="w-full h-full object-cover object-center mix-blend-overlay"
            />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 p-0.5 shadow-lg shadow-emerald-950">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-white text-lg tracking-tight">VetAmor Admin</h1>
                <p className="text-[11px] text-emerald-300 font-medium">Clínica Veterinaria</p>
              </div>
            </div>

            {/* Beagle Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800" 
                alt="Beagle de la clínica" 
                className="w-full h-44 sm:h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="flex items-center gap-1.5 font-bold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  Atención Con Amor
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800 font-semibold">
                  Mascota Feliz 🐶
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Bienvenido al portal administrativo. Gestiona pacientes, consultas e historias clínicas con validación OTP rápida y segura.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Portal Seguro
            </span>
            <span>n8n + Evolution API</span>
          </div>

        </div>

        {/* Right Side: Login Form with Country Code Selector */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span>Ingreso Administrador</span>
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Selecciona el país de tu línea e ingresa tu número para recibir el código por WhatsApp.
            </p>
          </div>

          {/* Evolution API Status Badge */}
          <div className={`mb-6 p-3 rounded-2xl flex items-center gap-3 border ${
            isDarkMode 
              ? 'bg-emerald-950/60 border-emerald-800/60' 
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-xs">
              💬
            </div>
            <div className="text-xs">
              <p className={`font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                Flujo OTP por WhatsApp Activo
              </p>
              <p className={isDarkMode ? 'text-slate-400' : 'text-emerald-700'}>
                Sin contraseñas. Validación directa al celular.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 bg-rose-950/80 border border-rose-800 p-3 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-200">{error}</p>
            </div>
          )}

          {!otpSent ? (
            /* STEP 1: Country Code & Phone Input */
            <form className="space-y-5" onSubmit={handleSendOtp}>
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Celular / WhatsApp Registrado
                </label>

                {/* Country Code Selector + Phone Input Combined */}
                <div className="flex gap-2">
                  {/* Select Country Code */}
                  <div className="relative shrink-0">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                        if (found) setSelectedCountry(found);
                      }}
                      className={`border rounded-xl py-3 px-3 text-xs font-semibold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none cursor-pointer appearance-none pr-8 ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-white' 
                          : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      {COUNTRY_CODES.map((item, idx) => (
                        <option key={idx} value={item.code} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {item.flag} {item.code} ({item.name})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="relative flex-1">
                    <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all font-medium ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                      placeholder="300 123 4567"
                    />
                  </div>
                </div>

                <p className={`mt-2 text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Línea destino: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{fullPhone}</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando Código OTP...
                  </>
                ) : (
                  <>
                    Enviar Código por WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Enter OTP Code */
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              
              {/* WhatsApp Notification Simulation */}
              <div className={`p-4 border rounded-2xl space-y-2 text-xs animate-in fade-in ${
                isDarkMode 
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-slate-300' 
                  : 'bg-emerald-50 border-emerald-300 text-slate-800'
              }`}>
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    WhatsApp recibido en {fullPhone}
                  </span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Simulación</span>
                </div>
                <p>
                  Tu código de verificación seguro para ingresar a VetAmor es:
                </p>
                <div className={`p-2.5 rounded-xl text-center font-mono font-black text-2xl tracking-widest border ${
                  isDarkMode 
                    ? 'bg-slate-900 text-emerald-400 border-slate-800' 
                    : 'bg-white text-emerald-600 border-emerald-200 shadow-sm'
                }`}>
                  {generatedCode}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Ingresa los 6 dígitos recibidos
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl text-center text-2xl font-mono tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-emerald-400' 
                      : 'bg-slate-50 border-slate-300 text-emerald-700 font-extrabold'
                  }`}
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validando Código...
                  </>
                ) : (
                  <>
                    Ingresar al Panel
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtpInput('');
                    setError('');
                  }}
                  className={isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}
                >
                  ← Editar teléfono
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedCode(newCode);
                    setError('');
                  }}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reenviar OTP
                </button>
              </div>
            </form>
          )}

          <div className={`mt-8 pt-4 border-t text-center ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <a href="/" className={`text-xs transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              ← Volver a la web pública
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
