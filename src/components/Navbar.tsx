import { Link, useNavigate } from 'react-router-dom';
import { Scissors, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Estilo</span>
          </Link>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link
                  to={user.role === 'owner' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600"
                >
                  <User className="h-5 w-5" />
                  <span>{t('dashboard')}</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600"
                >
                  <Settings className="h-5 w-5" />
                  <span>{t('settings')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}