// components/LandingPage.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 px-4 text-white">
        {/* animated background */}
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0)_50%)]" />

        {/* top bar – same glass, smaller padding on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute top-0 left-0 z-10 flex w-full justify-center px-4 pt-5 sm:px-6 sm:pt-6 lg:justify-start lg:px-8 lg:pt-8"
        >
          <div className="flex items-center space-x-1.5 rounded-full border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-md sm:px-5 sm:py-2 sm:text-sm">
            <span>Discover the best digital tools at</span>
            <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              LeafMart
            </span>
          </div>
        </motion.div>

        {/* headline – scales fluidly, keeps line break control */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-center text-[2.75rem] font-extrabold leading-tight tracking-tight xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Your One-Stop
          <br className="hidden xs:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
            {" "}Digital Marketplace
          </span>
        </motion.h1>

        {/* description – shorter width on mobile so lines don’t run too long */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-3 max-w-sm text-center text-sm text-slate-300 xs:max-w-md sm:mt-4 sm:max-w-lg sm:text-base md:text-lg"
        >
          Explore curated software, templates, plugins and more — all in one
          place, hand-picked for creators and makers.
        </motion.p>

        {/* cta – grows with screen, no full-width on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="/products"
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="relative z-10">Browse Products</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 blur-xl transition-opacity group-hover:opacity-60" />
          </a>
        </motion.div>

        {/* floating particles – same look, slightly fewer on mobile for perf */}
        {mounted && (
          <div className="pointer-events-none absolute inset-0">
            {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-cyan-300/40"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}