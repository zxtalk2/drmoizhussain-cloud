"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatsAppButton() {
  const phoneNumber = "923008214704"; // Updated WhatsApp number

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-shadow"
    >
      <div className="relative w-8 h-8">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          fill
          className="object-contain"
        />
      </div>
    </motion.a>
  );
}
