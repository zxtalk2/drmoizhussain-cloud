"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    unreadContacts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/contact");
      const contacts = await res.json();
      setStats({
        contacts: contacts.length,
        unreadContacts: contacts.filter((c) => !c.read).length,
      });
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/contacts"
          className="bg-secondary p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 group"
        >
          <h3 className="text-gray-400 mb-2">Total Messages</h3>
          <p className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform">
            {stats.contacts}
          </p>
        </Link>

        <Link
          href="/admin/contacts"
          className="bg-secondary p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 group"
        >
          <h3 className="text-gray-400 mb-2">Unread Messages</h3>
          <p className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform">
            {stats.unreadContacts}
          </p>
        </Link>

        <Link
          href="/admin/services"
          className="bg-secondary p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 group"
        >
          <h3 className="text-gray-400 mb-2">Quick Actions</h3>
          <p className="text-sm text-gray-400 mt-2 group-hover:text-primary transition-colors">
            Manage Services →
          </p>
        </Link>
      </div>
    </div>
  );
}
