'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = auth.getSession();
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-slate-600">Redirecting...</div>
    </div>
  );
}
