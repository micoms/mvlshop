// app/account/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Navbar from '@/components/navbar';
import {
  Search,
  ShoppingBag,
  Heart,
  Settings,
  ShieldCheck,
  Trash2,
  Sun,
  Moon,
  Upload,
  User,
  Bell,
  Shield,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') ?? 'orders';

  const tabs = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(user?.publicMetadata?.role === 'admin'
      ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }]
      : []),
  ];

  const stats = [
    { label: 'My Orders', value: 12 },
    { label: 'Total Spent', value: '$580.00' },
    { label: 'Wishlist', value: '4 items' },
    { label: 'Coupons', value: '2 active' },
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white">
      <Navbar />
      {mounted && (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-px rounded-full bg-cyan-300/40"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -120 - 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 pt-20 pb-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome back,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              {user?.firstName ?? 'User'}
            </span>{' '}
            👋
          </h1>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            ← Back to Storefront
          </button>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-3 sm:p-4 backdrop-blur-md"
              >
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="text-lg sm:text-xl font-bold">{s.value}</p>
              </motion.div>
            ))}
          </section>
        </motion.header>

        {/* Desktop tab bar */}
        <nav className="hidden sm:flex items-center gap-2 border-b border-slate-700/50 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => router.push(`/account?tab=${id}`)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg text-sm font-medium transition
                ${activeTab === id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-700/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile bottom tab bar */}
        <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-slate-800/80 backdrop-blur-lg border-t border-slate-700/50">
          <div className="flex justify-around py-1.5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => router.push(`/account?tab=${id}`)}
                className={`flex flex-col items-center space-y-0.5 px-2 py-2 rounded-lg text-[10px] font-medium transition
                  ${activeTab === id ? 'text-cyan-400' : 'text-slate-300'}`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <section className="pb-24 sm:pb-0">
          <Suspense fallback={<SkeletonLoader />}>
            <TabContent tab={activeTab} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

/* ---------- Tab Views ---------- */
function TabContent({ tab }: { tab: string }) {
  const { user } = useUser();
  switch (tab) {
    case 'orders':
      return <OrdersTab />;
    case 'wishlist':
      return <WishlistTab />;
    case 'settings':
      return <SettingsTab />;
    case 'admin':
      return user?.publicMetadata?.role === 'admin' && <AdminTab />;
    default:
      return <OrdersTab />;
  }
}

/* --- Orders --- */
function OrdersTab() {
  const [filter, setFilter] = useState('');
  const orders = [
    { id: 123, date: '2024-08-01', status: 'Delivered', total: 49.99 },
    { id: 124, date: '2024-08-05', status: 'Processing', total: 25 },
  ].filter((o) =>
    filter ? o.status.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          placeholder="Search orders…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 rounded-lg bg-slate-800/60 border border-slate-700/50 px-3 py-2 text-sm placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
        />
        <div className="flex gap-2 text-xs">
          {['All', 'Delivered', 'Processing', 'Cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s === 'All' ? '' : s)}
              className="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-cyan-500/20 transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {orders.map((o) => (
        <motion.div
          key={o.id}
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center backdrop-blur-md"
        >
          <div>
            <p className="font-medium text-white">#{o.id}</p>
            <p className="text-xs text-slate-400">{o.date}</p>
          </div>
          <span
            className={`mt-2 sm:mt-0 text-xs font-medium px-2.5 py-1 rounded-full
              ${o.status === 'Delivered'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-amber-500/20 text-amber-300'}`}
          >
            {o.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* --- Wishlist --- */
function WishlistTab() {
  const [items, setItems] = useState([
    { id: 1, name: 'Figma UI Kit', price: 29 },
    { id: 2, name: 'NextJS Boilerplate', price: 79 },
  ]);

  return (
    <div className="space-y-4">
      {items.length ? (
        items.map((i) => (
          <motion.div
            key={i.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-cyan-400">${i.price}</p>
            </div>
            <button
              onClick={() => setItems(items.filter((x) => x.id !== i.id))}
              className="p-2 text-slate-400 hover:text-red-400 transition"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-slate-400 py-8">Your wishlist is empty</p>
      )}
    </div>
  );
}

/* --- Settings --- */
function SettingsTab() {
  const { user } = useUser();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [name, setName]   = useState(user?.firstName ?? '');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress ?? '');
  const [avatarPreview, setAvatarPreview] = useState(user?.imageUrl ?? '/avatar.png');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="grid gap-6 max-w-4xl">
      {/* Profile */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 backdrop-blur-md"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User size={20} /> Profile
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <label className="relative cursor-pointer group">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover ring-2 ring-cyan-400/60"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Upload size={16} />
            </span>
          </label>
          <div className="flex-1 space-y-3">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-slate-700/50 border border-slate-600/50 px-3 py-2 text-sm"
            />
            <input
              placeholder="Email"
              value={email}
              readOnly
              className="w-full rounded-lg bg-slate-700/50 border border-slate-600/50 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 backdrop-blur-md"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} /> Preferences
        </h2>
        <div className="space-y-4">
          <Toggle label="Dark Mode" enabled={theme === 'dark'} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          <Toggle label="Email Notifications" enabled={true} />
          <Toggle label="Push Notifications" enabled={false} />
        </div>
      </motion.div>


      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-2 text-sm font-semibold"
      >
        Save Changes
      </motion.button>
    </div>
  );
}

/* --- Admin --- */
function AdminTab() {
  const metrics = ['Total Sales', 'New Users', 'Pending Refunds', 'Reports'];
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <motion.div
            key={m}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-md"
          >
            <p className="text-xs text-slate-400">{m}</p>
            <p className="text-xl font-bold">—</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* --- Toggle helper --- */
function Toggle({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-cyan-500' : 'bg-slate-600'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

/* --- Skeleton --- */
function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-slate-700/50" />
      ))}
    </div>
  );
}