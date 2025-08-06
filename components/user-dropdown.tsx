// components/UserButton.tsx
'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  CreditCard,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export const UserButton = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !user?.id) return null;

  const isAdmin = user.publicMetadata?.role === 'admin';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="h-9 w-9 rounded-full ring-2 ring-transparent transition hover:ring-cyan-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:h-10 sm:w-10">
          <Image
            alt="User avatar"
            src={user.imageUrl}
            width={40}
            height={40}
            className="h-full w-full rounded-full object-cover"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <AnimatePresence>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="z-50 w-56 rounded-xl border border-slate-700/50 bg-slate-800/80 p-2 text-sm text-slate-200 shadow-2xl backdrop-blur-lg"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 rounded-md p-3">
                <Image
                  alt="User avatar"
                  src={user.imageUrl}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.firstName || 'User'}</p>
                  <p className="text-xs text-slate-400">{user.emailAddresses[0]?.emailAddress}</p>
                </div>
              </div>

              <DropdownMenu.Separator className="my-1 h-px bg-slate-700/50" />

              {/* Menu items */}
              <DropdownMenu.Group className="space-y-0.5">
                <Item icon={User} label="Account Settings" href="/account" />
                <Item icon={CreditCard} label="Subscription" href="/subscriptions" />
                {isAdmin && (
                  <Item icon={ShieldCheck} label="Admin Dashboard" href="/admin" highlight />
                )}
              </DropdownMenu.Group>

              <DropdownMenu.Separator className="my-1 h-px bg-slate-700/50" />

              <DropdownMenu.Item asChild>
                <button
                  onClick={() => signOut(() => router.push('/'))}
                  className="flex w-full items-center space-x-2 rounded-md p-3 text-left text-red-400 transition hover:bg-slate-700/60"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </DropdownMenu.Item>
            </motion.div>
          </DropdownMenu.Content>
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

/* Re-usable menu item */
const Item = ({
  icon: Icon,
  label,
  href,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  highlight?: boolean;
}) => (
  <DropdownMenu.Item asChild>
    <Link
      href={href}
      className={`flex w-full items-center justify-between rounded-md p-3 transition hover:bg-slate-700/60 ${
        highlight ? 'text-cyan-400' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <ChevronRight size={14} className="text-slate-500" />
    </Link>
  </DropdownMenu.Item>
);