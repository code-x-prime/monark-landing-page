import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Monark FX - Master the Markets with Discipline & Strategy",
    template: "%s | Monark FX"
  },
  description: "Join Monark FX for structured forex education, expert mentorship, and a community focused on long-term trading success. No hype — just real skills. Professional trading education platform.",
  keywords: [
    "forex trading",
    "trading education",
    "forex education",
    "trading mentorship",
    "forex training",
    "professional trading",
    "trading community",
    "forex courses",
    "trading strategies",
    "Monark FX"
  ],
  authors: [{ name: "Monark FX" }],
  creator: "Monark FX",
  publisher: "Monark FX",
  metadataBase: new URL("https://monarkfx.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monarkfx.com",
    siteName: "Monark FX",
    title: "Monark FX - Master the Markets with Discipline & Strategy",
    description: "Join Monark FX for structured forex education, expert mentorship, and a community focused on long-term trading success. No hype — just real skills.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Monark FX - Professional Trading Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monark FX - Master the Markets with Discipline & Strategy",
    description: "Join Monark FX for structured forex education, expert mentorship, and a community focused on long-term trading success.",
    images: ["/og-image.jpg"],
    creator: "@monarkfx",
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
  verification: {
    google: "ag1Iza1649hS0a-56hUID2i8REiGVerKmH3ZxRLBhHM",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17830556034"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17830556034');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
