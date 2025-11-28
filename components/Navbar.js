"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Workshops", path: "/workshops" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-[5%] py-4 flex justify-between items-center z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl py-3 border-b border-white/10 shadow-[0_8px_32px_rgba(138,43,226,0.15)]"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="group">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary tracking-wider">
              DR. MOIZ
            </div>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex list-none gap-1 bg-black/30 backdrop-blur-md rounded-full px-2 py-2 border border-white/10">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full block ${
                pathname === item.path
                  ? "text-white bg-primary shadow-[0_0_20px_rgba(138,43,226,0.5)]"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button className="hidden lg:block relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105">
          Book Now
        </div>
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
        aria-label="Toggle menu"
      >
        <div className="w-5 h-4 relative flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-6 px-[5%] gap-2">
          {navLinks.map((item, index) => (
            <li
              key={item.name}
              className={`transition-all duration-500 ${
                mobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Link
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 rounded-xl transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(138,43,226,0.5)]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
          <li
            className={`transition-all duration-500 ${
              mobileMenuOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: `${navLinks.length * 50}ms` }}
          >
            <button className="w-full px-6 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:scale-105 transition-all duration-300">
              Book Consultation
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
