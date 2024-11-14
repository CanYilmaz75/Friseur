import { Link } from 'react-router-dom';
import { Calendar, Shield, Users, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          {t('welcomeMessage')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register-salon"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {t('registerSalon')}
          </Link>
          <Link
            to="/find-salon"
            className="inline-block bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            {t('findSalon')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('smartScheduling')}</h3>
          <p className="text-gray-600">
            {t('smartSchedulingDesc')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('businessAnalytics')}</h3>
          <p className="text-gray-600">
            {t('businessAnalyticsDesc')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('clientManagement')}</h3>
          <p className="text-gray-600">
            {t('clientManagementDesc')}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">{t('pricingPlans')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors">
            <h3 className="text-xl font-semibold mb-2">{t('starter')}</h3>
            <p className="text-3xl font-bold mb-4">$49<span className="text-lg text-gray-600">{t('month')}</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('upToThreeStylists')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('basicScheduling')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('emailNotifications')}
              </li>
            </ul>
            <button className="w-full py-2 px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
              {t('getStarted')}
            </button>
          </div>
          <div className="border-2 border-purple-600 rounded-lg p-6 relative bg-purple-50">
            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
              {t('popular')}
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('professional')}</h3>
            <p className="text-3xl font-bold mb-4">$99<span className="text-lg text-gray-600">{t('month')}</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('upToTenStylists')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('advancedScheduling')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('smsNotifications')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('analyticsDashboard')}
              </li>
            </ul>
            <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              {t('getStarted')}
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors">
            <h3 className="text-xl font-semibold mb-2">{t('enterprise')}</h3>
            <p className="text-3xl font-bold mb-4">$199<span className="text-lg text-gray-600">{t('month')}</span></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('unlimitedStylists')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('customBranding')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('prioritySupport')}
              </li>
              <li className="flex items-center">
                <Scissors className="h-5 w-5 text-purple-600 mr-2" />
                {t('apiAccess')}
              </li>
            </ul>
            <button className="w-full py-2 px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
              {t('contactSales')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}