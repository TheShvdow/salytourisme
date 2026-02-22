"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ActivityCard from "@/components/ActivityCard";
import { activities } from "@/lib/data";

const CATEGORIES = [
  { key: "all", label: "Toutes" },
  { key: "nautique", label: "Nautique" },
  { key: "nature", label: "Nature" },
  { key: "culturel", label: "Culturel" },
  { key: "aventure", label: "Aventure" },
];

const DIFFICULTIES = ["Toutes", "facile", "modéré", "difficile"];

export default function ActivitesPage() {
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("Toutes");

  const filtered = activities.filter((a) => {
    const catOk = category === "all" || a.category === category;
    const diffOk = difficulty === "Toutes" || a.difficulty === difficulty;
    return catOk && diffOk;
  });

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-tropical-700 to-ocean-800 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-widest text-sand-300 uppercase mb-3 block">
              Activités & Excursions
            </span>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-3">
              Aventures inoubliables
            </h1>
            <p className="text-white/70 text-lg max-w-lg">
              Kitesurf, safari, pêche en mer, excursions culturelles — vivez Saly à 100%.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ocean-900">
              {filtered.length} activité{filtered.length > 1 ? "s" : ""}
            </h2>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  category === cat.key
                    ? "bg-tropical-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-tropical-50 hover:text-tropical-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-500 self-center mr-1">Difficulté :</span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                  difficulty === d
                    ? "bg-ocean-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-ocean-50 hover:text-ocean-600"
                }`}
              >
                {d === "Toutes" ? d : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Active filters */}
        {(category !== "all" || difficulty !== "Toutes") && (
          <div className="flex items-center gap-2 mb-6">
            {category !== "all" && (
              <span className="flex items-center gap-1 bg-tropical-100 text-tropical-700 text-xs font-medium px-3 py-1 rounded-full">
                {CATEGORIES.find((c) => c.key === category)?.label}
                <button onClick={() => setCategory("all")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {difficulty !== "Toutes" && (
              <span className="flex items-center gap-1 bg-ocean-100 text-ocean-700 text-xs font-medium px-3 py-1 rounded-full">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                <button onClick={() => setDifficulty("Toutes")}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucune activité ne correspond à vos critères.</p>
            <button
              onClick={() => { setCategory("all"); setDifficulty("Toutes"); }}
              className="mt-4 text-ocean-500 font-semibold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
