import React, { useState } from 'react';
import { 
  Users, Calendar, Activity, LogOut, Search, Plus, FileText, 
  ChevronRight, CheckCircle2, Clock, AlertTriangle, 
  MessageSquare, Phone, Filter, ShieldCheck, Database, RefreshCw, Send,
  HeartPulse, Stethoscope, Syringe, Check, ExternalLink, Sun, Moon,
  LayoutGrid, List, MoveRight, ArrowRight, X, Sparkles, UserCheck, Clipboard, Menu
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/veterinaryData';
import { supabase } from '../../lib/supabase';

// Patient Interface with Medical History
interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  weightKg?: number;
  nextCheckup?: string;
}

interface Patient {
  id: number;
  name: string;
  species: 'Perro' | 'Gato' | 'Otro';
  breed: string;
  age: string;
  weight: string;
  owner: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: 'Sano' | 'En tratamiento' | 'Vacunación pendiente' | 'Control pendiente';
  avatar: string;
  allergies?: string;
  vaccinesUpToDate: boolean;
  history: MedicalRecord[];
}

interface Appointment {
  id: number;
  petName: string;
  species: string;
  owner: string;
  phone: string;
  service: string;
  time: string;
  date: string;
  status: 'pendiente' | 'consulta' | 'tratamiento' | 'completada';
  doctor: string;
  notes?: string;
  avatar: string;
}

