import Navbar from "../../components/Navbar";
import Gallery from "../../components/Gallery";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Photo & Video Gallery",
  description:
    "Explore moments from our workshops, seminars, and events. Witness the transformation and impact of The Institute of Mind Sciences.",
  openGraph: {
    title: "Gallery | Dr. Moiz Hussain",
    description: "Moments from workshops and seminars.",
    url: "https://moizhussain.com/gallery",
  },
};

export default function GalleryPage() {
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
        <Gallery />
      </div>
      <Footer />
    </div>
  );
}
