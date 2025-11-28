"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I wanted to thank you and Urooj for such a wonderful course and would like to tell you that already things are going towards solving my problem for which I used the mirror method.",
      name: "Faryal Tariq",
      role: "Student",
      rating: 5,
    },
    {
      quote:
        "I felt my stomach and belly was relaxed.. 2nd day. While doing death meditation I felt so light, out of my body, and believe me right after that I was 90% fine. For me it is a miracle.",
      name: "Omer Afzal Khan",
      role: "Client",
      rating: 5,
    },
    {
      quote:
        "It's very true that dimension changes your life very short is that my mother's bank balance was zero in just one year she became a billionaire.",
      name: "SYED MOHIUDDIN HUSSAIN",
      role: "Client",
      rating: 5,
    },
    {
      quote:
        "I would like to share my story that my uncle to whom I was never talking because of genuine reason last 7 years, after watching your program I went to their house and volunteer to compromise with him.",
      name: "Gulerana",
      role: "Client",
      rating: 5,
    },
    {
      quote:
        "I have made a coin box in September 2019 for my friend's marriage and alhamdulillah on Aug 11 2020 she got married I'm so happy and thankful to Allah.",
      name: "Abdul rehman",
      role: "Client",
      rating: 5,
    },
    {
      quote:
        "You have been a consistent force in my life for many years. Sometimes I think it's been a lifetime. Respected Sir, you were always with me from the toughest days of my life to the joys of my success.",
      name: "Nida",
      role: "Student",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-[5%] bg-gradient-to-b from-black/50 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gradient">
            Client Success Stories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from those whose lives have been transformed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg
                  className="w-16 h-16 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.4)] group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white font-bold">
                    {client.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(client.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10">
                "{client.quote}"
              </p>

              {/* Author */}
              <div className="relative z-10">
                <p className="text-white font-semibold text-lg">
                  {client.name}
                </p>
                <p className="text-primary text-sm">{client.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
