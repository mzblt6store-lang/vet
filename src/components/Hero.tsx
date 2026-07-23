import React, { useState } from 'react';
import { Calendar, ShieldCheck, Star, Heart, CheckCircle2, ChevronRight, PhoneCall, Clock } from 'lucide-react';
import { CLINIC_INFO, HERO_IMAGE } from '../data/veterinaryData';

interface HeroProps {
  onOpenBooking: (serviceId?: string, petSpecies?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [quickSpecies, setQuickSpecies] = useState<'perro' | 'gato' | 'otro'>('perro');
  const [quickService, setQuickService] = useState('consulta-general');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(quickService, quickSpecies);
  };

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-emerald-50/50 via-[#FDFBF7] to-white overflow-hidden py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Cuidado Profesional y Amoroso
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1]">
              Su bienestar es nuestra <span className="text-emerald-600 italic">misión.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-sans">
              En VetAmor combinamos tecnología médica avanzada con el cariño que tus mascotas merecen. Un hogar lejos de casa para tus mejores amigos.
            </p>

            {/* Benefits list */}
            <div className="grid sm:grid-cols-2 gap-2.5 py-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atención cálida Fear-Free</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Urgencias médicas 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Precios transparentes</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confirmación por WhatsApp</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-98 text-white px-8 py-4 rounded-xl text-base sm:text-lg font-bold shadow-xl shadow-orange-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Cita Rápida Online</span>
              </button>

              <a
                href="#calculadora"
                className="w-full sm:w-auto bg-white border-2 border-emerald-200 text-emerald-800 px-8 py-4 rounded-xl text-base sm:text-lg font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Calculadora de Salud</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 mt-2 pt-4 border-t border-gray-200/60">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Cliente"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                  alt="Cliente"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
                  alt="Cliente"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-600">
                <span className="text-gray-900 font-bold">+2,500</span> dueños felices confían en nosotros
              </p>
              <div className="hidden sm:flex items-center gap-1 text-amber-500 ml-auto">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                <span className="text-xs font-bold text-gray-900">{CLINIC_INFO.googleRating} ({CLINIC_INFO.googleReviewsCount})</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Column & Quick Booking Box */}
          <div className="lg:col-span-5 relative flex flex-col gap-6">
            
            {/* Main Image Container */}
            <div className="w-full h-[380px] sm:h-[420px] rounded-[40px] bg-emerald-200 overflow-hidden relative shadow-2xl border-4 border-white">
              <img
                src={HERO_IMAGE}
                alt="Doctora atendiendo perro feliz"
                className="w-full h-full object-cover object-center contrast-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Floating Emergency Pill */}
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md border border-white/80 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
                <span className="text-xs font-bold text-gray-900">Urgencias 24/7</span>
              </div>

              {/* Floating Testimonial Quote */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-5 rounded-2xl border border-white/50 shadow-lg">
                <p className="text-gray-900 italic font-serif text-base sm:text-lg leading-snug">
                  "El Dr. Martínez trató a mi perro como si fuera suyo. No iría a ningún otro lugar."
                </p>
                <p className="text-emerald-600 font-bold text-xs sm:text-sm mt-2 uppercase tracking-wide">
                  — Elena Rodríguez, dueña de 'Max'
                </p>
              </div>
            </div>

            {/* Quick Interactive Mini-Booking Box */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xl shadow-emerald-900/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-emerald-900 text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Agendar Cita en Línea
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Rápido
                </span>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Mascota</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickSpecies('perro')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        quickSpecies === 'perro'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🐶 Perro
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickSpecies('gato')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        quickSpecies === 'gato'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🐱 Gato
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickSpecies('otro')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        quickSpecies === 'otro'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🐾 Otro
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Servicio requerido</label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="consulta-general">Consulta Médica Preventiva</option>
                    <option value="vacunacion-integral">Vacunación o Desparasitación</option>
                    <option value="grooming-spa">Baño & Estética Spa</option>
                    <option value="profilaxis-dental">Profilaxis / Dental</option>
                    <option value="cirugia-soft">Cirugía / Esterilización</option>
                    <option value="urgencias-247">Urgencia Inmediata</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar Cita</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

