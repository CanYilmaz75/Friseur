import { useState } from 'react';
import { Pencil, Trash2, Star } from 'lucide-react';
import type { Stylist } from '../types';

interface StylistListProps {
  stylists: Stylist[];
  onEdit: (stylist: Stylist) => void;
  onDelete: (stylistId: string) => Promise<void>;
}

export default function StylistList({ stylists, onEdit, onDelete }: StylistListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (stylistId: string) => {
    try {
      setDeletingId(stylistId);
      await onDelete(stylistId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid gap-4">
      {stylists.map((stylist) => (
        <div
          key={stylist.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{stylist.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{stylist.bio}</p>
              
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{stylist.rating}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {stylist.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(stylist)}
                className="p-2 text-gray-400 hover:text-purple-600"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(stylist.id)}
                disabled={deletingId === stylist.id}
                className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}