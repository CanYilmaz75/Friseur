import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: {
    en: 'Home',
    de: 'Startseite'
  },
  dashboard: {
    en: 'Dashboard',
    de: 'Übersicht'
  },
  login: {
    en: 'Login',
    de: 'Anmelden'
  },
  register: {
    en: 'Register',
    de: 'Registrieren'
  },
  logout: {
    en: 'Logout',
    de: 'Abmelden'
  },
  // Home page
  welcomeMessage: {
    en: 'The Ultimate Salon Management Platform',
    de: 'Die ultimative Salon-Management-Plattform'
  },
  subtitle: {
    en: 'Empower your salon business with Estilo. Streamline bookings, manage staff, and grow your client base with our all-in-one solution.',
    de: 'Stärken Sie Ihr Salongeschäft mit Estilo. Optimieren Sie Buchungen, verwalten Sie Mitarbeiter und erweitern Sie Ihren Kundenstamm mit unserer All-in-One-Lösung.'
  },
  registerSalon: {
    en: 'Register Your Salon',
    de: 'Salon registrieren'
  },
  findSalon: {
    en: 'Find a Salon',
    de: 'Salon finden'
  },
  // Features
  smartScheduling: {
    en: 'Smart Scheduling',
    de: 'Intelligente Terminplanung'
  },
  smartSchedulingDesc: {
    en: 'Automated booking system with real-time availability and staff management',
    de: 'Automatisiertes Buchungssystem mit Echtzeit-Verfügbarkeit und Personalmanagement'
  },
  businessAnalytics: {
    en: 'Business Analytics',
    de: 'Geschäftsanalysen'
  },
  businessAnalyticsDesc: {
    en: 'Detailed insights into your salon\'s performance and growth opportunities',
    de: 'Detaillierte Einblicke in die Leistung Ihres Salons und Wachstumschancen'
  },
  clientManagement: {
    en: 'Client Management',
    de: 'Kundenverwaltung'
  },
  clientManagementDesc: {
    en: 'Build lasting relationships with integrated CRM and marketing tools',
    de: 'Aufbau langfristiger Kundenbeziehungen mit integrierten CRM- und Marketing-Tools'
  },
  // Pricing
  pricingPlans: {
    en: 'Pricing Plans',
    de: 'Preispläne'
  },
  starter: {
    en: 'Starter',
    de: 'Einsteiger'
  },
  professional: {
    en: 'Professional',
    de: 'Professional'
  },
  enterprise: {
    en: 'Enterprise',
    de: 'Enterprise'
  },
  popular: {
    en: 'Popular',
    de: 'Beliebt'
  },
  month: {
    en: '/mo',
    de: '/Monat'
  },
  getStarted: {
    en: 'Get Started',
    de: 'Jetzt starten'
  },
  contactSales: {
    en: 'Contact Sales',
    de: 'Vertrieb kontaktieren'
  },
  // Features list
  upToThreeStylists: {
    en: 'Up to 3 stylists',
    de: 'Bis zu 3 Stylisten'
  },
  basicScheduling: {
    en: 'Basic scheduling',
    de: 'Basis-Terminplanung'
  },
  emailNotifications: {
    en: 'Email notifications',
    de: 'E-Mail-Benachrichtigungen'
  },
  upToTenStylists: {
    en: 'Up to 10 stylists',
    de: 'Bis zu 10 Stylisten'
  },
  advancedScheduling: {
    en: 'Advanced scheduling',
    de: 'Erweiterte Terminplanung'
  },
  smsNotifications: {
    en: 'SMS notifications',
    de: 'SMS-Benachrichtigungen'
  },
  analyticsDashboard: {
    en: 'Analytics dashboard',
    de: 'Analyse-Dashboard'
  },
  unlimitedStylists: {
    en: 'Unlimited stylists',
    de: 'Unbegrenzte Stylisten'
  },
  customBranding: {
    en: 'Custom branding',
    de: 'Individuelles Branding'
  },
  prioritySupport: {
    en: 'Priority support',
    de: 'Prioritäts-Support'
  },
  apiAccess: {
    en: 'API access',
    de: 'API-Zugriff'
  },
  // Auth pages
  email: {
    en: 'Email',
    de: 'E-Mail'
  },
  password: {
    en: 'Password',
    de: 'Passwort'
  },
  confirmPassword: {
    en: 'Confirm Password',
    de: 'Passwort bestätigen'
  },
  fullName: {
    en: 'Full Name',
    de: 'Vollständiger Name'
  },
  welcomeBack: {
    en: 'Welcome Back',
    de: 'Willkommen zurück'
  },
  signInToAccount: {
    en: 'Sign in to your account',
    de: 'Melden Sie sich bei Ihrem Konto an'
  },
  createAccount: {
    en: 'Create Account',
    de: 'Konto erstellen'
  },
  joinEstilo: {
    en: 'Join Estilo today',
    de: 'Werden Sie noch heute Teil von Estilo'
  },
  // Dashboard
  welcomeUser: {
    en: 'Welcome back',
    de: 'Willkommen zurück'
  },
  manageAppointments: {
    en: 'Manage your appointments and preferences',
    de: 'Verwalten Sie Ihre Termine und Einstellungen'
  },
  upcomingAppointments: {
    en: 'Upcoming Appointments',
    de: 'Anstehende Termine'
  },
  quickActions: {
    en: 'Quick Actions',
    de: 'Schnellzugriff'
  },
  bookNewAppointment: {
    en: 'Book New Appointment',
    de: 'Neuen Termin buchen'
  },
  viewHistory: {
    en: 'View Appointment History',
    de: 'Terminverlauf anzeigen'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}