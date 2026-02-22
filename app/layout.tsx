import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saly Tourisme — Séjours & Découvertes au Sénégal",
  description:
    "Agence de tourisme spécialisée dans les séjours balnéaires à Saly Portudal, Sénégal. Hôtels, excursions, transferts et forfaits tout compris.",
  keywords: "tourisme Saly, hôtel Saly Sénégal, vacances Saly Portudal, excursions Sénégal",
  openGraph: {
    title: "Saly Tourisme",
    description: "Votre agence de référence pour découvrir Saly Portudal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="font-opensans antialiased bg-[#f8f6f1] min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
