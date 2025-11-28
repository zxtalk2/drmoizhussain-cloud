"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-secondary border-r border-white/10 p-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Admin Panel</h2>
        <p className="text-xs text-gray-500 mb-8">Content Management</p>

        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/contacts"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Contact Messages
          </Link>
          <Link
            href="/admin/slider"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Manage Slider
          </Link>
          <Link
            href="/admin/services"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Manage Services
          </Link>
          <Link
            href="/admin/gallery"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Manage Gallery
          </Link>
          <Link
            href="/admin/testimonials"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Manage Testimonials
          </Link>
          <Link
            href="/admin/workshops"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Manage Workshops
          </Link>
          <Link
            href="/admin/newsletter"
            className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors"
          >
            Newsletter Subscribers
          </Link>

          <div className="border-t border-white/10 pt-4 mt-8">
            <Link
              href="/"
              className="block px-4 py-2 rounded hover:bg-primary/20 hover:text-primary transition-colors mb-2"
            >
              Back to Website
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-left px-4 py-2 rounded hover:bg-red-500/20 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
