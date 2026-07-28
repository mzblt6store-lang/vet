import React from 'react';
import { CLINIC_INFO } from '../data/veterinaryData';
import { Heart, Phone, Mail, MapPin, Calendar, ShieldCheck, Instagram, Facebook, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-12 border-t border-emerald-900 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                VetAmor
              </span>
            </div>

            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-sm">
              Clínica veterinaria especializada en medicina compasiva Fear-Free, tecnología diagnóstica avanzada y atención personalizada de la más alta calidad para tus mascotas.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-orange-500 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-orange-500 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-orange-500 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><a href="#inicio" className="hover:text-amber-300 transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-amber-300 transition-colors">Equipo Médico</a></li>
              <li><a href="#calculadora" className="hover:text-amber-300 transition-colors">Calculadora de Salud</a></li>
              <li><a href="#testimonios" className="hover:text-amber-300 transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Hours & Emergency */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">Horarios de Atención</h4>
            <div className="space-y-2 text-xs text-emerald-200/80">
              <p><strong className="text-white">Lunes a Sábado:</strong><br />8:00 AM – 9:00 PM</p>
              <p><strong className="text-white">Domingos y Feriados:</strong><br />9:00 AM – 6:00 PM</p>
              <div className="text-orange-300 font-bold bg-orange-950/40 p-2.5 rounded-xl border border-orange-500/30">
                🚨 Urgencias 24H / 365 días
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">Contacto & Sede</h4>
            <div className="space-y-2 text-xs text-emerald-200/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </p>

              <button
                onClick={onOpenBooking}
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-3 rounded-full text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Cita por WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} Clínica Veterinaria VetAmor. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              Colegio Médico Veterinario del Perú
            </span>
            <span className="text-emerald-800">|</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Políticas de Privacidad</a>
            <span className="text-emerald-800">|</span>
            <a href="/admin" className="hover:underline flex items-center gap-1">
              Portal Admin
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

