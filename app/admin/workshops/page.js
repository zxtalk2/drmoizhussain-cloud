"use client";
import { useState, useEffect } from "react";

export default function ManageWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    link: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    const res = await fetch("/api/workshops");
    const data = await res.json();
    setWorkshops(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing workshop
      await fetch(`/api/workshops`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...formData }),
      });
      setEditingId(null);
    } else {
      // Create new workshop
      await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({ title: "", description: "", category: "General", link: "" });
    fetchWorkshops();
  };

  const handleEdit = (workshop) => {
    setFormData({
      title: workshop.title,
      description: workshop.description || "",
      category: workshop.category || "General",
      link: workshop.link || "",
    });
    setEditingId(workshop._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      await fetch(`/api/workshops?id=${id}`, { method: "DELETE" });
      fetchWorkshops();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", category: "General", link: "" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Workshops</h1>

      <div className="bg-secondary p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Workshop" : "Add New Workshop"}
        </h2>
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
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none min-h-[120px]"
            rows={5}
          />
          <input
            type="text"
            placeholder="Category (e.g., Mind Development, Yoga)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
          />
          <input
            type="url"
            placeholder="External Link (optional)"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full p-3 bg-black/50 border border-white/10 rounded focus:border-primary outline-none"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
            >
              {editingId ? "Update Workshop" : "Add Workshop"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-secondary p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">
          Existing Workshops ({workshops.length})
        </h2>
        <div className="space-y-4">
          {workshops.map((workshop) => (
            <div
              key={workshop._id}
              className="p-4 bg-black/30 rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {workshop.title}
                  </h3>
                  {workshop.description && (
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {workshop.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {workshop.category && (
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">
                        {workshop.category}
                      </span>
                    )}
                    {workshop.link && (
                      <a
                        href={workshop.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
                      >
                        🔗 External Link
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(workshop)}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workshop._id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {workshops.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No workshops added yet. Create your first workshop above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
