'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CandidateTable from '@/components/dashboard/CandidateTable';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = auth.getSession();
    if (!session) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Candidates</h1>
          <p className="text-slate-600 mt-2">View candidate details and manage applications</p>
        </div>

        <Card className="p-6">
          <CandidateTable />
        </Card>
      </div>
    </DashboardLayout>
  );
}
