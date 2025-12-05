import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import WorkshopsList from "../../components/WorkshopsList";

export const metadata = {
  title: "Workshops & Programs",
  description:
    "Join over 200,000 participants in our life-changing workshops. Topics include Mind Power, Hypnosis, Reiki, Classical Yoga, and leadership skills.",
  openGraph: {
    title: "Workshops | Dr. Moiz Hussain",
    description: "Transform your life with our expert-led workshops.",
    url: "https://moizhussain.com/workshops",
  },
};

export default async function WorkshopsPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />
      <WorkshopsList />
      <Footer />
    </div>
  );
}
