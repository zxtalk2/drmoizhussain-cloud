"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-12 md:py-24 px-4 md:px-[5%]"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left order-2 lg:order-1"
          >
            <div className="mb-4 md:mb-6">
              <span className="text-primary text-xs md:text-sm font-semibold tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-3 mb-4 md:mb-6 text-gradient">
                The Institute of Mind Sciences
              </h2>
            </div>
            <p
              className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              The Institute of Mind Sciences and Classical Yoga (TIMS) was a
              vision which was perceived in 1974 and achieved by Dr. Moiz
              Hussain in 1986. Specializing in two major fields, Mind Sciences
              and Classical Yoga, the institute has become a revolutionary
              ground for individuals to learn about these transformative
              practices.
            </p>
            <p
              className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Mind Sciences is a broad term used for a method, tool or technique
              which is used to enhance the functioning of the human mind. This
              practice allows an individual to use more than 3-4% of their
              mind's capability, similar to some of the world's greatest
              thinkers.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Dr. Moiz Hussain has successfully executed over 1800 workshops
              with more than 200,000 participants from all walks of life, both
              within and outside Pakistan. These workshops are conducted
              globally including India, UAE, UK, USA, and across the Middle
              East.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div
              className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.2)]"
              style={{ borderColor: "var(--secondary)", borderWidth: "1px" }}
            >
              <Image
                src="/about-experience.png"
                alt="Dr. Moiz Hussain"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            {/* Stats Overlay - Hidden on mobile */}
            <div className="hidden md:block absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-gradient-to-br from-primary to-purple-600 p-4 lg:p-6 rounded-2xl shadow-xl border border-white/10">
              <div className="text-white">
                <div className="text-3xl lg:text-4xl font-bold">45+</div>
                <div className="text-xs lg:text-sm text-white/80 mt-1">
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
