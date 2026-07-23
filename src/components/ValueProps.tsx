import React from 'react';
import { HeartHandshake, ShieldCheck, Stethoscope, Clock, Smile, Award } from 'lucide-react';
import { TEAM_CARE_IMAGE } from '../data/veterinaryData';

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Manejo Fear-Free (Sin Estrés)',
      description: 'Adaptamos la consulta al ritmo de tu mascota con técnicas amables, feromonas calmantes y premios sabrosos para que no sienta miedo.',
      badge: 'Cero dolor'
    },
    {
      icon: Stethoscope,
      title: 'Diagnóstico en el Día',
      description: 'Contamos con laboratorio clínico propio, ecografía de alta resolución y Rayos X digitales para darte resultados certeros en minutos.',
      badge: 'Resultados rápidos'
    },
    {
      icon: Clock,
      title: 'Urgencias Médicas 24/7',
      description: 'Médicos cirujanos e intensivistas de guardia constante para atender de inmediato emergencias, intoxicaciones o accidentes.',
      badge: 'Siempre abiertos'
    },
    {
      icon: Smile,
      title: 'Espacios Cat-Friendly',
      description: 'Salas de espera y consultorios independientes para gatitos, aislados de ruidos o ladridos para garantizar su tranquilidad.',
      badge: 'Para gatos'
    },
    {
      icon: ShieldCheck,
      title: 'Precios Claros y Transparentes',
      description: 'Explicamos detalladamente cada diagnóstico y presupuesto antes de proceder. Sin costos sorpresas ni exámenes innecesarios.',
      badge: 'Honestidad'
    },
    {
      icon: Award,
      title: 'Veterinarios Colegiados',
      description: 'Nuestro equipo médico cuenta con posgrados universitarios, especializaciones y capacitación internacional continua.',
      badge: 'Expertos'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Por qué confían en nosotros
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Amor genuino en cada consulta, respaldo científico en cada tratamiento.
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Diseñamos una experiencia médica pensada para la comodidad de tu mascota y tu tranquilidad total.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200 transition-all duration-300 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner with Deep Emerald Theme */}
        <div className="mt-16 bg-emerald-900 rounded-[32px] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-emerald-800">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-emerald-800/80 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-700/50 uppercase tracking-widest">
                Compromiso Humano
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                "No tratamos simples pacientes, cuidamos a miembros amados de tu familia."
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
                Sabemos lo importante que es tu mascota para ti. Por eso nos tomamos el tiempo en cada consulta para escuchar sus síntomas, responder tus dudas y tratarlo con absoluta ternura.
              </p>
              <div className="pt-2 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-white">15+</p>
                  <p className="text-emerald-400 text-xs uppercase tracking-wider mt-0.5">Años de Experiencia</p>
                </div>
                <div className="h-8 w-px bg-emerald-800" />
                <div>
                  <p className="text-3xl font-serif font-bold text-white">18k+</p>
                  <p className="text-emerald-400 text-xs uppercase tracking-wider mt-0.5">Familias Felices</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-emerald-700/50 shadow-xl">
                <img
                  src={TEAM_CARE_IMAGE}
                  alt="Equipo de veterinarios tratando con amor a un perrito"
                  className="w-full h-60 lg:h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

