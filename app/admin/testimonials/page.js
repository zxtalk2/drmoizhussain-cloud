"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: newStatus }),
      });

      if (res.ok) {
        toast.success(
          newStatus ? "Testimonial Approved" : "Testimonial Hidden"
        );
        fetchTestimonials();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Testimonial deleted");
        fetchTestimonials();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting testimonial");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Manage Testimonials
      </h1>

      <div className="bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#111] border-b border-[#333]">
            <tr>
              <th className="p-4 text-[#888] font-medium">Name</th>
              <th className="p-4 text-[#888] font-medium">Role</th>
              <th className="p-4 text-[#888] font-medium">Message</th>
              <th className="p-4 text-[#888] font-medium">Status</th>
              <th className="p-4 text-[#888] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {testimonials.map((t) => (
              <tr key={t._id} className="hover:bg-[#222] transition-colors">
                <td className="p-4 font-semibold">{t.name}</td>
                <td className="p-4 text-[#ccc]">{t.role}</td>
                <td
                  className="p-4 text-[#ccc] max-w-md truncate"
                  title={t.quote}
                >
                  {t.quote}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.isApproved
                        ? "bg-green-900 text-green-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {t.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {!t.isApproved && (
                    <button
                      onClick={() => handleStatusChange(t._id, true)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Approve
                    </button>
                  )}
                  {t.isApproved && (
                    <button
                      onClick={() => handleStatusChange(t._id, false)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                    >
                      Hide
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[#666]">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
