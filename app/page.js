"use client";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import Link from "next/link";

export default function Home() {
  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "The Institute of Mind Sciences",
    alternateName: "Dr. Moiz Hussain Institute",
    url: "https://moizhussain.com",
    logo: "https://moizhussain.com/logo.png",
    description:
      "Transform your life with expert workshops and personal consultations in mind sciences and classical yoga.",
    founder: {
      "@type": "Person",
      name: "Dr. Moiz Hussain",
      jobTitle: "Founder & Mind Sciences Expert",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "F-14/2A, Block-9 Clifton",
      addressLocality: "Karachi",
      postalCode: "75500",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-21-35836448",
      contactType: "customer service",
      email: "info@moizhussain.com",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    sameAs: [
      "https://www.facebook.com/drmoizhussain",
      "https://www.youtube.com/@drmoizhussain",
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div
        className="flex flex-col min-h-screen overflow-x-hidden"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <Navbar />
        <ImageSlider />
        <WhatsAppButton />

        <div className="relative pb-10">
          <About />
          <div className="flex justify-center mt-1">
            <Link
              href="/about"
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Read More About Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <Services />
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <Link
              href="/services"
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="relative">
          <Gallery />
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <Link
              href="/gallery"
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>

        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
