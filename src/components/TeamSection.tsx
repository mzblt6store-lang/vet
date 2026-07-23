import React from 'react';
import { TEAM_MEMBERS } from '../data/veterinaryData';
import { Award, Heart, ShieldCheck, Stethoscope, Sparkles } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-16 lg:py-24 bg-[#FDFBF7] relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Nosotros & Equipo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Manos expertas, corazones compasivos
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Médicos veterinarios colegiados con amplia experiencia hospitalaria y especializaciones internacionales.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-emerald-100">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                  
                  {/* CMPV Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-emerald-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-emerald-100 uppercase tracking-wider">
                    {member.cmpvNumber}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] text-emerald-200 font-bold bg-emerald-900/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {member.experienceYears} años de experiencia
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-emerald-100 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Doctor Bio */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Especialidad: {member.specialty}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="p-6 pt-0 mt-2">
                <blockquote className="text-xs italic text-gray-600 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-start gap-2">
                  <Heart className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{member.quote}</span>
                </blockquote>
              </div>

            </div>
          ))}
        </div>

        {/* Quality Badges */}
        <div className="mt-16 bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 grid sm:grid-cols-3 gap-6 text-center shadow-sm">
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-gray-900 text-base">Colegiatura Oficial</h4>
            <p className="text-xs text-gray-600">Médicos registrados en el Colegio Médico Veterinario.</p>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-gray-900 text-base">Certificación Fear-Free</h4>
            <p className="text-xs text-gray-600">Técnicas avanzadas de manejo compasivo sin dolor.</p>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-emerald-200">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="font-serif font-bold text-gray-900 text-base">Educación Continua</h4>
            <p className="text-xs text-gray-600">Capacitación constante en urgencias e intensivismo.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

