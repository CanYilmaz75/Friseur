import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSalon from './pages/RegisterSalon';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import UserSettings from './pages/UserSettings';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children, requiredRole }: { children: JSX.Element, requiredRole?: 'owner' | 'client' | 'stylist' }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    // Redirect owners to admin dashboard
    if (user.role === 'owner') {
      return <Navigate to="/admin" />;
    }
    // Redirect clients to client dashboard
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-salon" element={<RegisterSalon />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="client">
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="owner">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/book" 
                  element={
                    <ProtectedRoute requiredRole="client">
                      <BookAppointment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <UserSettings />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Toaster position="bottom-right" />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;