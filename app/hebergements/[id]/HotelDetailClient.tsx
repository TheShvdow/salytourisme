"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Check, ArrowLeft, Wifi, Coffee, Waves, ChevronRight, Users, Clock } from "lucide-react";
import { hotels } from "@/lib/data";

const amenityIcons: Record<string, React.ReactNode> = {
  "Piscine": <Waves className="w-4 h-4" />,
  "WiFi": <Wifi className="w-4 h-4" />,
  "Restaurant": <Coffee className="w-4 h-4" />,
};

export default function HotelDetailClient({ params }: { params: { id: string } }) {
  const hotel = hotels.find((h) => h.id === Number(params.id));
  if (!hotel) notFound();

  const related = hotels.filter((h) => h.id !== hotel.id && h.stars >= hotel.stars - 1).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <Link href="/hebergements" className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Hébergements
        </Link>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-0 right-0 px-4 md:px-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {hotel.type === "hotel" ? "Hôtel" : hotel.type === "residence" ? "Résidence" : "Villa"}
                </span>
                <div className="flex">
                  {Array.from({ length: hotel.stars }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sand-400 text-sand-400" />
                  ))}
                </div>
              </div>
              <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />{hotel.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">À partir de</p>
              <p className="font-playfair font-bold text-3xl text-sand-400">{hotel.price.toLocaleString("fr-FR")}</p>
              <p className="text-white/60 text-sm">FCFA / nuit</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Rating bar */}
            <div className="bg-white rounded-2xl p-5 flex items-center gap-6 shadow-sm">
              <div className="text-center">
                <p className="font-playfair font-bold text-4xl text-ocean-600">{hotel.rating}</p>
                <div className="flex justify-center my-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? "fill-sand-400 text-sand-400" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-400">{hotel.reviews} avis</p>
              </div>
              <div className="flex-1 border-l border-gray-100 pl-6">
                {[
                  { label: "Emplacement", value: 4.8 },
                  { label: "Propreté", value: 4.7 },
                  { label: "Services", value: hotel.rating },
                  { label: "Rapport qualité/prix", value: 4.5 },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs text-gray-500 w-36">{r.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sand-400 rounded-full" style={{ width: `${(r.value / 5) * 100}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-6">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{hotel.description}</p>
              <p className="text-gray-600 leading-relaxed">
                Situé au cœur de Saly Portudal, cet établissement bénéficie d&apos;un emplacement privilégié à quelques pas des plages de sable fin. Le personnel bilingue est à votre disposition 24h/24 pour rendre votre séjour inoubliable. Que vous soyez en voyage d&apos;affaires ou en vacances, vous trouverez ici le confort et le service auxquels vous aspirez.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Équipements & Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 p-3 bg-ocean-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-ocean-100 text-ocean-500 flex items-center justify-center flex-shrink-0">
                      {amenityIcons[amenity] || <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-medium text-ocean-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery grid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Galerie Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
                  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80",
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
                  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
                  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80",
                  hotel.image,
                ].map((img, i) => (
                  <div key={i} className="relative h-28 rounded-xl overflow-hidden group cursor-pointer">
                    <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Avis clients</h2>
              <div className="space-y-4">
                {[
                  { name: "Marie D.", country: "France", rating: 5, comment: "Séjour parfait, personnel adorable et cadre magnifique. La piscine à débordement est sublime!", date: "Janvier 2026" },
                  { name: "Amadou S.", country: "Sénégal", rating: 5, comment: "Excellent rapport qualité/prix. Cuisine locale délicieuse et chambre très confortable.", date: "Décembre 2025" },
                  { name: "Sarah K.", country: "UK", rating: 4, comment: "Beautiful hotel, great location. The beach access is perfect. Will definitely come back!", date: "Novembre 2025" },
                ].map((avis, i) => (
                  <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-ocean-100 text-ocean-600 font-bold flex items-center justify-center text-sm">
                          {avis.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-ocean-900">{avis.name}</p>
                          <p className="text-xs text-gray-400">{avis.country} · {avis.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: avis.rating }, (_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-sand-400 text-sand-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">&ldquo;{avis.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Booking card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-ocean-100"
              >
                <div className="text-center mb-5 pb-4 border-b border-gray-100">
                  <p className="text-gray-400 text-sm">Nuit à partir de</p>
                  <p className="font-playfair font-bold text-3xl text-ocean-600 mt-1">
                    {hotel.price.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-gray-400 text-sm">FCFA</p>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                      <div className="p-3">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Arrivée</p>
                        <input type="date" className="text-sm text-gray-700 w-full focus:outline-none" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Départ</p>
                        <input type="date" className="text-sm text-gray-700 w-full focus:outline-none" />
                      </div>
                    </div>
                    <div className="border-t border-gray-200 p-3">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Voyageurs</p>
                      <select className="text-sm text-gray-700 w-full focus:outline-none bg-transparent">
                        <option>1 adulte</option>
                        <option>2 adultes</option>
                        <option>2 adultes + 1 enfant</option>
                        <option>2 adultes + 2 enfants</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/reservation?type=hotel&id=${hotel.id}`}
                  className="block w-full bg-ocean-500 text-white font-bold text-center py-4 rounded-xl hover:bg-ocean-600 transition-colors text-sm"
                >
                  Réserver maintenant
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">Annulation gratuite avant 48h</p>

                <div className="mt-4 space-y-2">
                  {[
                    { icon: <Users className="w-3.5 h-3.5" />, text: "Capacité : 2 personnes / chambre" },
                    { icon: <Clock className="w-3.5 h-3.5" />, text: "Check-in : 14h00 · Check-out : 12h00" },
                    { icon: <Check className="w-3.5 h-3.5" />, text: "Petit-déjeuner inclus" },
                  ].map((info, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-ocean-400">{info.icon}</span>
                      {info.text}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Need help */}
              <div className="bg-ocean-50 rounded-2xl p-5 border border-ocean-100">
                <p className="font-semibold text-ocean-900 text-sm mb-1">Besoin d&apos;aide ?</p>
                <p className="text-xs text-ocean-600 mb-3">Notre équipe répond en moins de 2h</p>
                <Link href="/contact" className="flex items-center justify-between text-ocean-500 font-semibold text-sm hover:text-ocean-700">
                  Nous contacter <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related hotels */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-6">Hôtels similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((h) => (
                <Link key={h.id} href={`/hebergements/${h.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={h.image} alt={h.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-ocean-900 mb-1">{h.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" />{h.location}</p>
                    <p className="font-bold text-ocean-600 text-sm">{h.price.toLocaleString("fr-FR")} FCFA<span className="font-normal text-gray-400">/nuit</span></p>
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
