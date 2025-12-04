import Navbar from "../../components/Navbar";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Our Services & Workshops",
  description:
    "Explore our wide range of mind science workshops, personal consultations, and corporate training programs. Expert services in meditation, mind development, classical yoga, and personal transformation.",
  keywords: [
    "workshops",
    "mind science",
    "personal consultation",
    "corporate training",
    "meditation classes",
    "yoga training",
  ],
  openGraph: {
    title: "Services & Workshops | Dr. Moiz Hussain",
    description:
      "Professional mind development services and transformative workshops.",
    url: "https://moizhussain.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-[5%] py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Our Services & Workshops
          </h1>
          <p
            className="text-center max-w-2xl mx-auto mb-16 text-lg"
            style={{ color: "var(--foreground)", opacity: 0.7 }}
          >
            Explore our wide range of mind science workshops, personal
            consultations, and corporate training programs designed to unlock
            your true potential.
          </p>
          <Services />
        </div>
      </div>
      <Footer />
    </div>
  );
}
