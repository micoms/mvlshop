"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "./user-dropdown";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-gray-900">
        LeafMart
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <Link href="/products" className="hover:text-black transition">Products</Link>
        <Link href="/about" className="hover:text-black transition">About</Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <SignedOut>
          <SignInButton>
            <button className="rounded-lg bg-black px-4 py-2 text-sm text-white font-medium hover:bg-gray-900 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
