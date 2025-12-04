"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    unreadContacts: 0,
    services: 0,
    workshops: 0,
    testimonials: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactsRes, servicesRes, workshopsRes, galleryRes] =
        await Promise.all([
          fetch("/api/contact"),
          fetch("/api/services"),
          fetch("/api/workshops"),
          fetch("/api/gallery"),
        ]);

      const contacts = await contactsRes.json();
      const services = await servicesRes.json();
      const workshops = await workshopsRes.json();
      const gallery = await galleryRes.json();

      setStats({
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        unreadContacts: Array.isArray(contacts)
          ? contacts.filter((c) => !c.read).length
          : 0,
        services: Array.isArray(services) ? services.length : 0,
        workshops: Array.isArray(workshops) ? workshops.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Messages",
      value: stats.contacts,
      href: "/admin/contacts",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      href: "/admin/contacts",
      icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
      color: "from-red-500 to-red-600",
    },
    {
      label: "Services",
      value: stats.services,
      href: "/admin/services",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Workshops",
      value: stats.workshops,
      href: "/admin/workshops",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Gallery Videos",
      value: stats.gallery,
      href: "/admin/gallery",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      color: "from-pink-500 to-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:transform hover:scale-[1.02]"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={card.icon}
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/services"
              className="flex items-center gap-3 p-3 bg-[#111] rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-gray-300">Add New Service</span>
            </Link>
            <Link
              href="/admin/workshops"
              className="flex items-center gap-3 p-3 bg-[#111] rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-gray-300">Add New Workshop</span>
            </Link>
            <Link
              href="/admin/slider"
              className="flex items-center gap-3 p-3 bg-[#111] rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-300">Update Slider Images</span>
            </Link>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Activity log coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
