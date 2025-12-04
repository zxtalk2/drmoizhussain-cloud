"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, currentStatus) => {
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentStatus }),
      });
      toast.success(currentStatus ? "Marked as unread" : "Marked as read");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to update contact");
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      toast.success("Message deleted");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

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
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-gray-400 mt-1">Manage incoming contact requests</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/10">
            Total:{" "}
            <span className="text-primary font-bold">{contacts.length}</span>
          </span>
          <span className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/30">
            Unread:{" "}
            <span className="text-primary font-bold">
              {contacts.filter((c) => !c.read).length}
            </span>
          </span>
        </div>
      </div>

      {contacts.length === 0 ? (
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                contact.read
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-primary/5 border-primary/30"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">
                      {contact.name}
                    </h3>
                    {!contact.read && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{contact.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(contact._id, contact.read)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      contact.read
                        ? "bg-white/5 text-gray-400 hover:bg-white/10"
                        : "bg-primary text-white hover:bg-primary/80"
                    }`}
                  >
                    {contact.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-[#111] p-4 rounded-xl">
                <p className="text-gray-300 whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
