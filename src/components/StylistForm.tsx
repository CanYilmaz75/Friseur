import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import type { StylistInput } from '../services/stylists';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SPECIALTIES = [
  "Women's Cuts",
  "Men's Cuts",
  "Children's Cuts",
  "Color",
  "Highlights",
  "Balayage",
  "Extensions",
  "Styling",
  "Treatments"
];

const stylistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  schedule: z.record(z.object({
    start: z.string(),
    end: z.string(),
    isWorking: z.boolean()
  }))
});

interface StylistFormProps {
  onSubmit: (data: StylistInput) => Promise<void>;
  initialData?: Partial<StylistInput>;
  salonId: string;
}

export default function StylistForm({ onSubmit, initialData, salonId }: StylistFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const defaultSchedule = DAYS.reduce((acc, day) => ({
    ...acc,
    [day]: {
      start: '09:00',
      end: '17:00',
      isWorking: true
    }
  }), {});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<StylistInput>({
    resolver: zodResolver(stylistSchema),
    defaultValues: {
      ...initialData,
      schedule: initialData?.schedule || defaultSchedule,
      salonId
    }
  });

  const selectedSpecialties = watch('specialties', []);
  const schedule = watch('schedule', defaultSchedule);

  const handleFormSubmit = async (data: StylistInput) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      toast.success(initialData ? 'Stylist updated!' : 'Stylist added!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const current = selectedSpecialties || [];
    const updated = current.includes(specialty)
      ? current.filter(s => s !== specialty)
      : [...current, specialty];
    setValue('specialties', updated);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          {...register('bio')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialties
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((specialty) => (
            <button
              key={specialty}
              type="button"
              onClick={() => toggleSpecialty(specialty)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSpecialties?.includes(specialty)
                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              } border`}
            >
              {specialty}
            </button>
          ))}
        </div>
        {errors.specialties && (
          <p className="mt-1 text-sm text-red-600">{errors.specialties.message}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
        <div className="space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-32">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={schedule[day]?.isWorking}
                    onChange={(e) => 
                      setValue(`schedule.${day}.isWorking`, e.target.checked)
                    }
                    className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              </div>
              
              {schedule[day]?.isWorking && (
                <>
                  <input
                    type="time"
                    value={schedule[day]?.start}
                    onChange={(e) => 
                      setValue(`schedule.${day}.start`, e.target.value)
                    }
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={schedule[day]?.end}
                    onChange={(e) => 
                      setValue(`schedule.${day}.end`, e.target.value)
                    }
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Stylist' : 'Add Stylist'}
      </button>
    </form>
  );
}