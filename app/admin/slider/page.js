"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminSliderPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/slider");
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      console.error("Failed to fetch slides", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update existing slide
        await fetch("/api/slider", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...formData }),
        });
      } else {
        // Create new slide
        await fetch("/api/slider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ title: "", description: "", imageUrl: "" });
      setEditId(null);
      fetchSlides();
    } catch (error) {
      console.error("Failed to save slide", error);
    }
  };

  const handleEdit = (slide) => {
    setFormData({
      title: slide.title,
      description: slide.description,
      imageUrl: slide.imageUrl,
    });
    setEditId(slide._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      await fetch(`/api/slider?id=${id}`, {
        method: "DELETE",
      });
      fetchSlides();
    } catch (error) {
      console.error("Failed to delete slide", error);
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
      <h1 className="text-3xl font-bold mb-8">Manage Slider</h1>

      {/* Add/Edit Form */}
      <div className="bg-secondary p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Slide" : "Add New Slide"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none text-white"
              required
              placeholder="Unlock Your True Potential"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none text-white"
              rows="3"
              required
              placeholder="Expert consultation for personal growth..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none text-white"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
            >
              {editId ? "Update Slide" : "Add Slide"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({ title: "", description: "", imageUrl: "" });
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">
          Current Slides ({slides.length})
        </h2>
        {slides.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-xl border border-white/10">
            <p className="text-gray-400">
              No slides yet. Add your first slide above!
            </p>
          </div>
        ) : (
          slides.map((slide) => (
            <div
              key={slide._id}
              className="bg-secondary p-4 rounded-xl border border-white/10 flex gap-4"
            >
              {/* Image Preview */}
              <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {slide.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="px-4 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
