import { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Settings, Euro } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSalonsByOwner } from '../services/salons';
import { getAnalytics, type AnalyticsData } from '../services/analytics';
import ManageStylists from '../components/ManageStylists';
import type { Salon } from '../types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [salons, setSalons] = useState<Salon[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      if (user) {
        const salonData = await getSalonsByOwner(user.id);
        setSalons(salonData);

        if (salonData.length > 0) {
          const analyticsData = await getAnalytics(salonData[0].id);
          setAnalytics(analyticsData);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (salons.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">No Salons Found</h2>
        <p className="text-gray-600">Register your salon to get started.</p>
      </div>
    );
  }

  const salon = salons[0]; // For now, we'll work with the first salon

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {salon.name}
            </h1>
            <p className="text-gray-600">UmsatzID: {salon.umsatzId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today's Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              €{analytics?.dailyRevenue.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Weekly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                €{analytics?.weeklyRevenue.toFixed(2) || '0.00'}
              </p>
            </div>
            <Euro className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">Last 7 days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Appointments Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.appointmentsToday || 0}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">
                {analytics?.appointmentsWeek || 0} this week
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Stylists</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.stylistsActive || 0}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">
                Total Clients: {analytics?.clientsTotal || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.averageRating.toFixed(1) || '0.0'}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">Based on all reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('stylists')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'stylists'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Stylists
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900">
                    €{analytics?.monthlyRevenue.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Client Statistics</h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {analytics?.clientsTotal || 0} total clients
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'stylists' && (
            <ManageStylists salonId={salon.id} />
          )}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
              {/* Appointment calendar will be implemented */}
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Salon Settings</h2>
              {/* Settings form will be implemented */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}