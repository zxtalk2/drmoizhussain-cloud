import Navbar from "../../components/Navbar";
import Gallery from "../../components/Gallery";
import Footer from "../../components/Footer";

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
