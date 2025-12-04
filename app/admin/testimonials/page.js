"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
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

  // Pagination calculations
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
          <p className="text-gray-400 mt-1">
            Review and manage customer testimonials
          </p>
        </div>
        <div className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/10 text-sm">
          Total:{" "}
          <span className="text-primary font-bold">{testimonials.length}</span>
        </div>
      </div>

      {testimonials.length === 0 ? (
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-gray-400">No testimonials found.</p>
        </div>
      ) : (
        <>
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#111] border-b border-white/10">
                  <tr>
                    <th className="p-4 text-gray-400 font-medium text-sm">
                      Name
                    </th>
                    <th className="p-4 text-gray-400 font-medium text-sm">
                      Role
                    </th>
                    <th className="p-4 text-gray-400 font-medium text-sm">
                      Message
                    </th>
                    <th className="p-4 text-gray-400 font-medium text-sm">
                      Status
                    </th>
                    <th className="p-4 text-gray-400 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentTestimonials.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-semibold text-white">{t.name}</td>
                      <td className="p-4 text-gray-400">{t.role}</td>
                      <td
                        className="p-4 text-gray-400 max-w-md truncate"
                        title={t.quote}
                      >
                        {t.quote}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            t.isApproved
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {t.isApproved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {!t.isApproved && (
                            <button
                              onClick={() => handleStatusChange(t._id, true)}
                              className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-sm font-medium transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {t.isApproved && (
                            <button
                              onClick={() => handleStatusChange(t._id, false)}
                              className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 text-sm font-medium transition-colors"
                            >
                              Hide
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1}-
                {Math.min(endIndex, testimonials.length)} of{" "}
                {testimonials.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/10 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-[#1a1a1a] border border-white/10 hover:bg-white/5"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/10 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
