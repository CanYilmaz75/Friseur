import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
      className="flex items-center space-x-1 text-gray-700 hover:text-purple-600"
    >
      <Globe className="h-5 w-5" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}