// Initial Mock Data with rich medical histories
const INITIAL_PATIENTS: Patient[] = [
  { 
    id: 1, 
    name: 'Luna', 
    species: 'Perro', 
    breed: 'Golden Retriever', 
    age: '3 años',
    weight: '28.5 kg',
    owner: 'Carlos Rivera', 
    phone: '+57 300 123 4567', 
    email: 'carlos.rivera@gmail.com',
    lastVisit: '2023-10-12', 
    status: 'Sano', 
    avatar: '🐕',
    allergies: 'Ninguna conocida',
    vaccinesUpToDate: true,
    history: [
      {
        id: 'h1',
        date: '2023-10-12',
        doctor: 'Dra. María Elena',
        reason: 'Chequeo anual y desparasitación',
        diagnosis: 'Paciente normopeso, mucosas rosadas, excelente estado general.',
        treatment: 'Aplica Simparica Trio 20-40kg. Próxima vacuna en 12 meses.',
        weightKg: 28.5,
        nextCheckup: '2024-10-12'
      },
      {
        id: 'h0',
        date: '2022-10-10',
        doctor: 'Dr. Alejandro',
        reason: 'Vacunación Séxtuple y Rabia',
        diagnosis: 'Examen físico sin alteraciones. Refuerzos aplicados.',
        treatment: 'Vacuna Nobivac DHPPi + Rabia.',
        weightKg: 26.0
      }
    ]
  },
  { 
    id: 2, 
    name: 'Milo', 
    species: 'Gato', 
    breed: 'Persa', 
    age: '2 años',
    weight: '4.2 kg',
    owner: 'Ana Gómez', 
    phone: '+57 311 987 6543', 
    email: 'ana.gomez@hotmail.com',
    lastVisit: '2023-10-15', 
    status: 'En tratamiento', 
    avatar: '🐈',
    allergies: 'Sensibilidad a granos',
    vaccinesUpToDate: true,
    history: [
      {
        id: 'h2',
        date: '2023-10-15',
        doctor: 'Dr. Alejandro',
        reason: 'Gingivitis leve y dermatitis felina',
        diagnosis: 'Eritema lingual moderado. Probables pulgas o alergia alimentaria.',
        treatment: 'Antiséptico bucal GelPet + alimento hipoalergénico Royal Canin Sensitivity.',
        weightKg: 4.2,
        nextCheckup: '2023-11-01'
      }
    ]
  },
  { 
    id: 3, 
    name: 'Max', 
    species: 'Perro', 
    breed: 'Bulldog Francés', 
    age: '4 años',
    weight: '12.8 kg',
    owner: 'Luis Pérez', 
    phone: '+57 315 456 7890', 
    email: 'luis.perez@yahoo.com',
    lastVisit: '2023-10-18', 
    status: 'Sano', 
    avatar: '🐶',
    allergies: 'Polen y humedad',
    vaccinesUpToDate: true,
    history: [
      {
        id: 'h3',
        date: '2023-10-18',
        doctor: 'Dra. María Elena',
        reason: 'Limpieza de oídos y uñas',
        diagnosis: 'Conducto auditivo limpio. Otitis descartada.',
        treatment: 'Limpiador auricular EpiOtic 2 veces por semana.',
        weightKg: 12.8
      }
    ]
  },
  { 
    id: 4, 
    name: 'Bella', 
    species: 'Perro', 
    breed: 'Poodle Toy', 
    age: '1 año',
    weight: '3.5 kg',
    owner: 'Marta Díaz', 
    phone: '+57 302 234 5678', 
    email: 'marta.diaz@outlook.com',
    lastVisit: '2023-10-20', 
    status: 'Vacunación pendiente', 
    avatar: '🐩',
    allergies: 'Ninguna',
    vaccinesUpToDate: false,
    history: [
      {
        id: 'h4',
        date: '2023-10-20',
        doctor: 'Dr. Alejandro',
        reason: 'Primera valoración Cachorro/Joven',
        diagnosis: 'Paciente saludable. Pendiente esquema de Rabia.',
        treatment: 'Agendada cita de vacunación para la próxima semana.',
        weightKg: 3.5,
        nextCheckup: '2023-11-05'
      }
    ]
  },
  { 
    id: 5, 
    name: 'Thor', 
    species: 'Gato', 
    breed: 'Siamés', 
    age: '5 años',
    weight: '5.1 kg',
    owner: 'Jorge Blanco', 
    phone: '+57 320 876 5432', 
    email: 'jorge.blanco@gmail.com',
    lastVisit: '2023-10-22', 
    status: 'Control pendiente', 
    avatar: '🐱',
    allergies: 'Ninguna',
    vaccinesUpToDate: true,
    history: [
      {
        id: 'h5',
        date: '2023-10-22',
        doctor: 'Dra. María Elena',
        reason: 'Ecografía renal de control',
        diagnosis: 'Riñones de ecogenicidad normal. Sin presencia de cálculos.',
        treatment: 'Mantener hidratación constante y alimento húmedo.',
        weightKg: 5.1
      }
    ]
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 101, petName: 'Luna', species: 'Perro', owner: 'Carlos Rivera', phone: '+57 300 123 4567', service: 'Consulta General', time: '09:00 AM', date: 'Hoy', status: 'completada', doctor: 'Dra. María Elena', notes: 'Revisión periódica OK.', avatar: '🐕' },
  { id: 102, petName: 'Milo', species: 'Gato', owner: 'Ana Gómez', phone: '+57 311 987 6543', service: 'Vacunación Rabia', time: '10:30 AM', date: 'Hoy', status: 'tratamiento', doctor: 'Dr. Alejandro', notes: 'Aplicación de vacunas y desparasitación.', avatar: '🐈' },
  { id: 103, petName: 'Thor', species: 'Gato', owner: 'Jorge Blanco', phone: '+57 320 876 5432', service: 'Ecografía de control', time: '02:00 PM', date: 'Hoy', status: 'consulta', doctor: 'Dra. María Elena', notes: 'En sala de ecografía.', avatar: '🐱' },
  { id: 104, petName: 'Bella', species: 'Perro', owner: 'Marta Díaz', phone: '+57 302 234 5678', service: 'Profilaxis Dental', time: '04:15 PM', date: 'Hoy', status: 'pendiente', doctor: 'Dr. Alejandro', notes: 'Llegada programada.', avatar: '🐩' },
  { id: 105, petName: 'Max', species: 'Perro', owner: 'Luis Pérez', phone: '+57 315 456 7890', service: 'Control Dermatólogo', time: '05:30 PM', date: 'Hoy', status: 'pendiente', doctor: 'Dra. María Elena', notes: 'Segunda valoración.', avatar: '🐶' }
];

interface AdminCRMProps {
  onLogout: () => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'kanban' | 'patients' | 'appointments_list' | 'integrations'>('kanban');
  const [appointmentViewMode, setAppointmentViewMode] = useState<'kanban' | 'list'>('kanban');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendiente' | 'consulta' | 'tratamiento' | 'completada'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('todos');
  
