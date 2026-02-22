"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Waves } from "lucide-react";

const navLinks = [
  { href: "/hebergements", label: "Hébergements" },
  { href: "/activites", label: "Activités" },
  { href: "/forfaits", label: "Forfaits" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navBg =
    scrolled || !isHome
      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-ocean-100"
      : "bg-transparent";

  const textColor =
    scrolled || !isHome ? "text-ocean-900" : "text-white";

  const logoColor =
    scrolled || !isHome ? "text-ocean-600" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`transition-colors duration-300 ${scrolled || !isHome ? "text-ocean-500" : "text-sand-400"}`}>
            <Waves className="w-7 h-7" />
          </div>
          <span className={`font-playfair font-bold text-xl transition-colors duration-300 ${logoColor}`}>
            Saly Tourisme
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-opensans text-sm font-medium transition-all duration-200 hover:text-sand-400 relative group ${textColor}
                ${pathname === link.href ? "text-sand-400" : ""}`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-sand-400 transition-all duration-300 group-hover:w-full
                  ${pathname === link.href ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-200
              ${scrolled || !isHome
                ? "border-ocean-200 text-ocean-600 hover:bg-ocean-50"
                : "border-white/30 text-white hover:bg-white/10"
              }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang}
            <ChevronDown className="w-3 h-3" />
          </button>

          <Link
            href="/contact"
            className="bg-sand-400 text-ocean-900 font-opensans font-semibold text-sm px-5 py-2.5 rounded-full
              hover:bg-sand-500 transition-all duration-300 hover:shadow-md active:scale-95"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-white border-b border-ocean-100
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-xl font-medium text-ocean-800 transition-colors
                ${pathname === link.href
                  ? "bg-ocean-50 text-ocean-600 font-semibold"
                  : "hover:bg-gray-50"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full border border-ocean-200 text-ocean-600"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
            </button>
            <Link
              href="/contact"
              className="flex-1 text-center bg-sand-400 text-ocean-900 font-semibold text-sm px-5 py-2.5 rounded-full"
            >
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
