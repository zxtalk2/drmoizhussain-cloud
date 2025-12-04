"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function WorkshopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await fetch("/api/workshops");
        const workshops = await res.json();
        const found = workshops.find((w) => w._id === params.id);

        if (found) {
          setWorkshop(found);
        } else {
          router.push("/workshops");
        }
      } catch (error) {
        console.error("Failed to fetch workshop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [params.id, router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workshop) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />

      <div className="pt-32 pb-20 px-[5%]">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors mb-8"
            style={{ color: "var(--foreground)", opacity: 0.7 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Workshops
          </Link>

          {/* Workshop Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              {workshop.category && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {workshop.category}
                </span>
              )}
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {workshop.title}
            </h1>
          </div>

          {/* Workshop Content */}
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--secondary)",
              border: "1px solid var(--secondary)",
            }}
          >
            <div className="prose max-w-none">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                About This Workshop
              </h2>
              <p
                className="text-lg leading-relaxed whitespace-pre-line"
                style={{ color: "var(--foreground)", opacity: 0.8 }}
              >
                {workshop.description ||
                  "No detailed description available for this workshop."}
              </p>

              {workshop.link && (
                <div
                  className="mt-8 pt-8"
                  style={{ borderTop: "1px solid var(--secondary)" }}
                >
                  <a
                    href={workshop.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all duration-300"
                  >
                    Visit External Workshop Page
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl p-8 border border-primary/30">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Interested in This Workshop?
            </h3>
            <p
              className="mb-6"
              style={{ color: "var(--foreground)", opacity: 0.8 }}
            >
              Contact us to learn more about upcoming sessions or to book this
              workshop for your organization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] transition-all duration-300"
            >
              Contact Us
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
