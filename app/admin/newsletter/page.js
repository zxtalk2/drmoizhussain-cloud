"use client";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await fetch(`/api/newsletter?id=${id}`, {
        method: "DELETE",
      });
      fetchSubscribers();
    } catch (error) {
      console.error("Failed to delete subscriber", error);
    }
  };

  const exportEmails = (format = "txt") => {
    try {
      const timestamp = new Date().toISOString().split("T")[0];
      let content, filename, mimeType;

      switch (format) {
        case "txt":
          content = subscribers.map((sub) => sub.email).join("\n");
          filename = `newsletter-subscribers-${timestamp}.txt`;
          mimeType = "text/plain;charset=utf-8";
          break;
        case "csv":
          const csvRows = subscribers.map((sub) => {
            const email = sub.email || "";
            const status = sub.subscribed ? "Active" : "Unsubscribed";
            const date = sub.createdAt
              ? new Date(sub.createdAt).toLocaleDateString()
              : "";
            return `${email},${status},${date}`;
          });
          content = "Email,Status,Subscribed Date\n" + csvRows.join("\n");
          filename = `newsletter-subscribers-${timestamp}.csv`;
          mimeType = "text/csv;charset=utf-8";
          break;
        case "json":
          content = JSON.stringify(subscribers, null, 2);
          filename = `newsletter-subscribers-${timestamp}.json`;
          mimeType = "application/json;charset=utf-8";
          break;
      }

      const blob = new Blob([content], { type: mimeType });
      saveAs(blob, filename);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export file. Please try again.");
    }
  };

  const copyAllEmails = () => {
    const emails = subscribers.map((sub) => sub.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("✅ All emails copied to clipboard!");
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-400">
            Total Subscribers:{" "}
            <span className="text-primary font-bold">{subscribers.length}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={copyAllEmails}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
          >
            📋 Copy All Emails
          </button>
          <div className="relative group">
            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors">
              📥 Export List ▼
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-secondary border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => exportEmails("txt")}
                className="block w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm"
              >
                📄 Text File (.txt)
              </button>
              <button
                onClick={() => exportEmails("csv")}
                className="block w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm border-t border-white/10"
              >
                � CSV File (.csv)
              </button>
              <button
                onClick={() => exportEmails("json")}
                className="block w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm border-t border-white/10"
              >
                📦 JSON File (.json)
              </button>
            </div>
          </div>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-xl border border-white/10">
          <p className="text-gray-400">No subscribers yet!</p>
        </div>
      ) : (
        <div className="bg-secondary rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Subscribed On
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {subscriber.subscribed ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(subscriber.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
