'use client';

import { useState, useEffect } from 'react';
import { candidateAPI, Candidate } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import ViewModal from './ViewModal';
import DeleteConfirm from './DeleteConfirm';

const ITEMS_PER_PAGE = 10;

export default function CandidateTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewModal, setViewModal] = useState<Candidate | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setIsLoading(true);
    setError('');
    const data = await candidateAPI.getAll();
    if (data) {
      setCandidates(data);
    } else {
      setError('Failed to load candidates');
    }
    setIsLoading(false);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm._id || deleteConfirm.id;
    if (id) {
      const success = await candidateAPI.delete(id);
      if (success) {
        setCandidates((prev) =>
          prev.filter((c) => (c._id || c.id) !== id)
        );
        setDeleteConfirm(null);
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(candidates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCandidates = candidates.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading candidates...</div>;
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCandidates.map((candidate) => (
              <tr key={candidate._id || candidate.id} className="border-b">
                <td className="p-3">{candidate.fullName}</td>
                <td className="p-3">{candidate.emailId}</td>
                <td className="p-3">{candidate.contactNumber}</td>
                <td className="p-3">{candidate.department}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewModal(candidate)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteConfirm(candidate)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {viewModal && (
        <ViewModal
          candidate={viewModal}
          onClose={() => setViewModal(null)}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirm
          candidate={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}