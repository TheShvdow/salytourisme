"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Package } from "@/lib/data";

interface PackageCardProps {
  pkg: Package;
  index?: number;
  featured?: boolean;
}

export default function PackageCard({ pkg, index = 0, featured = false }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-ocean-500/15 transition-all duration-300 group relative
        ${featured ? "ring-2 ring-sand-400" : ""}`}
    >
      {/* Featured badge */}
      {pkg.badge && (
        <div className={`absolute top-4 right-4 z-10 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-md
          ${pkg.badge === "Luxe"
            ? "bg-gradient-to-r from-sand-400 to-sand-500 text-ocean-900"
            : pkg.badge === "Best-seller"
            ? "bg-ocean-500 text-white"
            : "bg-tropical-500 text-white"
          }`}>
          <Sparkles className="w-3 h-3" />
          {pkg.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3 text-white/80 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {pkg.persons}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-playfair font-bold text-ocean-900 text-xl mb-2 leading-tight">
          {pkg.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Includes */}
        <div className="grid grid-cols-1 gap-1.5 mb-5">
          {pkg.includes.slice(0, 4).map((item) => (
            <div key={item} className="flex items-start gap-2 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 text-tropical-500 flex-shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
          {pkg.includes.length > 4 && (
            <p className="text-xs text-ocean-400 pl-5">
              + {pkg.includes.length - 4} autres prestations incluses
            </p>
          )}
        </div>

        {/* Price + CTA */}
        <div className={`flex items-center justify-between pt-4 border-t border-gray-100`}>
          <div>
            <p className="text-xs text-gray-400">À partir de</p>
            <p className="font-playfair font-bold text-ocean-600 text-xl">
              {pkg.price.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-gray-400">FCFA / {pkg.persons.toLowerCase()}</p>
          </div>
          <Link
            href="/contact"
            className={`font-semibold text-sm px-5 py-3 rounded-full transition-all duration-300 active:scale-95
              ${featured
                ? "bg-sand-400 text-ocean-900 hover:bg-sand-500 shadow-md"
                : "bg-ocean-500 text-white hover:bg-ocean-600"
              }`}
          >
            Découvrir
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
