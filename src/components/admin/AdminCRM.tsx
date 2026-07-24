import React, { useState } from 'react';
import { 
  Users, Calendar, Activity, Settings, LogOut, Search, Plus, FileText, 
  ChevronRight, Bell, Sparkles, CheckCircle2, Clock, AlertTriangle, 
  MessageSquare, Phone, Filter, ShieldCheck, Database, RefreshCw, Send,
  HeartPulse, Stethoscope, Syringe, Check, ExternalLink, Sun, Moon
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/veterinaryData';
import { supabase } from '../../lib/supabase';

// Mock Initial Data
const INITIAL_PATIENTS = [
  { id: 1, name: 'Luna', species: 'Perro', breed: 'Golden Retriever', owner: 'Carlos Rivera', phone: '+57 300 123 4567', lastVisit: '2023-10-12', status: 'Sano', avatar: '🐕' },
  { id: 2, name: 'Milo', species: 'Gato', breed: 'Persa', owner: 'Ana Gómez', phone: '+57 311 987 6543', lastVisit: '2023-10-15', status: 'En tratamiento', avatar: '🐈' },
  { id: 3, name: 'Max', species: 'Perro', breed: 'Bulldog', owner: 'Luis Pérez', phone: '+57 315 456 7890', lastVisit: '2023-10-18', status: 'Sano', avatar: '🐶' },
  { id: 4, name: 'Bella', species: 'Perro', breed: 'Poodle', owner: 'Marta Díaz', phone: '+57 302 234 5678', lastVisit: '2023-10-20', status: 'Vacunación pendiente', avatar: '🐩' },
  { id: 5, name: 'Thor', species: 'Gato', breed: 'Siames', owner: 'Jorge Blanco', phone: '+57 320 876 5432', lastVisit: '2023-10-22', status: 'Control pendiente', avatar: '🐱' },
];

const INITIAL_APPOINTMENTS = [
  { id: 101, petName: 'Luna', owner: 'Carlos Rivera', service: 'Consulta General', time: '09:00 AM', status: 'Completada', doctor: 'Dra. María Elena' },
  { id: 102, petName: 'Milo', owner: 'Ana Gómez', service: 'Vacunación Rabia', time: '10:30 AM', status: 'En curso', doctor: 'Dr. Alejandro' },
  { id: 103, petName: 'Thor', owner: 'Jorge Blanco', service: 'Ecografía de control', time: '02:00 PM', status: 'Confirmada', doctor: 'Dra. María Elena' },
  { id: 104, petName: 'Bella', owner: 'Marta Díaz', service: 'Profilaxis Dental', time: '04:15 PM', status: 'Pendiente', doctor: 'Dr. Alejandro' },
];

interface AdminCRMProps {
  onLogout: () => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'appointments' | 'integrations'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('todos');
  const [patientsList, setPatientsList] = useState(INITIAL_PATIENTS);
  const [appointmentsList, setAppointmentsList] = useState(INITIAL_APPOINTMENTS);
  
  // New Patient Modal state
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    species: 'Perro',
    breed: '',
    owner: '',
    phone: '',
  });

  // Notification Toast in Admin
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showAdminToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleReturnToSite = () => {
    window.location.href = '/';
  };

  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.owner) return;

    const created = {
      id: Date.now(),
      name: newPatient.name,
      species: newPatient.species,
      breed: newPatient.breed || 'Mestizo',
      owner: newPatient.owner,
      phone: newPatient.phone || '+57 300 000 0000',
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Sano',
      avatar: newPatient.species === 'Perro' ? '🐶' : '🐱',
    };

    setPatientsList([created, ...patientsList]);
    setIsAddPatientOpen(false);
    setNewPatient({ name: '', species: 'Perro', breed: '', owner: '', phone: '' });
    showAdminToast(`¡Mascota ${created.name} registrada correctamente!`);
  };

  const filteredPatients = patientsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'todos' || p.species.toLowerCase() === selectedSpecies.toLowerCase();
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100 selection:bg-emerald-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-800 selection:bg-emerald-400 selection:text-slate-900'
    }`}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 border-r flex-shrink-0 flex flex-col justify-between transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-950/90 border-slate-800/80' 
          : 'bg-white border-slate-200'
      }`}>
        <div>
          {/* Brand Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950">
                <HeartPulse className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <h1 className={`font-extrabold text-base leading-tight tracking-wide ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>VetAmor Admin</h1>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Gestión Médica</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              Resumen General
            </button>

            <button 
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'patients' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Pacientes & Historias
            </button>

            <button 
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'appointments' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Agenda de Citas
            </button>

            <button 
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'integrations' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              n8n & Evolution API
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className={`p-3 border-t space-y-1 ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <button 
            onClick={handleReturnToSite}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Sitio Web Público
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Bar */}
        <header className={`border-b h-16 flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar paciente, raza o propietario..." 
                className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Cambiar Modo Claro / Oscuro"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden lg:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden lg:inline">Modo Oscuro</span>
                </>
              )}
            </button>

            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
              isDarkMode 
                ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Evolution API: Conectado
            </div>

            <button 
              onClick={() => setIsAddPatientOpen(true)}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Mascota</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-6">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Stats Widgets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pacientes Registrados</p>
                      <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{patientsList.length}</h3>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-1">+3 esta semana</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                  </div>

                  <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Citas Programadas Hoy</p>
                      <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{appointmentsList.length}</h3>
                      <p className="text-[10px] text-amber-500 font-semibold mt-1">2 pendientes de atención</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                  </div>

                  <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Vacunación & Control</p>
                      <h3 className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>2</h3>
                      <p className="text-[10px] text-rose-500 font-semibold mt-1">Alertas enviadas por WhatsApp</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                      <Syringe className="w-6 h-6" />
                    </div>
                  </div>

                  <div className={`border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                    isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>WhatsApp OTP Status</p>
                      <h3 className="text-sm font-bold text-emerald-500 mt-1">Activo (n8n)</h3>
                      <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Evolution API v2</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div className={`border rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-emerald-950/60 to-slate-950 border-emerald-800/60' 
                    : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Flujo de Automatización con WhatsApp & Evolution API
                      </h3>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Envía recordatorios de citas y accesos OTP automáticamente directamente desde la consola administrativa.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('integrations')}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Ver Configuración n8n
                  </button>
                </div>

                {/* Recent Patients Quick Table */}
                <div className={`border rounded-2xl overflow-hidden p-5 ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-bold text-sm flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <Users className="w-4 h-4 text-emerald-500" />
                      Mascotas Atendidas Recientemente
                    </h3>
                    <button 
                      onClick={() => setActiveTab('patients')}
                      className="text-xs text-emerald-500 hover:underline font-semibold cursor-pointer"
                    >
                      Ver todos &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {patientsList.slice(0, 3).map((p) => (
                      <div key={p.id} className={`border rounded-xl p-3 flex items-center gap-3 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="text-2xl">{p.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-xs truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
                          <p className={`text-[11px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{p.species} • {p.breed}</p>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Dueño: {p.owner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PACIENTES */}
            {activeTab === 'patients' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Directorio de Pacientes</h2>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Listado de mascotas con historiales y contactos directo por WhatsApp</p>
                  </div>

                  {/* Species Filter Pills */}
                  <div className={`flex items-center gap-1.5 p-1 rounded-xl border text-xs ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    {['todos', 'perro', 'gato'].map((specie) => (
                      <button
                        key={specie}
                        onClick={() => setSelectedSpecies(specie)}
                        className={`px-3 py-1 rounded-lg capitalize font-semibold transition-all cursor-pointer ${
                          selectedSpecies === specie 
                            ? 'bg-emerald-500 text-slate-950 shadow-xs' 
                            : isDarkMode 
                              ? 'text-slate-400 hover:text-white' 
                              : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {specie}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patients Table */}
                <div className={`rounded-2xl border overflow-hidden shadow-xl ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className={`border-b font-semibold ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        <tr>
                          <th className="px-5 py-3">Mascota</th>
                          <th className="px-5 py-3">Especie & Raza</th>
                          <th className="px-5 py-3">Propietario</th>
                          <th className="px-5 py-3">WhatsApp / Teléfono</th>
                          <th className="px-5 py-3">Estado</th>
                          <th className="px-5 py-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${
                        isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'
                      }`}>
                        {filteredPatients.map((patient) => (
                          <tr key={patient.id} className={isDarkMode ? 'hover:bg-slate-900/60 transition-colors' : 'hover:bg-slate-50 transition-colors'}>
                            <td className={`px-5 py-3.5 font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              <span className="text-lg">{patient.avatar}</span>
                              <span>{patient.name}</span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`block font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{patient.species}</span>
                              <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{patient.breed}</span>
                            </td>
                            <td className="px-5 py-3.5 font-medium">{patient.owner}</td>
                            <td className="px-5 py-3.5">
                              <a 
                                href={`https://wa.me/${patient.phone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hola ${patient.owner}, te contactamos de la Clínica Veterinaria Amor & Huellitas para el seguimiento de ${patient.name}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors font-medium text-[11px] ${
                                  isDarkMode 
                                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900' 
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                }`}
                              >
                                <MessageSquare className="w-3 h-3" />
                                {patient.phone}
                              </a>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                patient.status === 'Sano' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' :
                                patient.status === 'En tratamiento' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' :
                                'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                              }`}>
                                {patient.status}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button 
                                onClick={() => showAdminToast(`Enviado recordatorio a ${patient.owner}`)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                }`}
                              >
                                Enviar Notificación
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AGENDA DE CITAS */}
            {activeTab === 'appointments' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Agenda Médica del Día</h2>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Control e historial de consultas programadas</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {appointmentsList.map((apt) => (
                    <div key={apt.id} className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-emerald-500 font-bold text-xs shrink-0 ${
                          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50 border-emerald-100'
                        }`}>
                          {apt.time}
                        </div>
                        <div>
                          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {apt.petName} — <span className={isDarkMode ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>{apt.service}</span>
                          </h4>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Dueño: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-900'}>{apt.owner}</strong> • Médico: {apt.doctor}
                          </p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 ${
                        isDarkMode ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          apt.status === 'Completada' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' :
                          apt.status === 'En curso' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' :
                          'bg-sky-500/10 text-sky-500 border border-sky-500/30'
                        }`}>
                          {apt.status}
                        </span>

                        <button 
                          onClick={() => {
                            setAppointmentsList(appointmentsList.map(a => a.id === apt.id ? { ...a, status: 'Completada' } : a));
                            showAdminToast(`Cita de ${apt.petName} marcada como Completada`);
                          }}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                            isDarkMode 
                              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300' 
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          }`}
                        >
                          Marcar Atendida
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: INTEGRACIONES N8N & EVOLUTION API */}
            {activeTab === 'integrations' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Integración con n8n, Evolution API & Supabase</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Estructura del webhook para autenticación por OTP de WhatsApp e historial de clientes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Evolution API Card */}
                  <div className={`border rounded-2xl p-5 space-y-3 ${
                    isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Evolution API (WhatsApp Gateway)</h3>
                        <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Envío automático de mensajes OTP & Confirmaciones</p>
                      </div>
                    </div>
                    
                    <div className={`space-y-2 text-xs p-3 rounded-xl border font-mono ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <p><span className="text-emerald-500 font-bold">POST</span> /message/sendText/vetamor</p>
                      <p><span className="text-slate-400">Header:</span> apikey: {`{{EVOLUTION_API_KEY}}`}</p>
                      <p><span className="text-slate-400">Body:</span> {`{"number": "57300...", "text": "Tu código OTP es 123456"}`}</p>
                    </div>
                  </div>

                  {/* n8n Workflow Card */}
                  <div className={`border rounded-2xl p-5 space-y-3 ${
                    isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Flujo de Automatización n8n</h3>
                        <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Orquestador de eventos, recordatorios e ingesta de citas</p>
                      </div>
                    </div>

                    <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Recibe webhook de la cita desde el Portal Web.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Genera y valida el token OTP telefónico.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Sincroniza registros en la base de datos Supabase.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Supabase Connection Card */}
                <div className={`border rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Database className="w-4 h-4 text-teal-500" />
                    Estado de Tablas en Supabase
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`border p-3 rounded-xl text-xs ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className="font-mono text-emerald-500 font-bold">pets</p>
                      <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>id, name, species, breed, owner_id</p>
                    </div>
                    <div className={`border p-3 rounded-xl text-xs ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className="font-mono text-emerald-500 font-bold">appointments</p>
                      <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>id, pet_id, service, date, status</p>
                    </div>
                    <div className={`border p-3 rounded-xl text-xs ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className="font-mono text-emerald-500 font-bold">owners</p>
                      <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>id, name, phone, otp_code</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </main>

      {/* Add Patient Modal */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-bold">Registrar Nueva Mascota</h3>
            <form onSubmit={handleAddPatientSubmit} className="space-y-3">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Nombre de la Mascota
                </label>
                <input 
                  type="text" 
                  required
                  value={newPatient.name} 
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="Ej: Max"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Especie</label>
                  <select 
                    value={newPatient.species}
                    onChange={(e) => setNewPatient({ ...newPatient, species: e.target.value })}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Perro">Perro 🐶</option>
                    <option value="Gato">Gato 🐱</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Raza</label>
                  <input 
                    type="text" 
                    value={newPatient.breed} 
                    onChange={(e) => setNewPatient({ ...newPatient, breed: e.target.value })}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                    placeholder="Ej: Golden"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Propietario / Dueño</label>
                <input 
                  type="text" 
                  required
                  value={newPatient.owner} 
                  onChange={(e) => setNewPatient({ ...newPatient, owner: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="Ej: Laura Ramírez"
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>WhatsApp / Teléfono</label>
                <input 
                  type="tel" 
                  value={newPatient.phone} 
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="+57 300 123 4567"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddPatientOpen(false)}
                  className={`w-1/2 py-2 rounded-xl font-semibold text-xs cursor-pointer ${
                    isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer"
                >
                  Guardar Mascota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
