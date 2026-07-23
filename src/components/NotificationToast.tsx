import React, { useState, useEffect } from 'react';
import { Heart, Calendar, X, Sparkles } from 'lucide-react';

interface ActivityItem {
  id: number;
  ownerName: string;
  petName: string;
  petType: string;
  service: string;
  timeAgo: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: 1, ownerName: 'Camila R.', petName: 'Pelusa', petType: '🐶', service: 'Vacunación Anual', timeAgo: 'Hace 3 min' },
  { id: 2, ownerName: 'Diego V.', petName: 'Simba', petType: '🐱', service: 'Consulta Preventiva', timeAgo: 'Hace 7 min' },
  { id: 3, ownerName: 'Mariana P.', petName: 'Toby', petType: '🐶', service: 'Baño Spa & Corte', timeAgo: 'Hace 12 min' },
  { id: 4, ownerName: 'Gonzalo M.', petName: 'Nala', petType: '🐱', service: 'Esterilización', timeAgo: 'Hace 18 min' },
];

export const NotificationToast: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Rotate toast every 10 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        if (!dismissed) setVisible(true);
      }, 500);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const activity = ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-5 left-5 z-30 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-emerald-200/80 animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-lg shadow-2xs">
          {activity.petType}
        </div>

        <div className="space-y-0.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span>{activity.ownerName}</span>
            <span className="text-slate-400 font-normal">• {activity.timeAgo}</span>
          </div>
          <p className="text-slate-600">
            Reservó <strong className="text-emerald-800">{activity.service}</strong> para <strong className="text-slate-800">{activity.petName}</strong>.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
          >
            <Calendar className="w-3 h-3 text-emerald-600" />
            <span>Agendar cita para mi mascota →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
