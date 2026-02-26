// API utility for candidate CRUD operations
// Replace BASE_URL with your actual MongoDB API endpoint

export interface Candidate {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  contact: string;
  positionAppliedFor: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Selected';
  [key: string]: any; // Allow additional fields from your data
}

const BASE_URL = 'https://scan-form2.onrender.com';
 
export const candidateAPI = {
  // Get all candi  dates
  getAll: async (): Promise<Candidate[]> => {
    try {
      const response = await fetch(`${BASE_URL}/candidates`);
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  },

  // Get single candidate
  getById: async (id: string): Promise<Candidate | null> => {
    try {
      const response = await fetch(`${BASE_URL}/candidates/${id}`);
      if (!response.ok) throw new Error('Failed to fetch candidate');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      return null;
    }
  },

  // Update candidate
  update: async (id: string, candidate: Partial<Candidate>): Promise<Candidate | null> => {
    try {
      const response = await fetch(`${BASE_URL}/candidates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });
      if (!response.ok) throw new Error('Failed to update candidate');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating candidate:', error);
      return null;
    }
  },

  // Delete candidate
  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/candidates/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete candidate');
      return true;
    } catch (error) {
      console.error('Error deleting candidate:', error);
      return false;
    }
  },
};
