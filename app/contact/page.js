import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dr. Moiz Hussain's Institute. Book an appointment, inquire about workshops, or visit us in Clifton, Karachi.",
  openGraph: {
    title: "Contact Us | Dr. Moiz Hussain",
    description: "Get in touch for appointments and inquiries.",
    url: "https://moizhussain.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />
      <div className="pt-20 flex-grow">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
