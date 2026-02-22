"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Headphones,
  Award,
  Star,
  ChevronRight,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import ActivityCard from "@/components/ActivityCard";
import PackageCard from "@/components/PackageCard";
import { hotels, activities, packages, testimonials } from "@/lib/data";

// ── Parallax Hero ──────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90"
          alt="Plage de Saly"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/40 via-ocean-900/30 to-ocean-900/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-16"
      >
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-sand-400 animate-pulse" />
          Saly Portudal, Sénégal · L&apos;Atlantique à vos pieds
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl"
        >
          Vivez le{" "}
          <span className="text-sand-400 italic">paradis</span>
          <br />
          sénégalais
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Hôtels de charme, excursions inoubliables et forfaits tout compris à
          Saly Portudal — la station balnéaire prisée du Sénégal.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <SearchBar />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-8 mt-10 text-white/70 text-sm"
        >
          {[
            { value: "200+", label: "Hébergements" },
            { value: "50+", label: "Activités" },
            { value: "5k+", label: "Voyageurs satisfaits" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-playfair font-bold text-2xl text-white">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ── Why Us ────────────────────────────────────────────────────────────────────
function WhyUs() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Réservation Sécurisée",
      desc: "Paiement sécurisé et confirmation instantanée. Vos données sont protégées.",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Assistance 24h/24",
      desc: "Notre équipe est disponible à toute heure pour vous accompagner sur place.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Meilleur Prix Garanti",
      desc: "Nous nous alignons sur tout tarif inférieur trouvé pour une offre identique.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Avis Vérifiés",
      desc: "Plus de 5 000 avis certifiés de voyageurs ayant séjourné à Saly.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl hover:bg-ocean-50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-ocean-100 text-ocean-500 flex items-center justify-center group-hover:bg-ocean-500 group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="font-playfair font-semibold text-ocean-900 text-sm md:text-base">
                {f.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({
  tag,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  tag: string;
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
      <div>
        <span className="text-xs font-bold tracking-widest text-ocean-400 uppercase mb-2 block">
          {tag}
        </span>
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-ocean-900 mb-2">{title}</h2>
        <p className="text-gray-500 max-w-md">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-2 text-ocean-500 font-semibold text-sm hover:gap-3 transition-all group"
      >
        {linkLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-20 bg-ocean-900 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-ocean-700/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean-700/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-sand-400 uppercase mb-2 block">
            Témoignages
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-3">
            Ce que disent nos voyageurs
          </h2>
          <p className="text-ocean-300 max-w-md mx-auto">
            Des milliers de voyageurs nous font confiance chaque année pour leurs séjours à Saly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ocean-800/60 backdrop-blur-sm border border-ocean-700 rounded-2xl p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star key={j} className="w-4 h-4 fill-sand-400 text-sand-400" />
                ))}
              </div>
              <p className="text-ocean-100 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-ocean-400 text-xs">{t.country} · {t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ─────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
            alt="Saly coucher de soleil"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 via-ocean-900/70 to-transparent" />

          <div className="relative px-8 md:px-16 py-16 max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-widest text-sand-400 uppercase mb-3 block">
                Offre spéciale
              </span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
                Planifiez votre escapade dès maintenant
              </h2>
              <p className="text-white/75 mb-8 leading-relaxed">
                Contactez notre équipe pour un devis personnalisé et bénéficiez de tarifs
                préférentiels sur votre prochain séjour à Saly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="bg-sand-400 text-ocean-900 font-semibold px-6 py-3.5 rounded-full hover:bg-sand-500 transition-all text-center active:scale-95"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/forfaits"
                  className="border-2 border-white/40 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  Voir les forfaits <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const featuredHotels = hotels.filter((h) => h.featured);
  const featuredActivities = activities.filter((a) => a.featured);
  const featuredPackages = packages.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <WhyUs />

      {/* Hotels section */}
      <section className="py-20 bg-[#f8f6f1]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            tag="Hébergements"
            title="Les hôtels incontournables"
            subtitle="De l'hôtel familial au resort de luxe, nous sélectionnons les meilleurs établissements de Saly."
            href="/hebergements"
            linkLabel="Voir tous les hébergements"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            tag="Activités"
            title="Découvertes & aventures"
            subtitle="Pêche, safari, kitesurf, excursions — Saly regorge d'expériences uniques."
            href="/activites"
            linkLabel="Toutes les activités"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredActivities.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages section */}
      <section className="py-20 bg-[#f8f6f1]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            tag="Forfaits"
            title="Séjours tout compris"
            subtitle="Des packages soigneusement conçus pour chaque type de voyage."
            href="/forfaits"
            linkLabel="Tous les forfaits"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} featured={pkg.featured} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTABanner />
    </>
  );
}
