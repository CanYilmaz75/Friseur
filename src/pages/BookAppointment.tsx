import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, Scissors, User } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const services = [
  { id: 1, name: "Women's Haircut", duration: 60, price: 60 },
  { id: 2, name: "Men's Haircut", duration: 45, price: 40 },
  { id: 3, name: "Hair Coloring", duration: 120, price: 100 },
  { id: 4, name: "Hair Treatment", duration: 45, price: 45 },
  { id: 5, name: "Styling", duration: 60, price: 55 },
  { id: 6, name: "Extensions", duration: 180, price: 200 },
];

const stylists = [
  { id: 1, name: 'Sarah Johnson', specialties: ['Coloring', 'Styling'], rating: 4.9 },
  { id: 2, name: 'Michael Chen', specialties: ['Men\'s Cuts', 'Fades'], rating: 4.8 },
  { id: 3, name: 'Emma Davis', specialties: ['Extensions', 'Treatments'], rating: 4.7 },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<number>();
  const [selectedStylist, setSelectedStylist] = useState<number>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    if (!selectedDate || !selectedService || !selectedStylist || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate booking API call
    toast.success('Appointment booked successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Appointment</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {/* Services Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Scissors className="h-5 w-5 mr-2 text-purple-600" />
              Select Service
            </h2>
            <div className="grid gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 border rounded-lg text-left ${
                    selectedService === service.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-400'
                  }`}
                >
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-gray-600">
                    {service.duration} min · ${service.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stylist Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              Choose Stylist
            </h2>
            <div className="grid gap-3">
              {stylists.map((stylist) => (
                <button
                  key={stylist.id}
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`p-4 border rounded-lg text-left ${
                    selectedStylist === stylist.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-400'
                  }`}
                >
                  <div className="font-medium">{stylist.name}</div>
                  <div className="text-sm text-gray-600">
                    {stylist.specialties.join(', ')} · ⭐️ {stylist.rating}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Date Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Select Date
            </h2>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="border rounded-lg p-3"
            />
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-600" />
                Select Time
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 border rounded-md ${
                      selectedTime === time
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Requests or Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={3}
        />
      </div>

      {/* Booking Summary */}
      {selectedService && selectedStylist && selectedDate && selectedTime && (
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          <p className="text-gray-600">
            {services.find((s) => s.id === selectedService)?.name} with{' '}
            {stylists.find((s) => s.id === selectedStylist)?.name} on{' '}
            {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
          </p>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedService || !selectedStylist || !selectedDate || !selectedTime}
        className="mt-8 w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        Book Appointment
      </button>
    </div>
  );
}