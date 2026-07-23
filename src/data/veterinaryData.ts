import { ServiceItem, Testimonial, TeamMember, FaqItem, MapBranch } from '../types';
import heroImg from '../assets/images/vet_hero_banner_1784829644946.jpg';
import teamCareImg from '../assets/images/vet_team_care_1784829654928.jpg';
import doctorPortraitImg from '../assets/images/vet_doctor_portrait_1784829664517.jpg';

export const HERO_IMAGE = heroImg;
export const TEAM_CARE_IMAGE = teamCareImg;
export const DOCTOR_PORTRAIT_IMAGE = doctorPortraitImg;

export const CLINIC_INFO = {
  name: 'Clínica Veterinaria Amor & Huellitas',
  slogan: 'El amor y cuidado que tu mejor amigo merece',
  phone: '+1 (555) 382-9382',
  whatsapp: '+1 (555) 948-2831',
  emergencyPhone: '+1 (555) 911-PETS',
  email: 'hola@amoryhuellitas.com',
  address: 'Av. Primavera 1240, San Borja, Lima',
  reference: 'A 2 cuadras del Parque de la Felicidad (Estacionamiento privado gratuito)',
  googleRating: 4.9,
  googleReviewsCount: 1248,
  patientsTreated: 18500,
  yearsExperience: 12,
  hours: {
    weekdays: 'Lunes a Sábado: 8:00 AM – 9:00 PM',
    sunday: 'Domingos y Feriados: 9:00 AM – 6:00 PM',
    emergency: 'Atención Médica de Urgencias: 24 Horas / 365 días'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'consulta-general',
    title: 'Consulta Médica Preventiva',
    category: 'consulta',
    description: 'Evaluación integral Fear-Free (sin estrés) con revisión física completa, control de peso, oídos, dentadura y signos vitales.',
    priceEstimate: '$35 USD / S/ 85',
    durationMinutes: 30,
    iconName: 'Stethoscope',
    popular: true,
    features: [
      'Examen físico cérvico-caudal',
      'Diagnóstico de nutrición y peso ideal',
      'Informe médico digital a tu WhatsApp',
      'Desparasitación interna de bienvenida incluida'
    ]
  },
  {
    id: 'vacunacion-integral',
    title: 'Plan Completo de Vacunación',
    category: 'prevencion',
    description: 'Protección asegurada contra parvo, distemper, rabia, quintuple/sextuple canina y triple felina con vacunas de alta gama.',
    priceEstimate: '$40 USD / S/ 95',
    durationMinutes: 20,
    iconName: 'Syringe',
    popular: true,
    features: [
      'Cadena de frío certificada',
      'Carnet de vacunación digital e impreso',
      'Recordatorio automático antes del refuerzo',
      'Revisión médica previa sin costo extra'
    ]
  },
  {
    id: 'grooming-spa',
    title: 'Baño y Estética Relax Spa',
    category: 'grooming',
    description: 'Sesión de higiene y cariño con agua temperada, champú hipoalergénico, masaje relajante, corte de uñas y limpieza de oídos.',
    priceEstimate: '$30 USD / S/ 70',
    durationMinutes: 60,
    iconName: 'Sparkles',
    popular: true,
    features: [
      'Secado silencioso especial para gatos y perros sensibles',
      'Corte de uñas y vaciado de glándulas anales',
      'Perfume orgánico natural y pañuelo/lazo de regalo',
      'Área de espera con música ambiental suave'
    ]
  },
  {
    id: 'profilaxis-dental',
    title: 'Odontología y Profilaxis Láser',
    category: 'consulta',
    description: 'Limpieza ultrasónica profunda para eliminar sarro y mal aliento, protegiendo las encías y el corazón de tu mascota.',
    priceEstimate: '$75 USD / S/ 180',
    durationMinutes: 45,
    iconName: 'Smile',
    features: [
      'Limpieza ultrasónica sin dolor',
      'Pulido dental e igualado de esmalte',
      'Sedación suave monitoreada con anestesia inhalatoria',
      'Guía de cepillado en casa'
    ]
  },
  {
    id: 'cirugia-soft',
    title: 'Esterilización y Cirugía Ambulatoria',
    category: 'cirugia',
    description: 'Procedimientos quirúrgicos seguros con anestesia inhalatoria, monitoreo multiparámetro constante y rápida recuperación.',
    priceEstimate: 'Desde $90 USD / S/ 220',
    durationMinutes: 90,
    iconName: 'HeartPulse',
    features: [
      'Anestesia inhalatoria isoflurano de alta seguridad',
      'Monitoreo cardíaco y de oxígeno en vivo',
      'Analgesia preventiva para evitar dolor postoperatorio',
      'Control y curación de puntos incluidos'
    ]
  },
  {
    id: 'ecografia-rayosx',
    title: 'Ecografía y Rayos X Digitales',
    category: 'consulta',
    description: 'Diagnóstico por imágenes de alta resolución en tiempo real para detección temprana de afecciones internas.',
    priceEstimate: '$50 USD / S/ 120',
    durationMinutes: 30,
    iconName: 'Activity',
    features: [
      'Entrega de informes en 30 minutos',
      'Imágenes HD enviadas a tu correo/WhatsApp',
      'Interpretación por especialista ecografista',
      'Equipos de última generación'
    ]
  },
  {
    id: 'urgencias-247',
    title: 'Atención de Urgencias 24/7',
    category: 'cirugia',
    description: 'Equipo médico de guardia capacitado para soporte vital, intoxicaciones, traumatismos e internación en UCI.',
    priceEstimate: 'Evaluación Inmediata',
    durationMinutes: 15,
    iconName: 'ShieldAlert',
    popular: true,
    features: [
      'Triaje médico inmediato al llegar',
      'Unidad de cuidados intensivos e incubadora de oxígeno',
      'Laboratorio clínico con resultados en 15 min',
      'Ambulancia veterinaria bajo solicitud'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    ownerName: 'Valeria Mendoza',
    petName: 'Milo',
    petType: 'perro',
    petBreed: 'Golden Retriever',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    petPhotoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    comment: '¡Increíble la paciencia de la Dra. Sofía! Milo solía temblar al entrar a cualquier veterinaria, pero en Amor & Huellitas lo reciben con premios, mimos y música suave. La consulta fue sin ningún dolor. Salimos felices y sin estrés.',
    date: 'Hace 3 días',
    serviceUsed: 'Consulta Preventiva + Vacuna',
    verified: true
  },
  {
    id: 't2',
    ownerName: 'Fernando & Carla',
    petName: 'Simba',
    petType: 'gato',
    petBreed: 'Persa Mestizo',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    petPhotoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    comment: 'Llegamos a la medianoche por un susto de ingestión con un lirio. El equipo de urgencias nos atendió en 1 minuto, le lavaron el estómago y Simba se recuperó al 100%. Nos salvaron la vida de nuestro gatito. ¡Eternamente agradecidos!',
    date: 'Hace 1 semana',
    serviceUsed: 'Urgencia 24 Horas',
    verified: true
  },
  {
    id: 't3',
    ownerName: 'Gisela Alarcón',
    petName: 'Cloe y Bruno',
    petType: 'perro',
    petBreed: 'Pug Canino',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    petPhotoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    comment: 'El servicio de baño y peluquería es el mejor de la ciudad. Quedaron esponjosos, oliendo riquísimo y nada asustados. Me enviaron fotos y videos del proceso. ¡Súper recomendados!',
    date: 'Hace 2 semanas',
    serviceUsed: 'Grooming & Grooming Spa',
    verified: true
  },
  {
    id: 't4',
    ownerName: 'Renzo Silva',
    petName: 'Nala',
    petType: 'gato',
    petBreed: 'Siamesa',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    petPhotoUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    comment: 'Reservar la cita por la web me tomó literal 30 segundos. Me mandaron un recordatorio a mi WhatsApp con la ubicación exacta y el nombre de la doctora. Puntuales y súper profesionales.',
    date: 'Hace 3 semanas',
    serviceUsed: 'Esterilización Ambulatoria',
    verified: true
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-sofia-ramirez',
    name: 'Dra. Sofía Ramírez',
    role: 'Directora Médica & Especialista Fear-Free',
    specialty: 'Medicina Interna Canina y Felina',
    experienceYears: 12,
    bio: 'Apasionada por la medicina preventiva y el bienestar emocional de las mascotas. Certificada en técnicas de manejo Fear-Free para reducir la ansiedad médica.',
    imageUrl: DOCTOR_PORTRAIT_IMAGE,
    cmpvNumber: 'CMPV 8492',
    quote: '"Para nosotros, cada paciente es el hijo de cuatro patas de alguien a quien amamos y respetamos."'
  },
  {
    id: 'dr-carlos-mendoza',
    name: 'Dr. Carlos Mendoza',
    role: 'Jefe de Cirugía & Traumatología',
    specialty: 'Cirugía de Tejidos Blandos y Ortopedia',
    experienceYears: 10,
    bio: 'Especializado en técnicas quirúrgicas mínimamente invasivas con anestesia inhalatoria avanzada. Ha completado exitosamente más de 3,500 cirugías.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    cmpvNumber: 'CMPV 9120',
    quote: '"La precisión quirúrgica unida al cariño es la mejor medicina."'
  },
  {
    id: 'dra-laura-ortiz',
    name: 'Dra. Laura Ortiz',
    role: 'Especialista en Medicina Felina & Odontología',
    specialty: 'Salud Felina y Profilaxis Ultrasonic',
    experienceYears: 8,
    bio: 'Dedicada exclusivamente al mundo de los felinos y la salud bucodental. Diseñó nuestra sala de consulta Cat-Friendly independiente.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813566-78a0d4a9f390?auto=format&fit=crop&q=80&w=400',
    cmpvNumber: 'CMPV 10421',
    quote: '"Entender el lenguaje silencioso de los gatos cambia completamente su experiencia médica."'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'citas',
    question: '¿Cómo reservo una cita y qué tan rápido me confirman?',
    answer: 'Es súper fácil. Puedes reservar directamente desde esta página web en menos de 1 minuto haciendo clic en "Agendar Cita Rápida". Recibirás una confirmación automática por WhatsApp y email con los detalles del turno.'
  },
  {
    id: 'faq-2',
    category: 'citas',
    question: '¿Qué pasa si tengo una emergencia médica durante la noche?',
    answer: 'Contamos con servicio de Urgencias 24/7 los 365 días del año. Si es una urgencia, no necesitas cita previa: ven directamente a la clínica o llámanos a la línea de emergencias +1 (555) 911-PETS para preparar el triaje antes de tu llegada.'
  },
  {
    id: 'faq-3',
    category: 'general',
    question: '¿Qué es el concepto "Fear-Free" (Sin Estrés) que aplican?',
    answer: 'Es un método internacional que utiliza feromonas relajantes, manejo de voz suave, premios deliciosos, mesas acolchadas e instantes de adaptación para que tu mascota no asocie la veterinaria con miedo o dolor.'
  },
  {
    id: 'faq-4',
    category: 'vacunas',
    question: '¿A qué edad debo empezar a vacunar a mi cachorro o gatito?',
    answer: 'El esquema preventivo suele iniciar entre las 6 y 8 semanas de vida. En la primera consulta realizamos un examen físico completo para verificar que esté sano y diseñamos su calendario personalizado con recordatorios a tu móvil.'
  },
  {
    id: 'faq-5',
    category: 'pagos',
    question: '¿Qué medios de pago aceptan?',
    answer: 'Aceptamos todas las tarjetas de crédito/débito (Visa, Mastercard, AMEX), transferencias bancarias, efectivo y billeteras digitales (Yape, Plin, Zelle, Paypal). Además, ofrecemos facilidades de pago para tratamientos complejos.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: '¿Tienen separación para perros y gatos?',
    answer: '¡Sí! Disponemos de una sala de espera y consultorio "Cat-Friendly" exclusivo para gatitos, libre de ladridos y con difusores de feromonas felinas (Feliway) para evitar cualquier estrés.'
  }
];

export const BRANCH_LOCATION: MapBranch = {
  id: 'principal-san-borja',
  name: 'Sede Principal San Borja',
  address: 'Av. Primavera 1240, San Borja, Lima, Perú',
  phone: '+1 (555) 382-9382',
  emergencyPhone: '+1 (555) 911-PETS',
  hours: 'Lun a Sáb 8am-9pm | Dom 9am-6pm | Urgencias 24h',
  lat: -12.1065,
  lng: -76.9850,
  parkingAvailable: true,
  busLines: ['Línea 201 Corredor Rojo', 'Ruta 3810 San Borja', 'Alight en Estación Primavera']
};
