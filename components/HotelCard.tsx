"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";
import type { Hotel } from "@/lib/data";

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

export default function HotelCard({ hotel, index = 0 }: HotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ocean-500/10 transition-shadow duration-300 group"
    >
      <Link href={`/hebergements/${hotel.id}`} className="block relative h-52 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-ocean-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          {Array.from({ length: hotel.stars }, (_, i) => (
            <span key={i} className="text-sand-400">★</span>
          ))}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-ocean-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
          {hotel.type === "hotel" ? "Hôtel" : hotel.type === "residence" ? "Résidence" : "Villa"}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/hebergements/${hotel.id}`}>
          <h3 className="font-playfair font-semibold text-ocean-900 text-lg leading-tight hover:text-ocean-600 transition-colors mb-1">
            {hotel.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-ocean-500 text-xs mb-2">
          <MapPin className="w-3 h-3" />
          {hotel.location}
        </div>

        <StarRating rating={hotel.rating} />
        <p className="text-xs text-gray-400 mt-0.5 mb-3">({hotel.reviews} avis)</p>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {hotel.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-ocean-50 text-ocean-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-2.5 h-2.5" /> {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-400 px-2 py-0.5">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">À partir de</p>
            <p className="font-playfair font-bold text-ocean-600 text-lg">
              {hotel.price.toLocaleString("fr-FR")} <span className="text-sm font-opensans font-normal text-gray-500">FCFA/nuit</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/hebergements/${hotel.id}`} className="border border-ocean-300 text-ocean-600 text-sm font-semibold px-3 py-2 rounded-full hover:bg-ocean-50 transition-colors">
              Détails
            </Link>
            <Link href={`/reservation?type=hotel&id=${hotel.id}`} className="bg-ocean-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-ocean-600 transition-colors active:scale-95">
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
