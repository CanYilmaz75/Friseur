import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Salon } from '../types';

export default function FindSalon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock data for demonstration
  const salons: Salon[] = [
    {
      id: '1',
      umsatzId: 'DE123456789',
      name: 'Bella Hair Studio',
      description: 'Premium hair salon with expert stylists',
      address: 'Hauptstraße 123',
      city: 'Berlin',
      postalCode: '10115',
      phone: '+49 30 12345678',
      email: 'info@bellahair.de',
      ownerId: '1',
      services: [],
      stylists: [],
      rating: 4.8,
      reviewCount: 124,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // Add more mock salons as needed
  ];

  const filteredSalons = salons.filter(salon => 
    (salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!location || salon.city.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Find Your Perfect Salon
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by salon name or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalons.map((salon) => (
          <div key={salon.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={`https://source.unsplash.com/480x360/?salon,hairstyle&${salon.id}`}
                alt={salon.name}
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{salon.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{salon.address}</p>
              
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {salon.rating}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({salon.reviewCount} reviews)
                </span>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Scissors className="h-4 w-4 mr-1" />
                <span>From €29</span>
              </div>

              <button
                onClick={() => navigate(`/book/${salon.id}`)}
                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSalons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No salons found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}