"use client";
import { useState, useEffect } from "react";

export default function ManageGallery() {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    youtubeId: "",
    category: "General",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setVideos(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ title: "", youtubeId: "", category: "General" });
    fetchVideos();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>

      <div className="bg-secondary p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Video</h2>
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
          <input
            type="text"
            placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
            value={formData.youtubeId}
            onChange={(e) =>
              setFormData({ ...formData, youtubeId: e.target.value })
            }
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover"
          >
            Add Video
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-secondary p-4 rounded border border-white/10"
          >
            <div className="aspect-video bg-black mb-4 rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{video.title}</h3>
              <button className="text-red-500 hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
