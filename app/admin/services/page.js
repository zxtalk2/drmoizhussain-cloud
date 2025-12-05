"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Service added successfully!");
        setFormData({ title: "", description: "", category: "General" });
        fetchServices();
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      toast.error("Error adding service");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Service deleted");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("Error deleting service");
    }
  };

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
      <Toaster position="top-right" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Services</h1>
        <p className="text-gray-400 mt-1">Add and manage your services</p>
      </div>

      {/* Add Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
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
          Add New Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-4 bg-[#111] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder-gray-500 transition-all"
            required
          />
          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full p-4 bg-[#111] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder-gray-500 transition-all resize-none"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="flex-1 p-4 bg-[#111] border border-white/10 rounded-xl focus:border-primary outline-none text-white"
            >
              <option value="General">General</option>
              <option value="Consultation">Consultation</option>
              <option value="Workshop">Workshop</option>
              <option value="Training">Training</option>
            </select>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400">
              No services yet. Add your first service above!
            </p>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-all"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {service.description}
                </p>
                <span className="inline-block mt-2 text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(service._id)}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
