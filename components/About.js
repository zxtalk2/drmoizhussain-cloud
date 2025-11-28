"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-[5%] bg-gradient-to-b from-background to-black/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="mb-6">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-gradient">
                The Institute of Mind Sciences
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-gray-300">
              The Institute of Mind Sciences and Classical Yoga (TIMS) was a
              vision which was perceived in 1974 and achieved by Dr. Moiz
              Hussain in 1986. Specializing in two major fields, Mind Sciences
              and Classical Yoga, the institute has become a revolutionary
              ground for individuals to learn about these transformative
              practices.
            </p>
            <p className="mb-6 leading-relaxed text-gray-300">
              Mind Sciences is a broad term used for a method, tool or technique
              which is used to enhance the functioning of the human mind. This
              practice allows an individual to use more than 3-4% of their
              mind's capability, similar to some of the world's greatest
              thinkers.
            </p>
            <p className="mb-8 leading-relaxed text-gray-300">
              Dr. Moiz Hussain has successfully executed over 1800 workshops
              with more than 200,000 participants from all walks of life, both
              within and outside Pakistan. These workshops are conducted
              globally including India, UAE, UK, USA, and across the Middle
              East.
            </p>
            <button className="group relative px-8 py-3 bg-primary text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)]">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(138,43,226,0.2)]">
              <Image
                src="/about-experience.png"
                alt="Dr. Moiz Hussain"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-primary to-purple-600 p-6 rounded-2xl shadow-xl border border-white/10">
              <div className="text-white">
                <div className="text-4xl font-bold">45+</div>
                <div className="text-sm text-white/80 mt-1">
                  Years of Excellence
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
