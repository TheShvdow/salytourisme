"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Star } from "lucide-react";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/lib/data";

const TYPES = ["Tous", "Hôtel", "Résidence", "Villa"];
const BUDGETS = [
  { label: "Tous les budgets", min: 0, max: Infinity },
  { label: "Moins de 60 000 FCFA", min: 0, max: 60000 },
  { label: "60 000 – 120 000 FCFA", min: 60000, max: 120000 },
  { label: "Plus de 120 000 FCFA", min: 120000, max: Infinity },
];

export default function HebergementsPage() {
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [minStars, setMinStars] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const budget = BUDGETS[selectedBudget];

  const filtered = hotels.filter((h) => {
    const typeOk =
      selectedType === "Tous" ||
      (selectedType === "Hôtel" && h.type === "hotel") ||
      (selectedType === "Résidence" && h.type === "residence") ||
      (selectedType === "Villa" && h.type === "villa");
    const budgetOk = h.price >= budget.min && h.price <= budget.max;
    const starsOk = h.stars >= minStars;
    return typeOk && budgetOk && starsOk;
  });

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Header */}
      <div className="bg-ocean-900 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-widest text-sand-400 uppercase mb-3 block">
              Hébergements
            </span>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-3">
              Trouvez votre havre de paix
            </h1>
            <p className="text-ocean-300 text-lg max-w-lg">
              Hôtels, résidences et villas — sélectionnés pour leur qualité et leur emplacement à Saly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Filter bar — LeBonCoin style */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ocean-900">
              {filtered.length} hébergement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-ocean-600 border border-ocean-200 px-3 py-1.5 rounded-full hover:bg-ocean-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </button>
          </div>

          {/* Quick type filters */}
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedType === type
                    ? "bg-ocean-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-ocean-50 hover:text-ocean-600"
                }`}
              >
                {type}
              </button>
            ))}
            <div className="w-px bg-gray-200 mx-1" />
            {/* Stars filter */}
            {[0, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setMinStars(s)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1 ${
                  minStars === s
                    ? "bg-sand-400 text-ocean-900 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-sand-50 hover:text-sand-600"
                }`}
              >
                {s === 0 ? "Toutes étoiles" : (
                  <>
                    <Star className="w-3 h-3 fill-current" /> {s}+
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget par nuit</h3>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b, i) => (
                  <button
                    key={b.label}
                    onClick={() => setSelectedBudget(i)}
                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      selectedBudget === i
                        ? "bg-tropical-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-tropical-50 hover:text-tropical-600"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Active filters summary */}
        {(selectedType !== "Tous" || selectedBudget !== 0 || minStars > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Filtres actifs :</span>
            {selectedType !== "Tous" && (
              <span className="flex items-center gap-1 bg-ocean-100 text-ocean-700 text-xs font-medium px-3 py-1 rounded-full">
                {selectedType}
                <button onClick={() => setSelectedType("Tous")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedBudget !== 0 && (
              <span className="flex items-center gap-1 bg-tropical-100 text-tropical-700 text-xs font-medium px-3 py-1 rounded-full">
                {BUDGETS[selectedBudget].label}
                <button onClick={() => setSelectedBudget(0)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {minStars > 0 && (
              <span className="flex items-center gap-1 bg-sand-100 text-sand-700 text-xs font-medium px-3 py-1 rounded-full">
                {minStars}+ étoiles
                <button onClick={() => setMinStars(0)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun hébergement ne correspond à vos critères.</p>
            <button
              onClick={() => { setSelectedType("Tous"); setSelectedBudget(0); setMinStars(0); }}
              className="mt-4 text-ocean-500 font-semibold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
