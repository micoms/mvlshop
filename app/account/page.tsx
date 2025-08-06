'use client';

import { Suspense } from 'react';
import Navbar from '@/components/navbar';
import  DashboardPage from './_components/account';

export default function AccountPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white">
      <Navbar />
      <Suspense fallback={<SkeletonLoader />}>
        <DashboardPage />
      </Suspense>
    </main>
  );
}
function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-slate-700/50" />
      ))}
    </div>
  );
}