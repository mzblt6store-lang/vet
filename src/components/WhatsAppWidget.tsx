import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, ShieldAlert, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/veterinaryData';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cleanWhatsapp = CLINIC_INFO.whatsapp.replace(/\D/g, '');

  const quickTopics = [
    {
      id: 'general',
      title: 'Consulta o Información General',
      subtitle: 'Respuesta en menos de 5 min',
      icon: '💬',
      message: 'Hola *VetAmor*, me gustaría información sobre sus servicios médicos para mi mascota.',
    },
    {
      id: 'cita',
      title: 'Agendar Cita Rápida',
      subtitle: 'Consultas, vacunas o baños',
      icon: '📅',
      message: 'Hola *VetAmor*, quisiera consultar disponibilidad para agendar una cita con un veterinario.',
    },
    {
      id: 'urgencia',
      title: '🚨 Urgencia Médica 24/7',
      subtitle: 'Triaje e internamiento inmediato',
      icon: '🏥',
      message: '¡Hola! Tengo una URGENCIA MÉDICA con mi mascota en este momento.',
    },
    {
      id: 'precios',
      title: 'Precios y Vacunación',
      subtitle: 'Cotizaciones y planes preventivos',
      icon: '💉',
      message: 'Hola, quisiera conocer los precios del plan de vacunación y desparasitación.',
    }
  ];

  const handleOpenChat = (customMessage?: string) => {
    const text = encodeURIComponent(customMessage || 'Hola *VetAmor*, me gustaría recibir información rápida sobre la atención veterinaria.');
    window.open(`https://wa.me/${cleanWhatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-emerald-900 text-white p-4 sm:p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-emerald-200 hover:text-white bg-emerald-800/80 p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar widget"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-amber-400 flex items-center justify-center font-bold text-lg shadow-md">
                  🐾
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-white flex items-center gap-1.5">
                  VetAmor WhatsApp
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h4>
                <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  En línea • Respuesta rápida
                </p>
              </div>
            </div>
          </div>

          {/* Body content */}
          <div className="p-4 sm:p-5 bg-[#FDFBF7] space-y-3">
            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-xs text-gray-700 leading-relaxed">
              👋 ¡Hola! ¿En qué podemos ayudarte hoy con tu mascota? Selecciona un tema o escríbenos directamente:
            </div>

            {/* Quick Topic Buttons */}
            <div className="space-y-2">
              {quickTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleOpenChat(topic.message)}
                  className="w-full text-left bg-white hover:bg-emerald-50/60 p-3 rounded-2xl border border-gray-200/80 hover:border-emerald-300 transition-all flex items-center justify-between gap-3 group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </span>
                    <div>
                      <p className="font-bold text-xs text-gray-900 group-hover:text-emerald-800 transition-colors">
                        {topic.title}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {/* General Chat Button */}
            <button
              onClick={() => handleOpenChat()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-full shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Abrir Chat Directo en WhatsApp</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-200/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                Atención 8am - 9pm
              </span>
              <span className="flex items-center gap-1 font-bold text-orange-600">
                <ShieldAlert className="w-3 h-3" />
                Urgencias 24/7
              </span>
            </div>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group flex items-center gap-2.5 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-gray-900 text-white ring-4 ring-gray-200'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95 ring-4 ring-emerald-100'
        }`}
        aria-label="Abrir WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white/20 text-white" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 border-2 border-emerald-600 rounded-full animate-ping" />
          )}
        </div>

        <div className="text-left pr-1 hidden sm:block">
          <p className="text-xs font-bold leading-none">
            {isOpen ? 'Cerrar Chat' : '¿Dudas? WhatsApp'}
          </p>
          {!isOpen && (
            <p className="text-[10px] text-emerald-100 leading-tight font-medium mt-0.5">
              Info rápida & Citas
            </p>
          )}
        </div>

        {/* Pulse Ring */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-pulse -z-10" />
        )}
      </button>

    </div>
  );
};
