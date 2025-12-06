"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DeleteConfirmDialog from "../../../components/DeleteConfirmDialog";

export default function ManageGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    youtubeId: "",
    category: "General",
  });

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    itemId: null,
    itemName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Video added successfully!");
      setFormData({ title: "", youtubeId: "", category: "General" });
      fetchVideos();
    } catch (error) {
      toast.error("Failed to add video");
    }
  };

  const openDeleteDialog = (id, title) => {
    setDeleteDialog({ isOpen: true, itemId: id, itemName: title });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, itemId: null, itemName: "" });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/gallery?id=${deleteDialog.itemId}`, {
        method: "DELETE",
      });
      toast.success("Video deleted");
      fetchVideos();
    } catch (error) {
      toast.error("Failed to delete video");
    } finally {
      setIsDeleting(false);
      closeDeleteDialog();
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
        <h1 className="text-3xl font-bold text-white">Manage Gallery</h1>
        <p className="text-gray-400 mt-1">Add and manage YouTube videos</p>
      </div>

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
          Add New Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Video Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-4 bg-[#111] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder-gray-500 transition-all"
            required
          />
          <input
            type="text"
            placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
            value={formData.youtubeId}
            onChange={(e) =>
              setFormData({ ...formData, youtubeId: e.target.value })
            }
            className="w-full p-4 bg-[#111] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder-gray-500 transition-all"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            Add Video
          </button>
        </form>
      </div>

      {videos.length === 0 ? (
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-400">
            No videos yet. Add your first video above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all"
            >
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="font-bold text-white">{video.title}</h3>
                <button
                  onClick={() => openDeleteDialog(video._id, video.title)}
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
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        itemName={deleteDialog.itemName}
        isDeleting={isDeleting}
      />
    </div>
  );
}
