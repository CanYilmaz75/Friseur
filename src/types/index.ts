export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'stylist' | 'client';
}

export interface Salon {
  id: string;
  umsatzId: string; // German VAT ID as unique identifier
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  logo?: string;
  ownerId: string;
  services: Service[];
  stylists: string[]; // Array of stylist IDs
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  salonId: string;
}

export interface Stylist {
  id: string;
  umsatzId: string; // Salon's VAT ID for association
  name: string;
  bio: string;
  specialties: string[];
  schedule: {
    [key: string]: { // day of week
      start: string;
      end: string;
      isWorking: boolean;
    };
  };
  rating: number;
  salonId: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  stylistId: string;
  serviceId: string;
  salonId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}