export interface ServiceItem {
  id: string;
  title: string;
  category: 'consulta' | 'prevencion' | 'grooming' | 'cirugia';
  description: string;
  priceEstimate: string;
  durationMinutes: number;
  iconName: string;
  popular?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  ownerName: string;
  petName: string;
  petType: 'perro' | 'gato' | 'exotico';
  petBreed: string;
  avatarUrl: string;
  petPhotoUrl: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  imageUrl: string;
  cmpvNumber: string; // Colegiatura Médico Veterinaria
  quote: string;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'citas' | 'vacunas' | 'emergencias' | 'pagos';
  question: string;
  answer: string;
}

export interface AppointmentData {
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  petName: string;
  petSpecies: 'perro' | 'gato' | 'ave' | 'exotico' | 'otro';
  petAgeYears?: number;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  isEmergency?: boolean;
}

export interface MapBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  hours: string;
  lat: number;
  lng: number;
  parkingAvailable: boolean;
  busLines: string[];
}
