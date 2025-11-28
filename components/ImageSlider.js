"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const images = [
  "https://moizhussain.com/wp-content/uploads/2019/03/experience-image.png",
  "https://moizhussain.com/wp-content/uploads/2020/01/2.jpg",
  "https://moizhussain.com/wp-content/uploads/2020/01/3.jpg",
  "https://moizhussain.com/wp-content/uploads/2020/01/4.jpg",
  "https://moizhussain.com/wp-content/uploads/2020/01/5.jpg",
  "https://moizhussain.com/wp-content/uploads/2020/01/6.jpg",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slider");
        const data = await res.json();
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          // Fallback to default images if no data
          setSlides(
            images.map((url, index) => ({
              imageUrl: url,
              title: "Unlock Your True Potential",
              description:
                "Expert consultation for personal and professional growth with Dr. Moiz Hussain. Discover the power of your mind.",
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
        // Fallback on error
        setSlides(
          images.map((url, index) => ({
            imageUrl: url,
            title: "Unlock Your True Potential",
            description:
              "Expert consultation for personal and professional growth with Dr. Moiz Hussain. Discover the power of your mind.",
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (loading) {
    return <div className="h-screen w-full bg-black" />;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex]?.imageUrl}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center px-[5%] z-10">
        <motion.div
          key={currentIndex} // Re-animate text on slide change
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-2 mb-6 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Official Website
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            {slides[currentIndex]?.title}
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
            {slides[currentIndex]?.description}
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(138,43,226,0.5)]"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
