"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/lib/data";

const TYPES = [
  { key: "all", label: "Tous les forfaits" },
  { key: "romantique", label: "Romantique" },
  { key: "famille", label: "Famille" },
  { key: "aventure", label: "Aventure" },
  { key: "luxe", label: "Luxe" },
];

export default function ForfaitsPage() {
  const [type, setType] = useState("all");

  const filtered = packages.filter((p) => type === "all" || p.type === type);

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Header */}
      <div className="relative overflow-hidden bg-ocean-900 py-16">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sand-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ocean-600/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-widest text-sand-400 uppercase mb-3 block">
              Forfaits Séjours
            </span>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-3">
              Tout compris, rien à gérer
            </h1>
            <p className="text-ocean-300 text-lg max-w-lg">
              Vols, hébergement, activités, repas — nos forfaits incluent tout pour un séjour parfait à Saly.
            </p>
          </motion.div>

          {/* Type filter pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  type === t.key
                    ? "bg-sand-400 text-ocean-900"
                    : "bg-ocean-800 text-ocean-200 hover:bg-ocean-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Results count */}
        <p className="text-sm text-gray-500 mb-8">
          {filtered.length} forfait{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun forfait dans cette catégorie.</p>
            <button
              onClick={() => setType("all")}
              className="mt-4 text-ocean-500 font-semibold hover:underline"
            >
              Voir tous les forfaits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {filtered.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} featured={!!pkg.badge} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-ocean-900 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="font-playfair font-bold text-3xl text-white mb-3">
            Vous avez un besoin particulier ?
          </h2>
          <p className="text-ocean-300 mb-6 max-w-md mx-auto">
            Nous créons des forfaits sur-mesure adaptés à vos dates, votre budget et vos envies.
          </p>
          <a
            href="/contact"
            className="inline-block bg-sand-400 text-ocean-900 font-semibold px-8 py-3.5 rounded-full hover:bg-sand-500 transition-all"
          >
            Demander un forfait personnalisé
          </a>
        </motion.div>
      </div>
    </div>
  );
}
