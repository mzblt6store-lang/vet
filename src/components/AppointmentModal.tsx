import React, { useState, useEffect } from 'react';
import { SERVICES, CLINIC_INFO } from '../data/veterinaryData';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Send
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialPetSpecies?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialPetSpecies
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [petSpecies, setPetSpecies] = useState<string>(initialPetSpecies || 'perro');
  const [petName, setPetName] = useState<string>('');
  const [petAge, setPetAge] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>(initialServiceId || 'consulta-general');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('09:30 AM');
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  // Confirmation state
  const [ticketNumber, setTicketNumber] = useState<string>('');

  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
    if (initialPetSpecies) setPetSpecies(initialPetSpecies);

    // Default date: tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [initialServiceId, initialPetSpecies, isOpen]);

  if (!isOpen) return null;

  const selectedServiceObj = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const handleNext = () => {
    if (step === 1 && !petName) {
      alert('Por favor escribe el nombre de tu mascota.');
      return;
    }
    if (step === 3 && (!ownerName || !ownerPhone)) {
      alert('Por favor ingresa tu nombre y número de WhatsApp para confirmar.');
      return;
    }

    if (step === 3) {
      // Generate random ticket
      const randomTicket = 'VA-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicket);
      setStep(4);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleSendWhatsappConfirmation = () => {
    const text = `Hola *Clínica Veterinaria VetAmor*, acabo de agendar una cita para mi mascota:\n\n` +
      `📌 *Ticket N°:* ${ticketNumber}\n` +
      `🐾 *Mascota:* ${petName} (${petSpecies.toUpperCase()})\n` +
      `🩺 *Servicio:* ${selectedServiceObj.title}\n` +
      `📅 *Fecha:* ${date}\n` +
      `⏰ *Hora:* ${timeSlot}\n` +
      `👤 *Dueño:* ${ownerName} (${ownerPhone})\n\n` +
      `¡Por favor confirmen mi turno! Gracias.`;

    const url = `https://wa.me/${CLINIC_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-xl w-full shadow-2xl border border-gray-200 relative my-8 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Cita Rápida
            </span>
            <span className="text-xs text-emerald-200">Reserva en 3 sencillos pasos</span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-white">
            {step === 4 ? '¡Cita Reservada con Éxito!' : 'Agendar Cita en VetAmor'}
          </h3>

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-4">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-emerald-950'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-emerald-950'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-orange-500' : 'bg-emerald-950'}`} />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: PET DETAILS */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  1. ¿Qué especie es tu mascota?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'perro', label: 'Perro', emoji: '🐶' },
                    { id: 'gato', label: 'Gato', emoji: '🐱' },
                    { id: 'ave', label: 'Ave', emoji: '🦜' },
                    { id: 'exotico', label: 'Otro', emoji: '🐰' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPetSpecies(item.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        petSpecies === item.id
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md shadow-emerald-200'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{item.emoji}</span>
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Nombre de tu mascota *
                </label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Ej. Toby, Mia, Pelusa"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Edad aproximada (opcional)
                </label>
                <input
                  type="text"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="Ej. 2 años, 5 meses"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE CHOICE */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                2. Selecciona el servicio requerido
              </label>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {SERVICES.map((serv) => (
                  <div
                    key={serv.id}
                    onClick={() => setServiceId(serv.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      serviceId === serv.id
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 text-sm">
                        {serv.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {serv.priceEstimate} • ~{serv.durationMinutes} min
                      </p>
                    </div>
                    {serviceId === serv.id && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Emergency Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-3.5 rounded-2xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                  <div className="text-xs text-amber-900">
                    <span className="font-bold">¿Es una urgencia médica inmediata?</span>
                    <p className="text-[11px] text-amber-800">Notificaremos inmediatamente a nuestro equipo de urgencias.</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: DATE, TIME & OWNER INFO */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Fecha preferida *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Turno / Hora *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 font-medium"
                  >
                    <option value="08:30 AM">08:30 AM (Mañana)</option>
                    <option value="10:00 AM">10:00 AM (Mañana)</option>
                    <option value="11:30 AM">11:30 AM (Mañana)</option>
                    <option value="03:00 PM">03:00 PM (Tarde)</option>
                    <option value="04:30 PM">04:30 PM (Tarde)</option>
                    <option value="06:00 PM">06:00 PM (Noche)</option>
                    <option value="07:30 PM">07:30 PM (Noche)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tu Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Ej. Valeria Mendoza"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tu WhatsApp * (Para confirmación)
                </label>
                <input
                  type="tel"
                  required
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="Ej. +51 987 654 321"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Mi perrita le teme a las agujas, le toca su vacuna anual."
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
                />
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION TICKET */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              {/* Digital Ticket Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-emerald-300 relative text-left space-y-3 shadow-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Ticket Digital de Cita
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    {ticketNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">Mascota:</span>
                    <strong className="text-gray-900 font-bold">{petName} ({petSpecies})</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Servicio:</span>
                    <strong className="text-gray-900 font-bold">{selectedServiceObj.title}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Fecha y Hora:</span>
                    <strong className="text-gray-900 font-bold">{date} • {timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Dueño:</span>
                    <strong className="text-gray-900 font-bold">{ownerName}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  📍 <strong>Sede Principal:</strong> {CLINIC_INFO.address}. Estacionamiento gratuito.
                </div>
              </div>

              <p className="text-xs text-gray-600">
                Puedes enviar los datos directamente a nuestro equipo medico por WhatsApp con un solo clic:
              </p>

              <button
                onClick={handleSendWhatsappConfirmation}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-full shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </button>
            </div>
          )}

          {/* Modal Footer Controls for Steps 1-3 */}
          {step < 4 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/80">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{step === 3 ? 'Confirmar Cita' : 'Siguiente Paso'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

