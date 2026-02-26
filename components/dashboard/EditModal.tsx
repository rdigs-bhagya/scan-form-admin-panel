'use client';

import { useState } from 'react';
import { Candidate } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface EditModalProps {
  candidate: Candidate;
  onClose: () => void;
  onSave: (candidate: Candidate) => void;
}

export default function EditModal({ candidate, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Candidate>(candidate);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof Candidate, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">
            {candidate._id || candidate.id ? 'Edit Candidate' : 'Add New Candidate'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={formData.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contact Number
              </label>
              <Input
                type="tel"
                value={formData.contact || ''}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Position Applied For
              </label>
              <Input
                type="text"
                value={formData.positionAppliedFor || ''}
                onChange={(e) => handleChange('positionAppliedFor', e.target.value)}
                placeholder="Enter position"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={formData.status || 'Applied'}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 flex justify-end gap-3">
            <Button onClick={onClose} variant="outline" className="border-slate-300">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              {isSaving ? 'Saving...' : 'Save Candidate'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
