import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mariphil.net'),
  title: {
    default: "Mariphil Foundation Inc. - Transforming Lives in the Philippines",
    template: "%s | Mariphil Foundation Inc."
  },
  description: "Supporting children and communities across the Philippines through education, healthcare, and community development programs. Make a difference today.",
  keywords: ["NGO Philippines", "children's charity", "education Philippines", "healthcare programs", "community development", "Mariphil Foundation", "donate Philippines", "children's village", "Panabo charity"],
  authors: [{ name: "Mariphil Foundation Inc." }],
  creator: "Mariphil Foundation Inc.",
  publisher: "Mariphil Foundation Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariphil.net",
    siteName: "Mariphil Foundation Inc.",
    title: "Mariphil Foundation Inc. - Transforming Lives in the Philippines",
    description: "Supporting children and communities across the Philippines through education, healthcare, and community development programs.",
    images: [
      {
        url: "/images/mariphil-logo.png",
        width: 1200,
        height: 630,
        alt: "Mariphil Foundation Inc. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariphil Foundation Inc.",
    description: "Supporting children and communities across the Philippines",
    images: ["/images/mariphil-logo.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://mariphil.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${poppins.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}