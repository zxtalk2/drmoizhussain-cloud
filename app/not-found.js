"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/not-found-bg.png"
          alt="Page Not Found Background"
          fill
          className="object-cover opacity-80"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="backdrop-blur-md bg-black/30 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-purple-300 drop-shadow-[0_0_30px_rgba(138,43,226,0.6)] mb-4 font-serif"
          >
            404
          </motion.h1>

          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide drop-shadow-lg">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-200 mb-10 leading-relaxed font-light opacity-80 max-w-lg mx-auto">
            The path you are looking for has faded into the void. <br />
            Let us guide you back to the beginning.
          </p>

          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]"
          >
            <span className="relative z-10">Return to Homepage</span>
            <svg
              className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
