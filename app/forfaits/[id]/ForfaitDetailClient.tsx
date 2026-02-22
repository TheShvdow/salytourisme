"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, ArrowLeft, Check, Star, Sparkles, ChevronRight, Calendar, Shield } from "lucide-react";
import { packages } from "@/lib/data";

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  romantique: { label: "Romantique", color: "text-pink-700", bg: "bg-pink-50" },
  famille: { label: "Famille", color: "text-blue-700", bg: "bg-blue-50" },
  aventure: { label: "Aventure", color: "text-tropical-700", bg: "bg-tropical-50" },
  luxe: { label: "Luxe", color: "text-sand-700", bg: "bg-sand-50" },
};

export default function ForfaitDetailClient({ params }: { params: { id: string } }) {
  const pkg = packages.find((p) => p.id === Number(params.id));
  if (!pkg) notFound();

  const typeConf = typeConfig[pkg.type];
  const related = packages.filter((p) => p.id !== pkg.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px]">
        <Image src={pkg.image} alt={pkg.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <Link href="/forfaits" className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Forfaits
        </Link>

        {pkg.badge && (
          <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-sand-400 text-ocean-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />{pkg.badge}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-0 right-0 px-4 md:px-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${typeConf.bg} ${typeConf.color}`}>
                {typeConf.label}
              </span>
              <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-3">{pkg.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/75 text-sm">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{pkg.duration}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{pkg.persons}</span>
              </div>
            </div>
            <div className="text-right bg-black/30 backdrop-blur-sm rounded-2xl px-5 py-3">
              <p className="text-white/60 text-sm">À partir de</p>
              <p className="font-playfair font-bold text-4xl text-sand-400">{pkg.price.toLocaleString("fr-FR")}</p>
              <p className="text-white/60 text-sm">FCFA / {pkg.persons.toLowerCase()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats */}
            <div className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-3 gap-4 text-center">
              {[
                { icon: <Clock className="w-5 h-5" />, label: "Durée", value: pkg.duration },
                { icon: <Users className="w-5 h-5" />, label: "Pour", value: pkg.persons },
                { icon: <Star className="w-5 h-5" />, label: "Standing", value: "5 étoiles" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 p-3 bg-ocean-50 rounded-xl">
                  <span className="text-ocean-500">{s.icon}</span>
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="font-semibold text-ocean-900 text-sm">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Présentation du forfait</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{pkg.description}</p>
              <p className="text-gray-600 leading-relaxed">
                Nos équipes ont soigneusement sélectionné chaque prestation pour vous offrir la meilleure expérience possible à Saly. Ce forfait inclut un accompagnement personnalisé de nos conseillers voyage, disponibles 24h/24 pendant toute la durée de votre séjour.
              </p>
            </div>

            {/* Programme jour par jour */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-5">Programme indicatif</h2>
              <div className="space-y-3">
                {[
                  { jour: "Jour 1", title: "Arrivée & Installation", desc: "Accueil VIP à l'aéroport, transfert en véhicule climatisé, check-in à l'hôtel, dîner de bienvenue." },
                  { jour: "Jours 2-3", title: "Découverte & Détente", desc: "Journées libres entre plage et piscine, spa, activités nautiques au choix." },
                  { jour: "Jour 4", title: "Excursion", desc: "Excursion d'une journée (delta du Saloum ou safari selon forfait), pique-nique en pleine nature." },
                  { jour: "Jours 5-6", title: "Activités & Gastronomie", desc: "Cours de cuisine sénégalaise, visite de marché local, soirée musicale traditionnelle." },
                  { jour: "Dernier jour", title: "Départ", desc: "Dernier petit-déjeuner, check-out, transfert aéroport avec nos meilleurs souvenirs." },
                ].map((day, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-ocean-50 transition-colors">
                    <div className="flex-shrink-0 w-20">
                      <span className="text-xs font-bold text-ocean-500 bg-ocean-100 px-2 py-1 rounded-lg">{day.jour}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-ocean-900 text-sm mb-1">{day.title}</p>
                      <p className="text-xs text-gray-500">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ce qui est inclus */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-4">Ce qui est inclus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3 bg-tropical-50 rounded-xl">
                    <Check className="w-4 h-4 text-tropical-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-ocean-900 text-sm mb-2">Non inclus</h3>
                <ul className="space-y-1">
                  {["Visa (selon nationalité)", "Assurance voyage", "Dépenses personnelles", "Activités optionnelles"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Garanties */}
            <div className="bg-ocean-900 rounded-2xl p-6 text-white">
              <h2 className="font-playfair font-bold text-xl mb-4">Nos garanties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, title: "Annulation gratuite", desc: "Remboursement intégral jusqu'à 7 jours avant le départ" },
                  { icon: <Star className="w-5 h-5" />, title: "Meilleur prix", desc: "Nous égalons tout tarif identique trouvé ailleurs" },
                  { icon: <Users className="w-5 h-5" />, title: "Assistance 24h/24", desc: "Votre conseiller dédié disponible pendant tout le séjour" },
                ].map((g) => (
                  <div key={g.title} className="flex flex-col gap-2 p-4 bg-ocean-800 rounded-xl">
                    <span className="text-sand-400">{g.icon}</span>
                    <p className="font-semibold text-sm">{g.title}</p>
                    <p className="text-ocean-300 text-xs">{g.desc}</p>
                  </div>
                ))}
              </div>
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
                {pkg.badge && (
                  <div className="flex items-center gap-1.5 justify-center bg-sand-50 border border-sand-200 rounded-xl py-2 mb-4 text-xs font-bold text-sand-600">
                    <Sparkles className="w-3.5 h-3.5" />{pkg.badge}
                  </div>
                )}

                <div className="text-center mb-5 pb-4 border-b border-gray-100">
                  <p className="text-gray-400 text-sm">À partir de</p>
                  <p className="font-playfair font-bold text-4xl text-ocean-600 mt-1">
                    {pkg.price.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-gray-400 text-sm">FCFA / {pkg.persons.toLowerCase()}</p>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="border border-gray-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date de départ
                    </p>
                    <input type="date" className="text-sm text-gray-700 w-full focus:outline-none" />
                  </div>
                  <div className="border border-gray-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Nombre de voyageurs</p>
                    <select className="text-sm text-gray-700 w-full focus:outline-none bg-transparent">
                      <option>1 personne</option>
                      <option>2 personnes</option>
                      <option>3 personnes</option>
                      <option>4+ personnes</option>
                    </select>
                  </div>
                </div>

                <div className="bg-ocean-50 rounded-xl p-3 mb-4 text-center">
                  <p className="text-xs text-ocean-600 font-medium">
                    Total estimé : <span className="font-bold text-ocean-800 text-lg">{pkg.price.toLocaleString("fr-FR")} FCFA</span>
                  </p>
                </div>

                <Link
                  href={`/reservation?type=forfait&id=${pkg.id}`}
                  className="block w-full bg-sand-400 text-ocean-900 font-bold text-center py-4 rounded-xl hover:bg-sand-500 transition-colors text-sm mb-2"
                >
                  Réserver ce forfait
                </Link>
                <Link
                  href="/contact"
                  className="block w-full border-2 border-ocean-200 text-ocean-600 font-semibold text-center py-3 rounded-xl hover:bg-ocean-50 transition-colors text-sm"
                >
                  Demander un devis
                </Link>

                <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> Annulation gratuite · Paiement sécurisé
                </p>
              </motion.div>

              <div className="bg-ocean-50 rounded-2xl p-5 border border-ocean-100">
                <p className="font-semibold text-ocean-900 text-sm mb-1">Forfait sur-mesure ?</p>
                <p className="text-xs text-ocean-600 mb-3">Nous adaptons ce séjour à vos envies et votre budget</p>
                <Link href="/contact" className="flex items-center justify-between text-ocean-500 font-semibold text-sm hover:text-ocean-700">
                  Personnaliser <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Forfaits similaires */}
        <div className="mt-12">
          <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-6">Autres forfaits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.id} href={`/forfaits/${p.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-playfair font-semibold text-ocean-900 mb-2">{p.name}</h3>
                  <p className="font-bold text-ocean-600 text-sm">{p.price.toLocaleString("fr-FR")} FCFA</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
