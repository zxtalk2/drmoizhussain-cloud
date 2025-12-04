"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
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
      id="gallery"
      className="py-24 px-[5%]"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Watch & Learn
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gradient">
            Video Gallery
          </h2>
          <p
            className="max-w-2xl mx-auto opacity-70"
            style={{ color: "var(--foreground)" }}
          >
            Explore our collection of transformative workshops and seminars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="aspect-video bg-black relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(138,43,226,0.3)] group-hover:border-primary/50 transition-all duration-500">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title || "YouTube video"}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {video.title && (
                <div className="mt-4">
                  <h3
                    className="text-lg font-semibold group-hover:text-primary transition-colors duration-300"
                    style={{ color: "var(--foreground)" }}
                  >
                    {video.title}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
