import React, { useState } from 'react';
import { BRANCH_LOCATION, CLINIC_INFO } from '../data/veterinaryData';
import { MapPin, Navigation, Clock, Car, Bus, ShieldAlert, ShieldCheck, ExternalLink } from 'lucide-react';

export const InteractiveMapSection: React.FC = () => {
  const [selectedMapLayer, setSelectedMapLayer] = useState<'standard' | 'parking' | 'emergency'>('standard');

  return (
    <section id="ubicacion" className="py-16 lg:py-24 bg-[#FDFBF7] relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Ubicación Central
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Ven a visitarnos con total comodidad
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Ubicados estratégicamente con estacionamiento privado gratuito y acceso directo para urgencias 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Clinic Details Sidebar */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Sede San Borja — Abierto
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {BRANCH_LOCATION.name}
              </h3>

              <p className="text-sm text-gray-600 font-medium mb-4 flex items-start gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{BRANCH_LOCATION.address}</span>
              </p>

              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-6">
                <strong>Referencia:</strong> {CLINIC_INFO.reference}
              </p>

              {/* Hours Box */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Horarios de Atención
                </h4>
                <div className="text-xs space-y-1.5 text-gray-600">
                  <p className="flex justify-between">
                    <span>Lunes a Sábado:</span>
                    <strong className="text-gray-900">8:00 AM – 9:00 PM</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos y Feriados:</span>
                    <strong className="text-gray-900">9:00 AM – 6:00 PM</strong>
                  </p>
                  <p className="flex justify-between text-orange-600 font-bold bg-orange-50 p-2.5 rounded-lg border border-orange-100">
                    <span>Urgencias Médicas:</span>
                    <span>24 Horas / 365 días</span>
                  </p>
                </div>
              </div>

              {/* Accessibility Features */}
              <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>Estacionamiento privado gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <Bus className="w-4 h-4 text-emerald-600" />
                  <span>Cerca a transporte público</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Rampa de accesibilidad</span>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRANCH_LOCATION.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(BRANCH_LOCATION.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Navegar con Waze</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>

          </div>

          {/* Interactive Visual Map View Container */}
          <div className="lg:col-span-7 bg-emerald-900 rounded-3xl border border-emerald-800 shadow-xl overflow-hidden flex flex-col justify-between">
            
            {/* Map Filter Controls Bar */}
            <div className="bg-emerald-950 text-white p-4 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-emerald-800">
              <span className="font-bold flex items-center gap-1.5 text-emerald-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Ubicación Central
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMapLayer('standard')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    selectedMapLayer === 'standard' ? 'bg-emerald-600 text-white' : 'bg-emerald-800/60 text-emerald-200'
                  }`}
                >
                  Entrada Principal
                </button>
                <button
                  onClick={() => setSelectedMapLayer('parking')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    selectedMapLayer === 'parking' ? 'bg-emerald-600 text-white' : 'bg-emerald-800/60 text-emerald-200'
                  }`}
                >
                  Estacionamiento
                </button>
                <button
                  onClick={() => setSelectedMapLayer('emergency')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    selectedMapLayer === 'emergency' ? 'bg-orange-500 text-white' : 'bg-emerald-800/60 text-emerald-200'
                  }`}
                >
                  Urgencias
                </button>
              </div>
            </div>

            {/* Simulated Map Graphic Container */}
            <div className="relative h-[380px] lg:h-full bg-emerald-900 overflow-hidden flex items-center justify-center">
              
              {/* Stylized Map Grid Lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
              
              {/* Simulated Roads & Blocks */}
              <div className="absolute inset-x-0 h-16 bg-emerald-950/80 top-1/2 -translate-y-1/2 flex items-center justify-between px-8 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
                <span>Av. Libertad 452</span>
                <span>Av. Libertad 452</span>
              </div>

              {/* Main Clinic Pin Marker */}
              <div className="relative z-10 text-center animate-bounce">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center mx-auto shadow-2xl shadow-emerald-500/50 border-2 border-white cursor-pointer group">
                  <span className="text-xl font-bold font-serif">V</span>
                  <span className="text-[8px] font-bold uppercase tracking-tight">VetAmor</span>
                </div>
                <div className="mt-2 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-xl">
                  VetAmor — Central
                </div>
              </div>

              {/* Dynamic Overlay Info Box based on selected layer */}
              <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md text-white p-4 rounded-2xl border border-emerald-800 shadow-2xl">
                {selectedMapLayer === 'standard' && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-emerald-300 uppercase tracking-wider">Entrada Principal y Recepción</p>
                      <p className="text-emerald-100">Recepción amplia con salas de espera Fear-Free independientes.</p>
                    </div>
                  </div>
                )}

                {selectedMapLayer === 'parking' && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                      <Car className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-emerald-300 uppercase tracking-wider">Estacionamiento Privado Gratuito</p>
                      <p className="text-emerald-100">8 plazas de estacionamiento reservadas exclusivamente para clientes.</p>
                    </div>
                  </div>
                )}

                {selectedMapLayer === 'emergency' && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-orange-300 uppercase tracking-wider">Ingreso de Urgencias 24/7</p>
                      <p className="text-emerald-100">Acceso directo a la guardia médica con atención sin demoras.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

