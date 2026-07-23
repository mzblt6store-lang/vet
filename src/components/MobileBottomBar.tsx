import React from 'react';
import { Phone, Calendar, MessageCircle, MapPin, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO } from '../data/veterinaryData';

interface MobileBottomBarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  const cleanPhone = CLINIC_INFO.emergencyPhone.replace(/\D/g, '');
  const cleanWhatsapp = CLINIC_INFO.whatsapp.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent('Hola *VetAmor*, me gustaría información sobre sus servicios o agendar una consulta para mi mascota.');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2 md:hidden">
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        
        {/* 1-Tap Direct Call */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 active:scale-95 transition-all text-center"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-0.5 shadow-2xs">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold leading-none text-gray-800">Llamar</span>
        </a>

        {/* 1-Tap WhatsApp Direct */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 active:scale-95 transition-all text-center"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
            <MessageCircle className="w-4 h-4 fill-white/20" />
          </div>
          <span className="text-[10px] font-bold leading-none text-emerald-800">WhatsApp</span>
        </a>

        {/* Primary CTA - Agendar Cita */}
        <button
          onClick={() => onOpenBooking()}
          className="col-span-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-orange-500 hover:bg-orange-600 text-white active:scale-95 transition-all text-center shadow-md shadow-orange-200 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold leading-none">Cita Clic</span>
        </button>

        {/* 1-Tap Map / Ubicación */}
        <a
          href="#ubicacion"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 active:scale-95 transition-all text-center"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-0.5 shadow-2xs">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold leading-none text-gray-800">Mapa</span>
        </a>

      </div>
    </div>
  );
};
