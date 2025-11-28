"use client";
import { useState, useEffect } from "react";

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
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
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
      fetchContacts();
    } catch (error) {
      console.error("Failed to update contact", error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact", error);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <div className="text-sm text-gray-400">
          Total: {contacts.length} | Unread:{" "}
          {contacts.filter((c) => !c.read).length}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20 bg-secondary rounded-xl border border-white/10">
          <p className="text-gray-400 text-lg">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                contact.read
                  ? "bg-secondary border-white/10"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {contact.name}
                  </h3>
                  <p className="text-gray-400">{contact.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(contact._id, contact.read)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      contact.read
                        ? "bg-white/10 text-gray-400 hover:bg-white/20"
                        : "bg-primary text-white hover:bg-primary-hover"
                    }`}
                  >
                    {contact.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
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
