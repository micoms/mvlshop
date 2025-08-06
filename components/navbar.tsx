// components/Navbar.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { UserButton } from './user-dropdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';

type Product = { id: string; name: string; slug: string };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const router = useRouter();

  // Mock fetch / cache for demo. Replace with SWR/React-Query in prod.
  const products: Product[] = useMemo(
    () => [
      { id: '1', name: 'Figma UI Kit', slug: 'figma-ui-kit' },
      { id: '2', name: 'NextJS SaaS Boilerplate', slug: 'nextjs-saas' },
      { id: '3', name: 'Gradient Icons Pack', slug: 'gradient-icons' },
    ],
    []
  );

  const results = useMemo(
    () =>
      query.trim()
        ? products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          )
        : [],
    [query, products]
  );

  // Autohide on scroll
  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setShow(y < 20 || y < lastY);
      setLastY(y);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [lastY]);

  // Cart badge
  useEffect(() => {
    const update = () => {
      const items = JSON.parse(localStorage.getItem('leafmart-cart') || '[]');
      setCartCount(items.length);
    };
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      {/* DESKTOP */}
      <motion.header
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 z-40 hidden w-full items-center justify-between border-b border-slate-700/30 bg-slate-900/70 px-6 py-3.5 text-white backdrop-blur-lg md:flex"
      >
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
            LeafMart
          </span>
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-full border border-slate-600 bg-slate-800/60 py-2 pl-9 pr-4 text-sm placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <AnimatePresence>
            {results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full space-y-1 rounded-lg border border-slate-700 bg-slate-800/80 p-2 backdrop-blur-md"
              >
                {results.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => {
                      router.push(`/products/${p.slug}`);
                      setQuery('');
                    }}
                    className="cursor-pointer rounded px-3 py-1.5 text-sm hover:bg-slate-700"
                  >
                    {p.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-900">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedOut>
            <SignInButton>
              <button className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2 text-sm font-semibold shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/60">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </motion.header>

      {/* MOBILE BAR */}
      <motion.header
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-slate-700/30 bg-slate-900/70 px-4 py-3 text-white backdrop-blur-lg md:hidden"
      >
        <Link href="/" className="text-lg font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
            LeafMart
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-slate-900">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[57px] z-30 w-full bg-slate-900/95 backdrop-blur-xl md:hidden"
          >
            {/* Search bar */}
            <div className="px-5 pt-5">
              <input
                type="text"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-transparent bg-slate-800/60 py-3 px-4 text-base placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              {results.length > 0 && (
                <ul className="mt-3 space-y-2 text-white">
                  {results.map((p) => (
                    <li
                      key={p.id}
                      onClick={() => {
                        router.push(`/products/${p.slug}`);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="cursor-pointer rounded-lg bg-slate-800/50 p-3 text-center text-sm hover:bg-slate-700/60"
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col items-center space-y-5 px-6 py-8 text-lg font-medium text-white">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="w-full rounded-lg py-3 text-center transition hover:bg-slate-800/60"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Sign-in / Account */}
            <div className="border-t border-slate-700/30 px-6 py-6">
              <SignedOut>
                <SignInButton>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 py-3 text-base font-semibold shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/60"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-center space-x-3 rounded-lg bg-slate-800/50 py-3 text-white transition hover:bg-slate-700/60">
                  <UserButton />
                  <span>Account</span>
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}