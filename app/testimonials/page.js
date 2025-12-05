import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import TestimonialsList from "../../components/TestimonialsList";

export const metadata = {
  title: "Success Stories & Testimonials",
  description:
    "Read inspiring stories from individuals who have transformed their lives through our Mind Sciences workshops and Classical Yoga.",
  openGraph: {
    title: "Testimonials | Dr. Moiz Hussain",
    description: "Real stories of transformation.",
    url: "https://moizhussain.com/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />
      <TestimonialsList />
      <Footer />
    </div>
  );
}