  const [patientsList, setPatientsList] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  
  // Selected Patient for Medical History Drawer / Modal
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // New Medical Consultation Entry Form inside Modal
  const [isAddingHistoryNote, setIsAddingHistoryNote] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    reason: '',
    diagnosis: '',
    treatment: '',
    doctor: 'Dra. María Elena',
    weightKg: '',
    nextCheckup: ''
  });

  // Modal to Register New Patient
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    species: 'Perro' as 'Perro' | 'Gato' | 'Otro',
    breed: '',
    age: '2 años',
    weight: '10 kg',
    owner: '',
    phone: '',
    email: '',
    allergies: ''
  });

  // Toast notifications
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

  // Move appointment column in Kanban
  const moveAppointmentStatus = (appointmentId: number, newStatus: Appointment['status']) => {
    setAppointmentsList(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, status: newStatus };
      }
      return apt;
    }));
    showAdminToast(`Cita actualizada a estado "${newStatus.toUpperCase()}"`);
  };

  // Submit New Medical Consultation to Patient History
  const handleAddConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newConsultation.reason || !newConsultation.diagnosis) return;

    const newRecord: MedicalRecord = {
      id: `h_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      doctor: newConsultation.doctor,
      reason: newConsultation.reason,
      diagnosis: newConsultation.diagnosis,
      treatment: newConsultation.treatment || 'Sin prescripción específica.',
      weightKg: newConsultation.weightKg ? parseFloat(newConsultation.weightKg) : undefined,
      nextCheckup: newConsultation.nextCheckup || undefined
    };

    const updatedPatient: Patient = {
      ...selectedPatient,
      lastVisit: newRecord.date,
      weight: newRecord.weightKg ? `${newRecord.weightKg} kg` : selectedPatient.weight,
      history: [newRecord, ...selectedPatient.history]
    };

    setPatientsList(prev => prev.map(p => p.id === selectedPatient.id ? updatedPatient : p));
    setSelectedPatient(updatedPatient);
    setIsAddingHistoryNote(false);
    setNewConsultation({ reason: '', diagnosis: '', treatment: '', doctor: 'Dra. María Elena', weightKg: '', nextCheckup: '' });
    showAdminToast(`¡Nueva historia clínica registrada para ${selectedPatient.name}!`);
  };

  // Register New Patient Submit
  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.owner) return;

    const created: Patient = {
      id: Date.now(),
      name: newPatient.name,
      species: newPatient.species,
      breed: newPatient.breed || 'Mestizo',
      age: newPatient.age || '1 año',
      weight: newPatient.weight || '5 kg',
      owner: newPatient.owner,
      phone: newPatient.phone || '+57 300 000 0000',
      email: newPatient.email || 'cliente@vetamor.com',
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Sano',
      avatar: newPatient.species === 'Perro' ? '🐶' : newPatient.species === 'Gato' ? '🐱' : '🐰',
      allergies: newPatient.allergies || 'Sin registrar',
      vaccinesUpToDate: true,
      history: [
        {
          id: `h_init_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          doctor: 'Dra. María Elena',
          reason: 'Apertura de Historia Clínica',
          diagnosis: 'Paciente ingresa por primera vez a la clínica VetAmor. Estado fisiológico normal.',
          treatment: 'Apertura de ficha médica.',
          weightKg: parseFloat(newPatient.weight) || 5
        }
      ]
    };

    setPatientsList([created, ...patientsList]);
    setIsAddPatientOpen(false);
    setNewPatient({ name: '', species: 'Perro', breed: '', age: '2 años', weight: '10 kg', owner: '', phone: '', email: '', allergies: '' });
    showAdminToast(`¡Paciente ${created.name} creado correctamente con Historia Clínica!`);
  };

  // Filter Patients
  const filteredPatients = patientsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'todos' || p.species.toLowerCase() === selectedSpecies.toLowerCase();
    return matchesSearch && matchesSpecies;
  });

  // Kanban Columns Definition
  const KANBAN_COLUMNS = [
    { id: 'pendiente', label: '📌 Por Atender', bg: 'border-slate-800', headerBg: 'bg-slate-800/40 text-slate-300' },
    { id: 'consulta', label: '🩺 En Consulta / Triaje', bg: 'border-sky-800', headerBg: 'bg-sky-950/60 text-sky-300 border-sky-800' },
    { id: 'tratamiento', label: '💉 En Procedimiento / Lab', bg: 'border-amber-800', headerBg: 'bg-amber-950/60 text-amber-300 border-amber-800' },
    { id: 'completada', label: '✅ Consulta Finalizada', bg: 'border-emerald-800', headerBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800' },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-800 selection:bg-emerald-400 selection:text-slate-900'
    }`}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-400 text-slate-950 font-extrabold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-200">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile/Tablet Backdrop Overlay when Sidebar is expanded */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-72 shadow-2xl' : 'hidden lg:flex'} 
        lg:relative lg:w-64 border-r flex-shrink-0 flex flex-col justify-between transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800/80' 
            : 'bg-white border-slate-200'
        }
      `}>
        <div>
          {/* Brand Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950">
                <HeartPulse className="w-6 h-6 text-slate-950 font-bold" />
              </div>
              <div>
                <h1 className={`font-black text-base leading-tight tracking-wide ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>VetAmor CRM</h1>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Flujo Kanban & Historias</p>
              </div>
            </div>

            {/* Close Sidebar button on mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <button 
              onClick={() => {
                setActiveTab('kanban');
                setAppointmentViewMode('kanban');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'kanban' && appointmentViewMode === 'kanban'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Tablero Kanban Citas
            </button>

            <button 
              onClick={() => {
                setActiveTab('patients');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'patients' 
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Pacientes & Historias ({patientsList.length})
            </button>

            <button 
              onClick={() => {
                setActiveTab('kanban');
                setAppointmentViewMode('list');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'kanban' && appointmentViewMode === 'list'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <List className="w-4 h-4" />
              Vista Lista (Tablet/Móvil)
            </button>

            <button 
              onClick={() => {
                setActiveTab('integrations');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'integrations' 
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
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
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Sitio Web Público
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-500 hover:bg-rose-950/40 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Bar */}
        <header className={`border-b h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800/80' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-md">
            {/* Sidebar Toggle Button for Tablets / Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Menú Secciones CRM"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline text-xs font-extrabold">Secciones</span>
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar paciente o dueño..." 
                className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
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
                  ? 'bg-slate-950 border-slate-800 text-amber-300 hover:bg-slate-800' 
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

            <button 
              onClick={() => setIsAddPatientOpen(true)}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Mascota</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-6">
          
          {/* VIEW 1: INTERACTIVE KANBAN BOARD & LIST VIEW */}
          {activeTab === 'kanban' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h2 className={`text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <span>Gestión de Citas y Atención Médica</span>
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {appointmentViewMode === 'kanban' 
                      ? 'Vista Kanban en columnas para flujo continuo de atención.' 
                      : 'Vista Lista optimizada para consulta rápida en Tablets y Smartphones.'}
                  </p>
                </div>

                {/* View Mode Toggle Switcher */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`p-1 rounded-2xl border flex items-center gap-1 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/80 border-slate-300'
                  }`}>
                    <button
                      onClick={() => setAppointmentViewMode('kanban')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        appointmentViewMode === 'kanban'
                          ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                          : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span>Vista Kanban</span>
                    </button>
                    <button
                      onClick={() => setAppointmentViewMode('list')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        appointmentViewMode === 'list'
                          ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                          : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span>Vista Lista (Tablet)</span>
                    </button>
                  </div>

                  <div className={`text-xs px-3 py-1.5 rounded-full border hidden sm:flex items-center gap-2 ${
                    isDarkMode ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Sincronizado n8n
                  </div>
                </div>
              </div>

              {/* MODE A: KANBAN GRID COLUMNS */}
              {appointmentViewMode === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                  {KANBAN_COLUMNS.map((column) => {
                    const columnAppointments = appointmentsList.filter(
                      apt => apt.status === column.id && 
                      (apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       apt.owner.toLowerCase().includes(searchTerm.toLowerCase()))
                    );

                    return (
                      <div 
                        key={column.id} 
                        className={`rounded-2xl border p-3 min-h-[500px] flex flex-col transition-colors ${
                          isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-100/80 border-slate-200'
                        }`}
                      >
                        {/* Column Header */}
                        <div className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between mb-3 ${column.headerBg}`}>
                          <span>{column.label}</span>
                          <span className="w-5 h-5 rounded-full bg-slate-950/30 flex items-center justify-center text-[10px]">
                            {columnAppointments.length}
                          </span>
                        </div>

                        {/* Column Cards */}
                        <div className="space-y-3 flex-1 overflow-y-auto">
                          {columnAppointments.map((apt) => {
                            const patientData = patientsList.find(p => p.name.toLowerCase() === apt.petName.toLowerCase());

                            return (
                              <div 
                                key={apt.id}
                                className={`p-3.5 rounded-xl border shadow-sm space-y-3 transition-all hover:scale-[1.01] ${
                                  isDarkMode 
                                    ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-100' 
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                                }`}
                              >
                                {/* Card Top: Pet Info & Time */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">{apt.avatar}</span>
                                    <div>
                                      <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                                        <span>{apt.petName}</span>
                                        <span className="text-[10px] text-emerald-500 font-normal">({apt.species})</span>
                                      </h4>
                                      <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Dueño: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{apt.owner}</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                                  }`}>
                                    {apt.time}
                                  </span>
                                </div>

                                {/* Service & Notes */}
                                <div className={`p-2 rounded-lg border text-xs space-y-1 ${
                                  isDarkMode ? 'bg-slate-900/80 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                                }`}>
                                  <p className="font-bold text-emerald-600 dark:text-emerald-400">🩺 {apt.service}</p>
                                  <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Médico: {apt.doctor}
                                  </p>
                                </div>

                                {/* Actions Bar inside Card */}
                                <div className="pt-1 flex items-center justify-between gap-1 text-[11px]">
                                  {patientData ? (
                                    <button
                                      onClick={() => setSelectedPatient(patientData)}
                                      className="text-emerald-500 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Clipboard className="w-3.5 h-3.5" />
                                      Ver Historia
                                    </button>
                                  ) : (
                                    <span className="text-slate-500 text-[10px]">Sin Ficha</span>
                                  )}

                                  {/* WhatsApp Button */}
                                  <a
                                    href={`https://wa.me/${apt.phone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hola ${apt.owner}, te escribimos de VetAmor sobre el estado de la consulta de ${apt.petName}.`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 p-1 rounded hover:bg-emerald-950/40 cursor-pointer"
                                    title="Escribir por WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                </div>

                                {/* Move Status Dropdown / Quick Buttons */}
                                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Mover a:</span>
                                  <div className="flex items-center gap-1">
                                    {column.id !== 'pendiente' && (
                                      <button
                                        onClick={() => moveAppointmentStatus(apt.id, 'pendiente')}
                                        className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] cursor-pointer"
                                        title="Mover a Por Atender"
                                      >
                                        📌
                                      </button>
                                    )}
                                    {column.id !== 'consulta' && (
                                      <button
                                        onClick={() => moveAppointmentStatus(apt.id, 'consulta')}
                                        className="px-1.5 py-0.5 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 text-[10px] cursor-pointer"
                                        title="Mover a En Consulta"
                                      >
                                        🩺
                                      </button>
                                    )}
                                    {column.id !== 'tratamiento' && (
                                      <button
                                        onClick={() => moveAppointmentStatus(apt.id, 'tratamiento')}
                                        className="px-1.5 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-[10px] cursor-pointer"
                                        title="Mover a Procedimiento"
                                      >
                                        💉
                                      </button>
                                    )}
                                    {column.id !== 'completada' && (
                                      <button
                                        onClick={() => moveAppointmentStatus(apt.id, 'completada')}
                                        className="px-1.5 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-[10px] cursor-pointer"
                                        title="Mover a Completada"
                                      >
                                        ✅
                                      </button>
                                    )}
                                  </div>
                                </div>

                              </div>
                            );
                          })}

                          {columnAppointments.length === 0 && (
                            <div className={`p-6 text-center border border-dashed rounded-xl ${
                              isDarkMode ? 'border-slate-800 text-slate-600' : 'border-slate-300 text-slate-400'
                            }`}>
                              <p className="text-xs">Sin pacientes en esta fase</p>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* MODE B: TABLET & MOBILE OPTIMIZED LIST VIEW */
                <div className="space-y-4">
                  {/* Status Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { id: 'todos', label: 'Todas las Citas', icon: '📋' },
                      { id: 'pendiente', label: '📌 Por Atender', icon: '' },
                      { id: 'consulta', label: '🩺 En Consulta', icon: '' },
                      { id: 'tratamiento', label: '💉 En Procedimiento', icon: '' },
                      { id: 'completada', label: '✅ Finalizadas', icon: '' },
                    ].map((tab) => {
                      const count = tab.id === 'todos' 
                        ? appointmentsList.length 
                        : appointmentsList.filter(a => a.status === tab.id).length;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setStatusFilter(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                            statusFilter === tab.id
                              ? 'bg-emerald-400 text-slate-950 shadow-sm'
                              : isDarkMode
                                ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                            statusFilter === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800/20'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tablet & Mobile Grid Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointmentsList
                      .filter(apt => {
                        const matchesSearch = apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                              apt.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                              apt.service.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === 'todos' || apt.status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((apt) => {
                        const patientData = patientsList.find(p => p.name.toLowerCase() === apt.petName.toLowerCase());

                        return (
                          <div
                            key={apt.id}
                            className={`p-4 rounded-2xl border shadow-sm space-y-3 transition-all ${
                              isDarkMode 
                                ? 'bg-slate-900/90 border-slate-800 text-slate-100 hover:border-slate-700' 
                                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                            }`}
                          >
                            {/* Card Top */}
                            <div className="flex items-center justify-between gap-2 border-b pb-3 border-slate-800/40">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">{apt.avatar}</span>
                                <div>
                                  <h3 className="font-black text-base flex items-center gap-1.5">
                                    <span>{apt.petName}</span>
                                    <span className="text-xs text-emerald-500 font-normal">({apt.species})</span>
                                  </h3>
                                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Propietario: <strong>{apt.owner}</strong>
                                  </p>
                                </div>
                              </div>
                              <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-xl">
                                {apt.time}
                              </span>
                            </div>

                            {/* Service Details */}
                            <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                              isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-emerald-400">🩺 {apt.service}</span>
                                <span className="text-[11px] text-slate-400">{apt.doctor}</span>
                              </div>
                              {apt.notes && (
                                <p className={`text-[11px] italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  "{apt.notes}"
                                </p>
                              )}
                            </div>

                            {/* Status Change Selector for Tablet */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estado de la Cita:</label>
                              <div className="grid grid-cols-2 gap-1.5">
                                {[
                                  { id: 'pendiente', label: '📌 Por Atender', color: 'bg-slate-800 text-slate-200 border-slate-700' },
                                  { id: 'consulta', label: '🩺 En Consulta', color: 'bg-sky-950 text-sky-300 border-sky-800' },
                                  { id: 'tratamiento', label: '💉 Procedimiento', color: 'bg-amber-950 text-amber-300 border-amber-800' },
                                  { id: 'completada', label: '✅ Finalizada', color: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
                                ].map((st) => (
                                  <button
                                    key={st.id}
                                    onClick={() => moveAppointmentStatus(apt.id, st.id as any)}
                                    className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                                      apt.status === st.id
                                        ? `${st.color} ring-2 ring-emerald-400 shadow-xs font-black`
                                        : isDarkMode 
                                          ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white' 
                                          : 'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                  >
                                    {st.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs">
                              {patientData ? (
                                <button
                                  onClick={() => setSelectedPatient(patientData)}
                                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/60 cursor-pointer"
                                >
                                  <Clipboard className="w-3.5 h-3.5" />
                                  <span>Ver Historia Clínica</span>
                                </button>
                              ) : (
                                <span className="text-slate-500 text-xs">Sin Ficha</span>
                              )}

                              <a
                                href={`https://wa.me/${apt.phone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hola ${apt.owner}, te escribimos de VetAmor sobre el estado de la consulta de ${apt.petName}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            </div>

                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW 2: PACIENTES & HISTORIALES CLÍNICOS */}
          {activeTab === 'patients' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Directorio de Pacientes & Historias Clínicas</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Haz clic en cualquier mascota para abrir su expediente veterinario completo.</p>
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
                          ? 'bg-emerald-400 text-slate-950 shadow-xs' 
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

              {/* Patients Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-emerald-500 group relative overflow-hidden ${
                      isDarkMode ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-900' : 'bg-white border-slate-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">{patient.avatar}</span>
                        <div>
                          <h3 className={`font-black text-base group-hover:text-emerald-400 transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {patient.name}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{patient.species} • {patient.breed}</p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        patient.status === 'Sano' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        patient.status === 'En tratamiento' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {patient.status}
                      </span>
                    </div>

                    <div className={`mt-4 pt-3 border-t text-xs space-y-1.5 ${
                      isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
                    }`}>
                      <p className="flex justify-between">
                        <span className="text-slate-500">Propietario:</span>
                        <strong className="font-semibold">{patient.owner}</strong>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-500">Edad / Peso:</span>
                        <span>{patient.age} / {patient.weight}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-500">Atenciones Registradas:</span>
                        <strong className="text-emerald-400">{patient.history.length} consultas</strong>
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-500 pt-1">
                      <span>Ver Expediente Médico completos &rarr;</span>
                      <Clipboard className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: AGENDA LIST VIEW */}
          {activeTab === 'appointments_list' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Lista de Agenda del Día</h2>

              <div className={`rounded-2xl border overflow-hidden ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className={`border-b font-semibold ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <tr>
                        <th className="px-5 py-3">Hora</th>
                        <th className="px-5 py-3">Mascota</th>
                        <th className="px-5 py-3">Propietario</th>
                        <th className="px-5 py-3">Servicio</th>
                        <th className="px-5 py-3">Médico</th>
                        <th className="px-5 py-3">Estado</th>
                        <th className="px-5 py-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'
                    }`}>
                      {appointmentsList.map((apt) => (
                        <tr key={apt.id} className={isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                          <td className="px-5 py-3.5 font-mono font-bold text-emerald-400">{apt.time}</td>
                          <td className="px-5 py-3.5 font-bold text-white flex items-center gap-2">
                            <span>{apt.avatar}</span>
                            <span>{apt.petName}</span>
                          </td>
                          <td className="px-5 py-3.5">{apt.owner}</td>
                          <td className="px-5 py-3.5 text-emerald-400 font-semibold">{apt.service}</td>
                          <td className="px-5 py-3.5">{apt.doctor}</td>
                          <td className="px-5 py-3.5 capitalize font-bold">{apt.status}</td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => moveAppointmentStatus(apt.id, 'completada')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/30 cursor-pointer"
                            >
                              Finalizar
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

          {/* VIEW 4: N8N INTEGRATION */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Integración n8n & Evolution API</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Conexión activa para la automatización de WhatsApp y almacenamiento en Supabase.</p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="font-bold text-sm text-emerald-400">Webhook de Notificación</h3>
                <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800">
                  https://n8n.vetamor.com/webhook/whatsapp-otp-notifications
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* DETAILED PATIENT MEDICAL HISTORY MODAL */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 relative ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Close Button */}
            <button 
              onClick={() => { setSelectedPatient(null); setIsAddingHistoryNote(false); }}
              className={`absolute top-5 right-5 p-2 rounded-full cursor-pointer transition-colors ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Pet Medical File Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
                  {selectedPatient.avatar}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black">{selectedPatient.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {selectedPatient.species}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Raza: <strong>{selectedPatient.breed}</strong> • Edad: <strong>{selectedPatient.age}</strong> • Peso actual: <strong>{selectedPatient.weight}</strong>
                </p>
                <p className="text-xs text-emerald-500 mt-1">
                  Propietario: <strong>{selectedPatient.owner}</strong> ({selectedPatient.phone})
                </p>
              </div>
            </div>

            {/* Quick Health Tags */}
            <div className={`p-3 rounded-2xl border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="text-slate-500 text-[11px] block">Alergias:</span>
                <span className="font-semibold text-rose-400">{selectedPatient.allergies || 'Ninguna'}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Vacunas al día:</span>
                <span className="font-semibold text-emerald-400">
                  {selectedPatient.vaccinesUpToDate ? 'Sí ✓' : 'Pendiente ⚠️'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Última Atención:</span>
                <span className="font-semibold">{selectedPatient.lastVisit}</span>
              </div>
            </div>

            {/* Add New Medical Consultation Entry Button */}
            {!isAddingHistoryNote ? (
              <div className="flex justify-between items-center pt-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Clipboard className="w-5 h-5 text-emerald-400" />
                  Historial de Evolución Médica
                </h3>
                <button
                  onClick={() => setIsAddingHistoryNote(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Consulta / Evolución
                </button>
              </div>
            ) : (
              /* FORM TO ADD NEW MEDICAL RECORD */
              <form onSubmit={handleAddConsultationSubmit} className={`p-4 rounded-2xl border space-y-3 animate-in fade-in ${
                isDarkMode ? 'bg-slate-950 border-emerald-800/80' : 'bg-emerald-50/50 border-emerald-200'
              }`}>
                <h4 className="font-bold text-sm text-emerald-400 flex items-center justify-between">
                  <span>Registrar Nueva Atención Médica</span>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingHistoryNote(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold mb-1">Motivo de Consulta</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej: Vacunación, Alergia bucal..." 
                      value={newConsultation.reason}
                      onChange={(e) => setNewConsultation({ ...newConsultation, reason: e.target.value })}
                      className={`w-full p-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold mb-1">Peso Registrado (kg)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="Ej: 28.5" 
                      value={newConsultation.weightKg}
                      onChange={(e) => setNewConsultation({ ...newConsultation, weightKg: e.target.value })}
                      className={`w-full p-2 rounded-xl border text-xs outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1">Diagnóstico Veterinario</label>
                  <textarea 
                    required
                    rows={2}
                    placeholder="Escribe el diagnóstico clínico detallado..." 
                    value={newConsultation.diagnosis}
                    onChange={(e) => setNewConsultation({ ...newConsultation, diagnosis: e.target.value })}
                    className={`w-full p-2 rounded-xl border text-xs outline-none ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1">Tratamiento & Prescripción</label>
                  <textarea 
                    rows={2}
                    placeholder="Medicamentos, dosis y recomendaciones..." 
                    value={newConsultation.treatment}
                    onChange={(e) => setNewConsultation({ ...newConsultation, treatment: e.target.value })}
                    className={`w-full p-2 rounded-xl border text-xs outline-none ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs hover:bg-emerald-300 cursor-pointer shadow-md"
                >
                  Guardar en Historia Clínica
                </button>
              </form>
            )}

            {/* Medical Records Timeline */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {selectedPatient.history.map((record) => (
                <div key={record.id} className="relative pl-8 space-y-1">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-emerald-400 border-4 border-slate-900"></div>

                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-400">{record.reason}</span>
                      <span className="text-slate-400">{record.date}</span>
                    </div>

                    <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <strong>Diagnóstico:</strong> {record.diagnosis}
                    </p>

                    <div className={`p-2.5 rounded-xl text-xs font-mono ${
                      isDarkMode ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-800 border border-slate-200'
                    }`}>
                      <span className="text-emerald-500 font-bold">Tratamiento/Receta: </span>
                      {record.treatment}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Atendido por: {record.doctor}</span>
                      {record.weightKg && <span>Peso: {record.weightKg} kg</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* MODAL: NEW PATIENT REGISTRATION */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-extrabold flex items-center justify-between">
              <span>Registrar Nueva Mascota</span>
              <button onClick={() => setIsAddPatientOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </h3>

            <form onSubmit={handleAddPatientSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre de la Mascota</label>
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
                  <label className="block text-xs font-semibold mb-1">Especie</label>
                  <select 
                    value={newPatient.species}
                    onChange={(e) => setNewPatient({ ...newPatient, species: e.target.value as any })}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Perro">Perro 🐶</option>
                    <option value="Gato">Gato 🐱</option>
                    <option value="Otro">Otro 🐰</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Raza</label>
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
                <label className="block text-xs font-semibold mb-1">Propietario / Dueño</label>
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
                <label className="block text-xs font-semibold mb-1">WhatsApp / Teléfono</label>
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
                  className="w-1/2 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs hover:bg-emerald-300 cursor-pointer shadow-md"
                >
                  Crear Ficha Médica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
