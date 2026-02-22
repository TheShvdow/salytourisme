"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Wallet, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const destinations = ["Saly Portudal", "Saly Nord", "Saly Centre", "Saly Est", "Saly Sud"];
const types = ["Hébergement", "Activité", "Forfait", "Transfert"];

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Route based on type
    const target = type === "Activité" ? "/activites" : type === "Forfait" ? "/forfaits" : "/hebergements";
    router.push(target);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-2xl shadow-ocean-900/20 p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2"
    >
      {/* Destination */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-1 cursor-pointer transition-all duration-200
          ${focused === "dest" ? "bg-ocean-50 ring-2 ring-ocean-300" : "hover:bg-gray-50"}`}
        onClick={() => setFocused("dest")}
      >
        <MapPin className="w-5 h-5 text-ocean-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ocean-600 mb-0.5">Destination</p>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setFocused("dest")}
            onBlur={() => setFocused(null)}
            className="w-full text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">Toutes les zones</option>
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Dates */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-1 cursor-pointer transition-all duration-200
          ${focused === "date" ? "bg-ocean-50 ring-2 ring-ocean-300" : "hover:bg-gray-50"}`}
      >
        <Calendar className="w-5 h-5 text-ocean-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ocean-600 mb-0.5">Dates</p>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            onFocus={() => setFocused("date")}
            onBlur={() => setFocused(null)}
            placeholder="Arrivée — Départ"
            className="w-full text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Budget */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-1 cursor-pointer transition-all duration-200
          ${focused === "budget" ? "bg-ocean-50 ring-2 ring-ocean-300" : "hover:bg-gray-50"}`}
      >
        <Wallet className="w-5 h-5 text-ocean-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ocean-600 mb-0.5">Budget</p>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            onFocus={() => setFocused("budget")}
            onBlur={() => setFocused(null)}
            className="w-full text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">Tous les budgets</option>
            <option value="eco">Économique (&lt; 50 000 FCFA)</option>
            <option value="mid">Milieu de gamme (50k – 120k)</option>
            <option value="lux">Luxe (&gt; 120 000 FCFA)</option>
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Type */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-1 cursor-pointer transition-all duration-200
          ${focused === "type" ? "bg-ocean-50 ring-2 ring-ocean-300" : "hover:bg-gray-50"}`}
      >
        <Search className="w-5 h-5 text-ocean-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ocean-600 mb-0.5">Type</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            onFocus={() => setFocused("type")}
            onBlur={() => setFocused(null)}
            className="w-full text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
          >
            <option value="">Tous</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-ocean-500 text-white font-semibold px-6 py-3.5 rounded-xl
          hover:bg-ocean-600 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/30 active:scale-95 flex-shrink-0"
      >
        <Search className="w-5 h-5" />
        <span className="hidden md:inline">Rechercher</span>
        <span className="md:hidden">Rechercher</span>
      </button>
    </form>
  );
}
