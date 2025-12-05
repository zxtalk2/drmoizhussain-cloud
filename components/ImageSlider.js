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
          // Show first slide immediately
          setSlides([data[0]]);
          setLoading(false);

          // Load remaining slides in background
          if (data.length > 1) {
            setTimeout(() => {
              setSlides(data);
            }, 100);
          }
        } else {
          // Fallback to default images if no data
          const fallbackSlides = images.map((url, index) => ({
            imageUrl: url,
            title: "Unlock Your True Potential",
            description:
              "Expert consultation for personal and professional growth with Dr. Moiz Hussain. Discover the power of your mind.",
          }));

          // Show first fallback slide immediately
          setSlides([fallbackSlides[0]]);
          setLoading(false);

          // Load remaining fallback slides
          if (fallbackSlides.length > 1) {
            setTimeout(() => {
              setSlides(fallbackSlides);
            }, 100);
          }
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
        // Fallback on error
        const fallbackSlides = images.map((url, index) => ({
          imageUrl: url,
          title: "Unlock Your True Potential",
          description:
            "Expert consultation for personal and professional growth with Dr. Moiz Hussain. Discover the power of your mind.",
        }));

        // Show first fallback slide immediately
        setSlides([fallbackSlides[0]]);
        setLoading(false);

        // Load remaining fallback slides
        if (fallbackSlides.length > 1) {
          setTimeout(() => {
            setSlides(fallbackSlides);
          }, 100);
        }
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
    return (
      <div
        className="h-screen w-full flex flex-col items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
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
