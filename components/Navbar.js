"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

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

  const isDark = theme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-[5%] py-4 flex justify-between items-center z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl py-3 shadow-lg" : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              backgroundColor: isDark
                ? "rgba(0,0,0,0.7)"
                : "rgba(255,255,255,0.9)",
              borderBottom: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.1)",
            }
          : {}
      }
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
      <ul
        className="hidden lg:flex list-none gap-1 backdrop-blur-md rounded-full px-2 py-2"
        style={{
          backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full block ${
                pathname === item.path
                  ? "text-white bg-primary shadow-[0_0_20px_rgba(138,43,226,0.5)]"
                  : ""
              }`}
              style={
                pathname !== item.path
                  ? {
                      color: isDark ? "#d1d5db" : "#374151",
                    }
                  : {}
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-3">
        <ThemeToggle />
        <button className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105">
            Book Now
          </div>
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="lg:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300"
          style={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          }}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: "var(--foreground)" }}
            ></span>
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
              style={{ backgroundColor: "var(--foreground)" }}
            ></span>
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
              style={{ backgroundColor: "var(--foreground)" }}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 w-full backdrop-blur-xl transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: isDark
            ? "rgba(0,0,0,0.95)"
            : "rgba(255,255,255,0.95)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        }}
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
                    : ""
                }`}
                style={
                  pathname !== item.path
                    ? {
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.03)",
                        color: isDark ? "#d1d5db" : "#374151",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.1)",
                      }
                    : {}
                }
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
