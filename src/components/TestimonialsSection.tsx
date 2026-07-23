import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/veterinaryData';
import { Star, ShieldCheck, Heart, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filterSpecies, setFilterSpecies] = useState<'todos' | 'perro' | 'gato'>('todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // New review form state
  const [newOwner, setNewOwner] = useState('');
  const [newPet, setNewPet] = useState('');
  const [newComment, setNewComment] = useState('');

  const filteredReviews = filterSpecies === 'todos' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.petType === filterSpecies);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOwner || !newComment) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowAddModal(false);
      setReviewSubmitted(false);
      setNewOwner('');
      setNewPet('');
      setNewComment('');
    }, 2000);
  };

  return (
    <section id="testimonios" className="py-16 lg:py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Reseñas Verificadas de Google
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Familias felices que confían en VetAmor
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Más de 1,200 dueños de mascotas respaldan nuestra atención médica cálida, puntual y profesional.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterSpecies('todos')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterSpecies === 'todos'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Todas las Reseñas ({TESTIMONIALS.length})
            </button>
            <button
              onClick={() => setFilterSpecies('perro')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterSpecies === 'perro'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              🐶 Perros
            </button>
            <button
              onClick={() => setFilterSpecies('gato')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filterSpecies === 'gato'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              🐱 Gatos
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FDFBF7] hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>Compartir Tu Experiencia</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredReviews.map((testi) => (
            <div
              key={testi.id}
              className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-gray-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-200/60 pointer-events-none" />

              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  {testi.verified && (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Cliente Verificado
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-6 italic">
                  "{testi.comment}"
                </p>
              </div>

              {/* Owner & Pet Info Row */}
              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.ownerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-sm">
                      {testi.ownerName}
                    </h4>
                    <p className="text-xs text-emerald-800 font-medium">
                      Mamá/Papá de <strong className="text-gray-900 font-bold">{testi.petName}</strong> ({testi.petBreed})
                    </p>
                    <span className="text-[11px] text-gray-400">{testi.serviceUsed} • {testi.date}</span>
                  </div>
                </div>

                {/* Pet Photo Thumbnail */}
                <img
                  src={testi.petPhotoUrl}
                  alt={testi.petName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 hidden sm:block"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>

              {reviewSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">¡Muchas Gracias!</h3>
                  <p className="text-sm text-gray-600">Tu opinión nos ayuda a seguir cuidando a más mascotas con amor.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-xl">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Dejar una Opinión</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      placeholder="Ej. María Fernanda"
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre de tu Mascota</label>
                    <input
                      type="text"
                      value={newPet}
                      onChange={(e) => setNewPet(e.target.value)}
                      placeholder="Ej. Toby (Mestizo)"
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tu Comentario / Experiencia</label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="¿Qué tal fue la atención de nuestro equipo médico?"
                      className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer"
                  >
                    Publicar Reseña
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

