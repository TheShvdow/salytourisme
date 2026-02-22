"use client";

import Link from "next/link";
import { Waves, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-white">
      {/* Wave top */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
            fill="#f8f6f1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="w-6 h-6 text-sand-400" />
              <span className="font-playfair font-bold text-xl">Saly Tourisme</span>
            </div>
            <p className="text-ocean-200 text-sm leading-relaxed mb-6">
              Votre agence de référence pour découvrir la perle balnéaire du Sénégal. Séjours inoubliables à Saly Portudal depuis 2018.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-ocean-700 hover:bg-ocean-600 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-ocean-700 hover:bg-ocean-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-ocean-700 hover:bg-ocean-600 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4 text-sand-300">Explorer</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/hebergements", label: "Hébergements" },
                { href: "/activites", label: "Activités & Excursions" },
                { href: "/forfaits", label: "Forfaits Séjours" },
                { href: "/contact", label: "Contact & Réservation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ocean-200 hover:text-sand-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4 text-sand-300">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-ocean-200">
                <MapPin className="w-4 h-4 mt-0.5 text-sand-400 flex-shrink-0" />
                Saly Portudal, Thiès, Sénégal
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ocean-200">
                <Phone className="w-4 h-4 text-sand-400 flex-shrink-0" />
                <a href="tel:+221757497568" className="hover:text-sand-400 transition-colors">
                  +221 75 749 75 68
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ocean-200">
                <Mail className="w-4 h-4 text-sand-400 flex-shrink-0" />
                <a href="mailto:contact@salytourisme.sn" className="hover:text-sand-400 transition-colors">
                  contact@salytourisme.sn
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4 text-sand-300">Newsletter</h3>
            <p className="text-ocean-200 text-sm mb-4">
              Recevez nos meilleures offres et actualités touristiques.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="bg-ocean-800 border border-ocean-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-ocean-400 focus:outline-none focus:border-sand-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-sand-400 text-ocean-900 font-semibold text-sm py-2.5 rounded-lg hover:bg-sand-500 transition-colors"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ocean-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ocean-400 text-sm">
            © 2026 Saly Tourisme. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-ocean-400">
            <Link href="#" className="hover:text-ocean-200 transition-colors">Politique de confidentialité</Link>
            <span>·</span>
            <Link href="#" className="hover:text-ocean-200 transition-colors">Mentions légales</Link>
            <span>·</span>
            <Link href="#" className="hover:text-ocean-200 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
