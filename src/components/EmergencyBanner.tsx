import React from 'react';
import { ShieldAlert, Phone, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/veterinaryData';

export const EmergencyBanner: React.FC = () => {
  return (
    <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-y-4 border-orange-500 relative overflow-hidden shadow-2xl">
      {/* Background Pulse Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        <div className="space-y-2 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>Servicio Hospitalario de Urgencias 24/7</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            ¿Tu mascota tiene una urgencia médica ahora mismo?
          </h2>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Nuestro equipo médico y quirúrgico de guardia está listo con triaje inmediato, soporte vital y quirófano preparado 24 horas al día.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
          <a
            href={`tel:${CLINIC_INFO.emergencyPhone}`}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Phone className="w-5 h-5 text-white animate-bounce" />
            <span>Llamar a Urgencias 24H</span>
          </a>

          <a
            href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}?text=URGENCIA:%20Necesito%20atencion%20medica%20inmediata%20para%20mi%20mascota`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-700 font-bold text-sm px-6 py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>WhatsApp Urgencias</span>
            <ChevronRight className="w-4 h-4 text-emerald-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

