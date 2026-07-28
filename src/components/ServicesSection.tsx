import React, { useState } from 'react';
import { SERVICES } from '../data/veterinaryData';
import { 
  Stethoscope, 
  Syringe, 
  Sparkles, 
  Smile, 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Clock, 
  Check, 
  Calendar, 
  ChevronRight,
  Info
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios' },
    { id: 'consulta', label: 'Consultas & Chequeos' },
    { id: 'prevencion', label: 'Vacunas & Prevención' },
    { id: 'grooming', label: 'Estética & Spa' },
    { id: 'cirugia', label: 'Cirugía & Urgencias' },
  ];

  const filteredServices = activeCategory === 'todos' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return Stethoscope;
      case 'Syringe': return Syringe;
      case 'Sparkles': return Sparkles;
      case 'Smile': return Smile;
      case 'HeartPulse': return HeartPulse;
      case 'Activity': return Activity;
      case 'ShieldAlert': return ShieldAlert;
      default: return Stethoscope;
    }
  };

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Tarifas Claras y Transparentes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Cuidado integral para cada etapa de tu mascota
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Desde revisiones preventivas hasta cirugías especializadas y atención de emergencias 24/7.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className={`bg-[#FDFBF7] rounded-3xl p-7 border transition-all flex flex-col justify-between relative hover:shadow-xl ${
                  service.popular
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-900/5'
                    : 'border-gray-200 hover:border-emerald-200 shadow-xs'
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 right-6 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-orange-200">
                    Muy Solicitado
                  </span>
                )}

                <div>
                  {/* Service Icon & Price Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">Estimado</span>
                      <span className="text-xl font-serif font-bold text-gray-900">
                        {service.priceEstimate}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mb-5 bg-white px-3 py-1.5 rounded-full border border-gray-200/80 w-fit">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Duración: ~{service.durationMinutes} min</span>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2 mb-6 border-t border-gray-200/60 pt-4">
                    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Incluye:</p>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    service.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200'
                      : 'bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar por WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-12 bg-emerald-50/80 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4 max-w-3xl mx-auto">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <p className="font-bold mb-0.5">Transparencia y Cuidado Responsable:</p>
            Los precios indicados son estimados referenciales para servicios estándar. En caso de requerir exámenes complementarios específicos, nuestro equipo médico te notificará y solicitará tu aprobación previa antes de realizar cualquier procedimiento adicional.
          </div>
        </div>

      </div>
    </section>
  );
};

