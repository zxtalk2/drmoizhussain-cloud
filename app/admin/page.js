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
      const [
        contactsRes,
        servicesRes,
        workshopsRes,
        galleryRes,
        testimonialsRes,
      ] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/services"),
        fetch("/api/workshops"),
        fetch("/api/gallery"),
        fetch("/api/testimonials"),
      ]);

      const contacts = await contactsRes.json();
      const services = await servicesRes.json();
      const workshops = await workshopsRes.json();
      const gallery = await galleryRes.json();
      const testimonials = await testimonialsRes.json();

      setStats({
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        unreadContacts: Array.isArray(contacts)
          ? contacts.filter((c) => !c.read).length
          : 0,
        services: Array.isArray(services) ? services.length : 0,
        workshops: Array.isArray(workshops) ? workshops.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
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
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Unread",
      value: stats.unreadContacts,
      href: "/admin/contacts",
      icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
      color: "from-red-500 to-orange-500",
      bg: "bg-red-500/10",
    },
    {
      label: "Services",
      value: stats.services,
      href: "/admin/services",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Workshops",
      value: stats.workshops,
      href: "/admin/workshops",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      color: "from-purple-500 to-violet-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      href: "/admin/testimonials",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      color: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Gallery",
      value: stats.gallery,
      href: "/admin/gallery",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="loader">
          <p className="loader-text">Loading</p>
          <span className="load"></span>
        </div>
        <style>{`
          .loader { width: 80px; height: 50px; position: relative; }
          .loader-text { position: absolute; top: 0; padding: 0; margin: 0; color: #a78bfa; animation: text_713 1.5s ease both infinite; font-size: .8rem; letter-spacing: 1px; }
          .load { background-color: #8a2be2; border-radius: 50px; display: block; height: 16px; width: 16px; bottom: 0; position: absolute; transform: translateX(64px); animation: loading_713 1.5s ease both infinite; }
          .load::before { position: absolute; content: ""; width: 100%; height: 100%; background-color: #c4b5fd; border-radius: inherit; animation: loading2_713 1.5s ease both infinite; }
          @keyframes text_713 { 0% { letter-spacing: 1px; transform: translateX(0px); } 40% { letter-spacing: 2px; transform: translateX(26px); } 80% { letter-spacing: 1px; transform: translateX(32px); } 90% { letter-spacing: 2px; transform: translateX(0px); } 100% { letter-spacing: 1px; transform: translateX(0px); } }
          @keyframes loading_713 { 0% { width: 16px; transform: translateX(0px); } 40% { width: 100%; transform: translateX(0px); } 80% { width: 16px; transform: translateX(64px); } 90% { width: 100%; transform: translateX(0px); } 100% { width: 16px; transform: translateX(0px); } }
          @keyframes loading2_713 { 0% { transform: translateX(0px); width: 16px; } 40% { transform: translateX(0%); width: 80%; } 80% { width: 100%; transform: translateX(0px); } 90% { width: 80%; transform: translateX(15px); } 100% { transform: translateX(0px); width: 16px; } }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's your content overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={`${card.bg} backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl`}
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={card.icon}
                />
              </svg>
            </div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <p className="text-4xl font-bold text-white">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
