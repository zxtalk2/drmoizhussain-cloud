import Navbar from "../../components/Navbar";
import About from "../../components/About";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Dr. Moiz Hussain and The Institute of Mind Sciences. Over 38 years of dedication to mind development, classical yoga, and personal transformation.",
  openGraph: {
    title: "About Dr. Moiz Hussain | The Institute of Mind Sciences",
    description:
      "45+ years of expertise in mind development and classical yoga.",
    url: "https://moizhussain.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-[5%] py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            About The Institute
          </h1>
          <About />
          <div className="mt-20 max-w-4xl mx-auto text-gray-300 space-y-6 leading-relaxed">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p>
              The Institute of Mind Sciences and Classical Yoga is dedicated to
              the research and development of the human mind. Under the
              leadership of Dr. Moiz Hussain, we strive to provide the most
              advanced and effective techniques for personal development,
              healing, and self-realization.
            </p>
            <p>
              Our workshops and seminars are designed to empower individuals to
              take control of their lives, overcome limitations, and achieve
              their goals. Whether you are looking for stress management,
              emotional healing, or spiritual growth, we have a program for you.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
