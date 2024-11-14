import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import StylistForm from './StylistForm';
import StylistList from './StylistList';
import { addStylist, getSalonStylists, updateStylist, deleteStylist } from '../services/stylists';
import type { Stylist } from '../types';

interface ManageStylesProps {
  salonId: string;
}

export default function ManageStylists({ salonId }: ManageStylesProps) {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);

  useEffect(() => {
    loadStylists();
  }, [salonId]);

  const loadStylists = async () => {
    try {
      const data = await getSalonStylists(salonId);
      setStylists(data);
    } catch (error) {
      toast.error('Failed to load stylists');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingStylist) {
        await updateStylist(editingStylist.id, data);
        toast.success('Stylist updated successfully');
      } else {
        await addStylist({ ...data, salonId });
        toast.success('Stylist added successfully');
      }
      await loadStylists();
      setShowForm(false);
      setEditingStylist(null);
    } catch (error) {
      toast.error('Failed to save stylist');
    }
  };

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist);
    setShowForm(true);
  };

  const handleDelete = async (stylistId: string) => {
    try {
      await deleteStylist(stylistId);
      await loadStylists();
      toast.success('Stylist removed');
    } catch (error) {
      toast.error('Failed to remove stylist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {!showForm ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Stylists</h2>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Stylist
            </button>
          </div>

          {stylists.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No stylists added yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-purple-600 hover:text-purple-700"
              >
                Add your first stylist
              </button>
            </div>
          ) : (
            <StylistList
              stylists={stylists}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingStylist ? 'Edit Stylist' : 'Add New Stylist'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingStylist(null);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <StylistForm
            onSubmit={handleSubmit}
            initialData={editingStylist || undefined}
            salonId={salonId}
          />
        </div>
      )}
    </div>
  );
}