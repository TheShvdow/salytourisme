"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { Activity } from "@/lib/data";

interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  nautique: { label: "Nautique", color: "bg-blue-100 text-blue-700" },
  culturel: { label: "Culturel", color: "bg-amber-100 text-amber-700" },
  nature: { label: "Nature", color: "bg-tropical-100 text-tropical-700" },
  aventure: { label: "Aventure", color: "bg-red-100 text-red-700" },
};

const difficultyColors: Record<string, string> = {
  facile: "text-tropical-600",
  "modéré": "text-amber-600",
  difficile: "text-red-600",
};

export default function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  const cat = categoryLabels[activity.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ocean-500/10 transition-shadow duration-300 group"
    >
      <Link href={`/activites/${activity.id}`} className="block relative h-48 overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color}`}>
          {cat.label}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/activites/${activity.id}`}>
          <h3 className="font-playfair font-semibold text-ocean-900 text-lg leading-tight mb-2 hover:text-ocean-600 transition-colors">
            {activity.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{activity.duration}</span>
          <span className={`flex items-center gap-1 font-medium ${difficultyColors[activity.difficulty]}`}>
            <Zap className="w-3.5 h-3.5" />
            {activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1)}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{activity.description}</p>

        <ul className="space-y-1 mb-4">
          {activity.includes.slice(0, 2).map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
              <Check className="w-3 h-3 text-tropical-500 flex-shrink-0" />{item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Par personne</p>
            <p className="font-playfair font-bold text-ocean-600 text-lg">
              {activity.price.toLocaleString("fr-FR")}{" "}
              <span className="text-sm font-opensans font-normal text-gray-500">FCFA</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/activites/${activity.id}`} className="border border-tropical-300 text-tropical-600 text-sm font-semibold px-3 py-2 rounded-full hover:bg-tropical-50 transition-colors">
              Détails
            </Link>
            <Link href={`/reservation?type=activite&id=${activity.id}`} className="bg-tropical-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-tropical-600 transition-colors active:scale-95">
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
