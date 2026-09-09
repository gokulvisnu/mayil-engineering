import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  themeColor: "#0b192c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.company.name} | Civil Construction & Infrastructure Contractor`,
    template: `%s | ${siteConfig.company.name}`,
  },
  description:
    "Leading civil construction and rural infrastructure contractor specializing in road construction, earthwork, excavation, drainage systems, culvert construction, and heavy equipment services in Tamil Nadu, India.",
  keywords: [

    "Civil construction contractor",
    "Rural road contractor",
    "Earthwork contractor",
    "Excavation contractor",
    "Drainage construction",
    "Road construction contractor",
    "Local infrastructure contractor",
    "Mayil Engineering",
    "Tamil Nadu civil contractor",
    "JCB rental and excavation",
    "RCC culvert construction",
  ],
  authors: [{ name: siteConfig.company.name }],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: `${siteConfig.company.name} | Civil Construction & Infrastructure`,
    description:
      "Reliable civil construction and infrastructure solutions for rural roads, drainage, culverts, earthwork, and equipment deployment.",
    url: "https://mayilengineering.com",
    siteName: siteConfig.company.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${siteConfig.company.name} Civil Construction & Infrastructure`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.company.name} | Civil & Infrastructure Works`,
    description:
      "Reliable civil construction and rural infrastructure solutions with a focus on durability, safety, and timely execution.",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80",
    ],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
