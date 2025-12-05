"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function WorkshopsList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useTheme();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetch("/api/workshops");
        const data = await res.json();
        setWorkshops(data);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(workshops.map((w) => w.category))];

  // Filter workshops by category
  const filteredWorkshops =
    selectedCategory === "All"
      ? workshops
      : workshops.filter((w) => w.category === selectedCategory);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
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
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/20 via-purple-900/20 to-transparent py-20 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary">
            Our Workshops & Programs
          </h1>
          <p
            className="text-xl leading-relaxed"
            style={{ color: "var(--foreground)", opacity: 0.8 }}
          >
            Explore our comprehensive range of Mind Sciences and Classical Yoga
            programs designed to unlock your true potential and transform your
            life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1800+</div>
              <div
                className="text-sm mt-1"
                style={{ color: "var(--foreground)", opacity: 0.6 }}
              >
                Workshops Conducted
              </div>
            </div>
            <div
              className="w-px"
              style={{ backgroundColor: "var(--secondary)" }}
            ></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">200K+</div>
              <div
                className="text-sm mt-1"
                style={{ color: "var(--foreground)", opacity: 0.6 }}
              >
                Participants
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-[5%] py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(138,43,226,0.5)] scale-105"
                    : ""
                }`}
                style={
                  selectedCategory !== category
                    ? {
                        backgroundColor: "var(--secondary)",
                        color: "var(--foreground)",
                        border: "1px solid var(--secondary)",
                      }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>
          <div
            className="text-center mt-6"
            style={{ color: "var(--foreground)", opacity: 0.6 }}
          >
            Showing {filteredWorkshops.length} workshop
            {filteredWorkshops.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop, index) => (
            <motion.div
              key={workshop._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] hover:-translate-y-1"
              style={{
                backgroundColor: "var(--secondary)",
                border: "1px solid var(--secondary)",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/5 group-hover:to-purple-600/5 transition-all duration-300"></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-lg font-bold group-hover:text-primary transition-colors duration-300 leading-tight"
                    style={{ color: "var(--foreground)" }}
                  >
                    {workshop.title}
                  </h3>
                </div>

                {workshop.description && (
                  <p
                    className="mb-4 leading-relaxed text-sm"
                    style={{ color: "var(--foreground)", opacity: 0.6 }}
                  >
                    {workshop.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-4">
                  {workshop.category && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary border border-primary/30 rounded-full bg-primary/10">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {workshop.category}
                    </span>
                  )}

                  <Link
                    href={`/workshops/${workshop._id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-purple-400 transition-colors duration-300"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Workshops Found */}
        {!loading && filteredWorkshops.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p
              className="text-2xl mb-2"
              style={{ color: "var(--foreground)", opacity: 0.6 }}
            >
              No workshops found
            </p>
            <p style={{ color: "var(--foreground)", opacity: 0.5 }}>
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
