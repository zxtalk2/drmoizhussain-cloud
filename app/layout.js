import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://moizhussain.com"),
  title: {
    default: "Dr. Moiz Hussain | The Institute of Mind Sciences",
    template: "%s | Dr. Moiz Hussain",
  },
  description:
    "Transform your life with Dr. Moiz Hussain - The Institute of Mind Sciences. Expert workshops, personal consultations, and mind development programs. 45+ years of experience, 1800+ workshops, 200,000+ participants.",
  keywords: [
    "Dr. Moiz Hussain",
    "Mind Sciences",
    "Classical Yoga",
    "Personal Development",
    "Mental Health",
    "Meditation",
    "Self Improvement",
    "Life Coaching",
    "Karachi Pakistan",
    "Mind Power",
    "Spiritual Growth",
  ],
  authors: [{ name: "Dr. Moiz Hussain" }],
  creator: "Dr. Moiz Hussain",
  publisher: "The Institute of Mind Sciences",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moizhussain.com",
    siteName: "Dr. Moiz Hussain - The Institute of Mind Sciences",
    title: "Dr. Moiz Hussain | The Institute of Mind Sciences",
    description:
      "Transform your life with expert workshops and personal consultations. 45+ years experience in mind development and classical yoga.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Moiz Hussain - The Institute of Mind Sciences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Moiz Hussain | The Institute of Mind Sciences",
    description:
      "Transform your life with expert workshops and personal consultations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash of white on dark mode - runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
