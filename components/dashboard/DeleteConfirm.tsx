'use client';

import { Candidate } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface DeleteConfirmProps {
  candidate: Candidate;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirm({ candidate, onClose, onConfirm }: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Delete Candidate</h2>
          </div>

          <p className="text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">{candidate.fullName}</span>? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="border-slate-300">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
