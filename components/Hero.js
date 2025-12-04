import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative px-[5%] overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 z-10 pt-20"
      >
        <div className="inline-block px-4 py-2 mb-6 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Official Website
          </span>
        </div>
        <h1
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          Unlock Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            True Potential
          </span>
        </h1>
        <p
          className="text-xl mb-10 leading-relaxed max-w-lg opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          Expert consultation for personal and professional growth with Moiz
          Hussain. Discover the power of your mind.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(138,43,226,0.5)]"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border font-semibold rounded-full text-base transition-all duration-300 backdrop-blur-sm"
            style={{
              borderColor: "var(--foreground)",
              color: "var(--foreground)",
              opacity: 0.8,
            }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0">
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to left, transparent, var(--background))`,
          }}
        ></div>
        <Image
          src="/seminar-bg.png"
          alt="Seminar Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>
    </section>
  );
}
