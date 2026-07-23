import React, { useState } from 'react';
import { Calculator, Heart, Calendar, ShieldCheck, Sparkles, ChevronRight, Activity } from 'lucide-react';

interface PetHealthCalculatorProps {
  onOpenBooking: (serviceId?: string, petSpecies?: string) => void;
}

export const PetHealthCalculator: React.FC<PetHealthCalculatorProps> = ({ onOpenBooking }) => {
  const [petType, setPetType] = useState<'perro' | 'gato'>('perro');
  const [petAge, setPetAge] = useState<number>(3);
  const [petWeight, setPetWeight] = useState<number>(10);
  const [petName, setPetName] = useState<string>('Mia');

  // Calculate human age approximation
  const calculateHumanAge = () => {
    if (petType === 'perro') {
      if (petAge <= 1) return 15;
      if (petAge === 2) return 24;
      return 24 + (petAge - 2) * (petWeight > 25 ? 7 : 5);
    } else {
      if (petAge <= 1) return 15;
      if (petAge === 2) return 24;
      return 24 + (petAge - 2) * 4;
    }
  };

  const humanAge = calculateHumanAge();

  // Recommendations based on age stage
  const getStageInfo = () => {
    if (petAge < 1) {
      return {
        stageName: 'Cachorro / Gatito (Etapa de Crecimiento)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        recommendations: [
          'Esquema primario completo de vacunación (Séxtuple/Triple felina)',
          'Desparasitación interna cada 3 meses',
          'Evaluación de desarrollo óseo y dieta puppy',
          'Evaluación para esterilización preventiva (a partir de los 6 meses)'
        ],
        recommendedServiceId: 'vacunacion-integral',
        recommendedServiceName: 'Vacunación & Desparasitación de Cachorro'
      };
    } else if (petAge <= 6) {
      return {
        stageName: 'Adulto Joven (Plena Vitalidad)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        recommendations: [
          'Chequeo médico preventivo anual',
          'Refuerzo anual de vacunas y profilaxis dental suave',
          'Control de peso y nutrición balanceada',
          'Protección antipulgas y garrapatas mensual'
        ],
        recommendedServiceId: 'consulta-general',
        recommendedServiceName: 'Consulta Anual de Mantenimiento Preventivo'
      };
    } else {
      return {
        stageName: 'Senior / Mascota Madura (Atención Especializada)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        recommendations: [
          'Chequeo médico semestral con perfil sanguíneo geriátrico',
          'Ecografía abdominal de control e hipertensión arterial',
          'Perfil articular e higiene bucodental profunda',
          'Alimentación senior rica en omega-3 y condroprotectores'
        ],
        recommendedServiceId: 'consulta-general',
        recommendedServiceName: 'Chequeo Integral Senior Gerontológico'
      };
    }
  };

  const stage = getStageInfo();

  return (
    <section id="calculadora" className="py-16 lg:py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Herramienta Interactiva
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Calculadora de Edad Humana & Salud
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Descubre la edad biológica equivalente de tu mascota y conoce exactamente qué cuidados médicos necesita según su etapa de vida.
          </p>
        </div>

        {/* Calculator Widget Wrapper */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-gray-200/80 shadow-xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Pet Name input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nombre de tu mascota
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value || 'Tu mascota')}
                placeholder="Ej. Toby, Mia, Pelusa"
                className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Pet Species Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Especie
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPetType('perro')}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    petType === 'perro'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  🐶 Perro
                </button>
                <button
                  type="button"
                  onClick={() => setPetType('gato')}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    petType === 'gato'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  🐱 Gato
                </button>
              </div>
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Edad cronológica: <span className="text-emerald-700 text-sm font-bold">{petAge} {petAge === 1 ? 'año' : 'años'}</span>
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="18"
                step="1"
                value={petAge}
                onChange={(e) => setPetAge(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-medium">
                <span>0 años (Cachorro)</span>
                <span>8 años</span>
                <span>18+ años (Senior)</span>
              </div>
            </div>

            {/* Weight Slider if dog */}
            {petType === 'perro' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Peso aproximado: <span className="text-emerald-700 text-sm font-bold">{petWeight} kg</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="2"
                  max="45"
                  step="1"
                  value={petWeight}
                  onChange={(e) => setPetWeight(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-medium">
                  <span>Pequeño (&lt;8kg)</span>
                  <span>Mediano (10-25kg)</span>
                  <span>Grande (&gt;25kg)</span>
                </div>
              </div>
            )}

          </div>

          {/* Results Display Column */}
          <div className="md:col-span-6 bg-emerald-900 text-white rounded-2xl p-6 sm:p-7 space-y-5 border border-emerald-800 shadow-xl relative overflow-hidden">
            
            {/* Background Paw Graphic */}
            <div className="absolute top-[-20px] right-[-20px] text-emerald-800/40 pointer-events-none">
              <Heart className="w-48 h-48 fill-current" />
            </div>

            <div className="relative z-10 space-y-4">
              
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-amber-300" />
                  Resultado para {petName}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stage.badgeColor}`}>
                  {petType === 'perro' ? 'Canino' : 'Felino'}
                </span>
              </div>

              {/* Human age highlight card */}
              <div className="bg-emerald-950/80 rounded-xl p-4 border border-emerald-800 text-center">
                <p className="text-xs text-emerald-200 font-medium mb-1">
                  Edad equivalente en años humanos:
                </p>
                <div className="text-4xl font-serif font-bold text-amber-300">
                  ~{humanAge} <span className="text-lg font-sans font-normal text-emerald-100">años humanos</span>
                </div>
                <p className="text-xs text-emerald-200 font-medium mt-1">
                  Etapa: <strong className="text-white">{stage.stageName}</strong>
                </p>
              </div>

              {/* Checklist */}
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  Recomendaciones médicas clave:
                </p>
                <ul className="space-y-2">
                  {stage.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-100">
                      <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Trigger Button */}
              <button
                onClick={() => onOpenBooking(stage.recommendedServiceId, petType)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar {stage.recommendedServiceName}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
