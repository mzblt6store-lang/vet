import React, { useState } from 'react';
import { Phone, Clock, MapPin, Calendar, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/veterinaryData';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Banner - Urgencias & Horario */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              Urgencias 24/7
            </span>
            <a 
              href={`tel:${CLINIC_INFO.emergencyPhone}`} 
              className="hover:underline font-semibold flex items-center gap-1 text-emerald-100"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              {CLINIC_INFO.emergencyPhone}
            </a>
            <span className="hidden md:inline text-emerald-600">•</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-200">
              <Clock className="w-3 h-3 text-emerald-400" />
              Atención hoy: 8:00 AM - 9:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-emerald-200">
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {CLINIC_INFO.address}
            </span>
            <a 
              href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}?text=Hola,%20quisiera%20consultar%20sobre%20sus%20servicios%20para%20mi%20mascota`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1 rounded-full transition-colors flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-md shadow-emerald-200/50 group-hover:bg-emerald-700 transition-colors">
              <span className="text-white font-bold text-xl font-serif">V</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-emerald-900 tracking-tight">
                  VetAmor
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Fear-Free
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                Clínica Veterinaria & Cuidado Profesional
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#inicio" className="hover:text-emerald-600 transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-emerald-600 transition-colors">Nosotros</a>
            <a href="#calculadora" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
              <span>Calculadora</span>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Nuevo</span>
            </a>
            <a href="#testimonios" className="hover:text-emerald-600 transition-colors">Testimonios</a>
            <a href="#ubicacion" className="hover:text-emerald-600 transition-colors">Contacto</a>
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Agendar Cita por WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden bg-emerald-600 text-white text-[11px] font-bold px-3 py-2 rounded-full flex items-center gap-1 shadow-md shadow-emerald-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Cita WhatsApp</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600 border-b border-gray-100"
          >
            Inicio
          </a>
          <a
            href="#nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600 border-b border-gray-100"
          >
            Nosotros & Equipo
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600 border-b border-gray-100"
          >
            Calculadora de Salud
          </a>
          <a
            href="#testimonios"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600 border-b border-gray-100"
          >
            Testimonios
          </a>
          <a
            href="#ubicacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600 border-b border-gray-100"
          >
            Contacto & Ubicación
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-full shadow-lg shadow-emerald-200 text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-emerald-200" />
              <span>Agendar Cita por WhatsApp (Bot)</span>
            </button>
            <a
              href={`tel:${CLINIC_INFO.emergencyPhone}`}
              className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full text-center flex items-center justify-center gap-2 text-sm shadow-md shadow-orange-200"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar a Urgencias (24/7)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

