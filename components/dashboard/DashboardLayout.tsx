'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, Users } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transition-transform duration-300 md:translate-x-0 md:relative`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:bg-slate-800 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-6 space-y-2 flex-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            <Users className="w-5 h-5" />
            <span>Candidates</span>
          </a>
        </nav>

        <div className="p-6 border-t border-slate-700">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-slate-700 text-white hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-slate-900 hover:bg-slate-100 p-2 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block text-slate-600 text-sm">
            Welcome to Admin Dashboard
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
