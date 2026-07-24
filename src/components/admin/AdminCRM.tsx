import React, { useState } from 'react';
import { Users, Calendar, Activity, Settings, LogOut, Search, Plus, FileText, ChevronRight, Bell } from 'lucide-react';
import { CLINIC_INFO } from '../../data/veterinaryData';

// Placeholder Mock Data (Will be replaced by Supabase)
const MOCK_PATIENTS = [
  { id: 1, name: 'Luna', species: 'Perro', breed: 'Golden Retriever', owner: 'Carlos Rivera', lastVisit: '2023-10-12', status: 'Sano' },
  { id: 2, name: 'Milo', species: 'Gato', breed: 'Persa', owner: 'Ana Gómez', lastVisit: '2023-10-15', status: 'En tratamiento' },
  { id: 3, name: 'Max', species: 'Perro', breed: 'Bulldog', owner: 'Luis Pérez', lastVisit: '2023-10-18', status: 'Sano' },
  { id: 4, name: 'Bella', species: 'Perro', breed: 'Poodle', owner: 'Marta Díaz', lastVisit: '2023-10-20', status: 'Vacunación pendiente' },
];

export const AdminCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Return to Site
  const handleReturnToSite = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">VetCRM</h1>
            <p className="text-[10px] text-slate-500 font-medium">Panel Administrativo</p>
          </div>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'patients' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Users className="w-4 h-4" />
            Pacientes
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appointments' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Calendar className="w-4 h-4" />
            Citas
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <FileText className="w-4 h-4" />
            Historial Clínico
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Settings className="w-4 h-4" />
            Configuración
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleReturnToSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Volver a la Web
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar paciente, propietario, teléfono..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 pl-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
               <img src="https://i.pravatar.cc/150?img=32" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Page Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {activeTab === 'patients' && 'Gestión de Pacientes'}
                  {activeTab === 'appointments' && 'Agenda de Citas'}
                  {activeTab === 'history' && 'Historial Clínico'}
                  {activeTab === 'settings' && 'Configuración de Supabase'}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Administra la información de la clínica de forma segura.
                </p>
              </div>

              {activeTab === 'patients' && (
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Plus className="w-4 h-4" />
                  Nuevo Paciente
                </button>
              )}
            </div>

            {/* Content Cards */}
            {activeTab === 'patients' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                      <tr>
                        <th className="px-6 py-3">Paciente</th>
                        <th className="px-6 py-3">Especie / Raza</th>
                        <th className="px-6 py-3">Propietario</th>
                        <th className="px-6 py-3">Última Visita</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {MOCK_PATIENTS.map((patient) => (
                        <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{patient.name}</td>
                          <td className="px-6 py-4">
                            <span className="block text-slate-800">{patient.species}</span>
                            <span className="text-xs text-slate-500">{patient.breed}</span>
                          </td>
                          <td className="px-6 py-4">{patient.owner}</td>
                          <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              patient.status === 'Sano' ? 'bg-emerald-100 text-emerald-800' :
                              patient.status === 'En tratamiento' ? 'bg-amber-100 text-amber-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-emerald-600 transition-colors p-1">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {MOCK_PATIENTS.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    No se encontraron pacientes.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-2xl">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Integración con Supabase
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  El sistema está preparado para conectarse a tu base de datos de Supabase. Para activarlo, configura las variables de entorno en tu proyecto de Vercel/GitHub.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">VITE_SUPABASE_URL</label>
                    <input type="text" readOnly value="https://[PROJECT_ID].supabase.co" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">VITE_SUPABASE_ANON_KEY</label>
                    <input type="text" readOnly value="eyJh..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 font-mono" />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    * El cliente de Supabase ya está configurado en <code>/src/lib/supabase.ts</code>. Una vez agregues tus credenciales, podrás reemplazar la data mockeada de este panel.
                  </p>
                </div>
              </div>
            )}

            {(activeTab === 'appointments' || activeTab === 'history') && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'appointments' ? <Calendar className="w-8 h-8 text-slate-400" /> : <FileText className="w-8 h-8 text-slate-400" />}
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Módulo en Desarrollo</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Este módulo estará activo una vez que conectes tu base de datos de Supabase para guardar la información real.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
};
