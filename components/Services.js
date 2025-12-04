"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-24 px-[5%] text-center">
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="services"
      className="py-24 px-[5%]"
      style={{ backgroundColor: "var(--secondary)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: "var(--background)",
                borderWidth: "1px",
                borderColor: "var(--secondary)",
              }}
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-600/0 to-primary/0 group-hover:from-primary/10 group-hover:via-purple-600/10 group-hover:to-primary/10 transition-all duration-500"></div>

              {/* Floating icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative z-10">
                <h3
                  className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all duration-300"
                  style={{ color: "var(--foreground)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="leading-relaxed opacity-70"
                  style={{ color: "var(--foreground)" }}
                >
                  {service.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="relative z-10 mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-semibold">Learn More</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
