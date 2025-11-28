"use client";
import { useState, useEffect } from "react";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ title: "", description: "", category: "General" });
    fetchServices();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>

      <div className="bg-secondary p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
            required
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
          >
            <option value="General">General</option>
            <option value="Consultation">Consultation</option>
            <option value="Workshop">Workshop</option>
            <option value="Training">Training</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover"
          >
            Add Service
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-secondary p-4 rounded border border-white/10 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
              <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-2 inline-block">
                {service.category}
              </span>
            </div>
            <button className="text-red-500 hover:text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
