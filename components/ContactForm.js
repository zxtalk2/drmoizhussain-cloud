"use client";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-[5%] py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gradient">
            Contact Us
          </h1>
          <p
            style={{ color: "var(--foreground)", opacity: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Contact Information
            </h2>

            <div className="space-y-4">
              <div
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--secondary)",
                  border: "1px solid var(--secondary)",
                }}
              >
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Address
                  </h3>
                  <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
                    F-14/2A, Block-9 Clifton
                    <br />
                    Karachi-75500 Pakistan
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--secondary)",
                  border: "1px solid var(--secondary)",
                }}
              >
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Phone
                  </h3>
                  <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
                    +92-21-35836448-9
                  </p>
                  <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
                    +92345-8221111
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--secondary)",
                  border: "1px solid var(--secondary)",
                }}
              >
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0 mt-1"
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
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Email
                  </h3>
                  <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
                    info@moizhussain.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: "var(--secondary)",
              border: "1px solid var(--secondary)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--foreground)" }}
            >
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-4 rounded-lg focus:border-primary outline-none"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--secondary)",
                  color: "var(--foreground)",
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-4 rounded-lg focus:border-primary outline-none"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--secondary)",
                  color: "var(--foreground)",
                }}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-4 rounded-lg focus:border-primary outline-none"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--secondary)",
                  color: "var(--foreground)",
                }}
              ></textarea>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all duration-300 disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
