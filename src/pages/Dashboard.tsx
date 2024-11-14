import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Scissors } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect salon owners to admin dashboard
    if (user?.role === 'owner') {
      navigate('/admin');
      return;
    }
  }, [user, navigate]);

  // If user is owner, don't render the client dashboard
  if (user?.role === 'owner') {
    return null;
  }

  const upcomingAppointments = [
    {
      id: 1,
      service: "Women's Haircut",
      stylist: "Sarah Johnson",
      date: "March 15, 2024",
      time: "2:00 PM",
    },
    {
      id: 2,
      service: "Hair Coloring",
      stylist: "Michael Chen",
      date: "March 22, 2024",
      time: "10:00 AM",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Manage your appointments and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{appointment.service}</h3>
                    <p className="text-sm text-gray-600">
                      with {appointment.stylist}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4">
            <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-400 transition-colors">
              <div className="flex items-center">
                <Scissors className="h-5 w-5 mr-3 text-purple-600" />
                <span>Book New Appointment</span>
              </div>
            </button>
            <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-400 transition-colors">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-purple-600" />
                <span>View Appointment History</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}