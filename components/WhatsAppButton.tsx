"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "221757497568";
  const message = encodeURIComponent(
    "Bonjour Saly Tourisme ! Je souhaite obtenir plus d'informations sur vos offres."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulsing rings */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-20 scale-110" />

      {/* Button */}
      <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:bg-green-400 transition-all duration-300 hover:scale-110 active:scale-95">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-ocean-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap
        opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
        Discutons sur WhatsApp
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-ocean-900 rotate-45" />
      </div>
    </a>
  );
}
