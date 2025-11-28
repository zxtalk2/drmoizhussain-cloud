"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Toaster, toast } from "react-hot-toast";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Testimonial submitted! Pending approval.");
        setFormData({ name: "", role: "", quote: "" });
        setShowForm(false);
      } else {
        toast.error("Failed to submit testimonial.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <Toaster position="bottom-right" />

      <main className="flex-grow pt-32 px-[5%] pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Success Stories
          </h1>
          <p className="text-[#888] max-w-2xl mx-auto mb-8">
            Read what our clients have to say about their transformative
            journeys.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 bg-primary text-white rounded font-semibold hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
          >
            {showForm ? "Close Form" : "Share Your Story"}
          </button>
        </motion.div>

        {/* Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#333]">
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Write a Testimonial
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#888] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded p-3 text-white focus:border-primary focus:outline-none transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#888] mb-2">
                        Role (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded p-3 text-white focus:border-primary focus:outline-none transition-colors"
                        placeholder="e.g. Student, Client"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#888] mb-2">
                      Your Story
                    </label>
                    <textarea
                      required
                      value={formData.quote}
                      onChange={(e) =>
                        setFormData({ ...formData, quote: e.target.value })
                      }
                      rows="4"
                      className="w-full bg-[#0a0a0a] border border-[#333] rounded p-3 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="How has your life changed?"
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-1/3 bg-[#333] text-white py-3 rounded font-semibold hover:bg-[#444] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 bg-primary text-white py-3 rounded font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] p-8 rounded-lg border border-[#333] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center text-primary font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t.name}</h4>
                  <p className="text-sm text-[#666]">{t.role}</p>
                </div>
              </div>
              <p className="text-[#ccc] italic leading-relaxed">"{t.quote}"</p>
            </motion.div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#666]">
              No testimonials yet. Be the first to share your story!
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
