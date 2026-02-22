"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Check, Zap, Users, MapPin, ChevronRight } from "lucide-react";
import { activities } from "@/lib/data";

const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
  nautique: { label: "Nautique", color: "text-blue-700", bg: "bg-blue-100" },
  culturel: { label: "Culturel", color: "text-amber-700", bg: "bg-amber-100" },
  nature: { label: "Nature", color: "text-tropical-700", bg: "bg-tropical-100" },
  aventure: { label: "Aventure", color: "text-red-700", bg: "bg-red-100" },
};

const difficultyConfig: Record<string, { label: string; color: string; desc: string }> = {
  facile: { label: "Facile", color: "text-tropical-600", desc: "Accessible à tous, aucune condition physique particulière requise." },
  "modéré": { label: "Modéré", color: "text-amber-600", desc: "Bonne condition physique recommandée." },
  difficile: { label: "Difficile", color: "text-red-600", desc: "Expérience préalable requise." },
};

export default function ActivityDetailClient({ params }: { params: { id: string } }) {
  const activity = activities.find((a) => a.id === Number(params.id));
  if (!activity) notFound();

  const cat = categoryLabels[activity.category];
  const diff = difficultyConfig[activity.difficulty];
  const related = activities.filter((a) => a.id !== activity.id && a.category === activity.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px]">
        <Image src={activity.image} alt={activity.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <Link href="/activites" className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Activités
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-0 right-0 px-4 md:px-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${cat.bg} ${cat.color}`}>
                {cat.label}
              </span>
              <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-2">{activity.name}</h1>
              <div className="flex items-center gap-4 text-white/75 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{activity.duration}</span>
                <span className={`flex items-center gap-1 font-semibold ${diff.color}`}>
                  <Zap className="w-4 h-4" />{diff.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">Par personne</p>
              <p className="font-playfair font-bold text-3xl text-sand-400">{activity.price.toLocaleString("fr-FR")}</p>
              <p className="text-white/60 text-sm">FCFA</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Clock className="w-5 h-5" />, label: "Durée", value: activity.duration },
                { icon: <Zap className="w-5 h-5" />, label: "Difficulté", value: diff.label },
                { icon: <Users className="w-5 h-5" />, label: "Groupe", value: "2 – 12 pers." },
                { icon: <MapPin className="w-5 h-5" />, label: "Départ", value: "Saly Portudal" },
              ].map((info) => (
                <div key={info.label} className="flex flex-col items-center text-center gap-1 p-3 bg-ocean-50 rounded-xl">
                  <span className="text-ocean-500">{info.icon}</span>
                  <p className="text-xs text-gray-400">{info.label}</p>
                  <p className="font-semibold text-ocean-900 text-sm">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{activity.description}</p>
              <p className="text-gray-600 leading-relaxed">
                Toutes nos activités sont encadrées par des guides professionnels certifiés, avec le matériel le plus récent et les normes de sécurité les plus strictes. Nous veillons à ce que chaque participant reparte avec des souvenirs inoubliables.
              </p>
            </div>

            {/* Programme */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Programme détaillé</h2>
              <div className="space-y-4">
                {[
                  { time: "08:00", title: "Rendez-vous & accueil", desc: "Point de rencontre à Saly Portudal, briefing de sécurité et équipement." },
                  { time: "08:30", title: "Départ", desc: "Début de l'activité avec votre guide professionnel." },
                  { time: "12:00", title: "Pause déjeuner", desc: "Déjeuner inclus dans un cadre authentique." },
                  { time: "15:00", title: "Reprise & fin de l'activité", desc: "Conclusion et retour au point de départ." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-ocean-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      {i < 3 && <div className="w-0.5 h-full bg-ocean-100 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-bold text-ocean-400 mb-0.5">{step.time}</p>
                      <p className="font-semibold text-ocean-900 text-sm mb-1">{step.title}</p>
                      <p className="text-xs text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclus / Non inclus */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-playfair font-bold text-lg text-ocean-900 mb-3">Inclus</h3>
                  <ul className="space-y-2">
                    {activity.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-tropical-500 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg text-ocean-900 mb-3">Non inclus</h3>
                  <ul className="space-y-2">
                    {["Transport depuis votre hôtel", "Dépenses personnelles", "Pourboires (facultatifs)"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Niveau */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-3">Niveau requis</h2>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-3 ${cat.bg} ${cat.color}`}>
                <Zap className="w-4 h-4" />{diff.label}
              </div>
              <p className="text-gray-600 text-sm">{diff.desc}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-ocean-100"
              >
                <div className="text-center mb-5 pb-4 border-b border-gray-100">
                  <p className="text-gray-400 text-sm">Par personne</p>
                  <p className="font-playfair font-bold text-3xl text-ocean-600 mt-1">
                    {activity.price.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-gray-400 text-sm">FCFA</p>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="border border-gray-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Date souhaitée</p>
                    <input type="date" className="text-sm text-gray-700 w-full focus:outline-none" />
                  </div>
                  <div className="border border-gray-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Participants</p>
                    <select className="text-sm text-gray-700 w-full focus:outline-none bg-transparent">
                      {[1,2,3,4,5,6,7,8].map((n) => (
                        <option key={n}>{n} participant{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link
                  href={`/reservation?type=activite&id=${activity.id}`}
                  className="block w-full bg-tropical-500 text-white font-bold text-center py-4 rounded-xl hover:bg-tropical-600 transition-colors text-sm"
                >
                  Réserver cette activité
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">Annulation gratuite 24h avant</p>
              </motion.div>

              <div className="bg-ocean-50 rounded-2xl p-5 border border-ocean-100">
                <p className="font-semibold text-ocean-900 text-sm mb-1">Questions ?</p>
                <p className="text-xs text-ocean-600 mb-3">Contactez-nous pour plus d&apos;infos</p>
                <Link href="/contact" className="flex items-center justify-between text-ocean-500 font-semibold text-sm hover:text-ocean-700">
                  Nous contacter <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-6">Activités similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((a) => (
                <Link key={a.id} href={`/activites/${a.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-ocean-900 mb-1">{a.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><Clock className="w-3 h-3" />{a.duration}</p>
                    <p className="font-bold text-ocean-600 text-sm">{a.price.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
