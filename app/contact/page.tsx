"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
    dates: "",
    persons: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Téléphone",
      value: "+221 75 749 75 68",
      href: "tel:+221757497568",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@salytourisme.sn",
      href: "mailto:contact@salytourisme.sn",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Adresse",
      value: "Saly Portudal, Thiès, Sénégal",
      href: "#",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Horaires",
      value: "Lun – Sam : 8h – 20h",
      href: "#",
    },
  ];

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
              Contact
            </span>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-3">
              Parlons de votre voyage
            </h1>
            <p className="text-ocean-300 text-lg max-w-lg">
              Notre équipe est là pour répondre à toutes vos questions et concevoir votre séjour idéal.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Contact info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-playfair font-bold text-xl text-ocean-900 mb-5">
                Nos coordonnées
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-ocean-100 text-ocean-500 flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-500 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-0.5">{info.label}</p>
                      <p className="text-sm font-medium text-ocean-800 group-hover:text-ocean-500 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/221757497568?text=Bonjour%20Saly%20Tourisme%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 text-white rounded-2xl p-5 hover:bg-green-400 transition-colors group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Discutons sur WhatsApp</p>
                <p className="text-green-100 text-sm">Réponse en moins de 2h</p>
              </div>
            </a>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-52 bg-ocean-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-ocean-400 mx-auto mb-2" />
                  <p className="text-ocean-500 font-medium text-sm">Saly Portudal</p>
                  <p className="text-ocean-400 text-xs">Thiès, Sénégal</p>
                  <a
                    href="https://maps.google.com/?q=Saly+Portudal+Senegal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs bg-ocean-500 text-white px-4 py-2 rounded-full hover:bg-ocean-600 transition-colors"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
                {/* Decorative map grid */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="border-b border-ocean-400" style={{ height: "12.5%" }} />
                  ))}
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 border-r border-ocean-400"
                      style={{ left: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-tropical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-tropical-500" />
                  </div>
                  <h3 className="font-playfair font-bold text-2xl text-ocean-900 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Notre équipe vous répondra dans les plus brefs délais (généralement sous 2h).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-ocean-500 font-semibold hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-1">
                    Demande de réservation
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Remplissez ce formulaire et nous vous contacterons pour finaliser votre séjour.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jean@email.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Téléphone (WhatsApp)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Type de séjour *
                        </label>
                        <select
                          name="type"
                          required
                          value={form.type}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all bg-white"
                        >
                          <option value="">Sélectionner...</option>
                          <option>Hébergement seul</option>
                          <option>Forfait tout compris</option>
                          <option>Activité / Excursion</option>
                          <option>Transfert aéroport</option>
                          <option>Sur-mesure</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Dates souhaitées
                        </label>
                        <input
                          type="text"
                          name="dates"
                          value={form.dates}
                          onChange={handleChange}
                          placeholder="Ex : 15 – 22 mars 2026"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Nombre de personnes
                        </label>
                        <select
                          name="persons"
                          value={form.persons}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all bg-white"
                        >
                          <option value="">Sélectionner...</option>
                          <option>1 personne</option>
                          <option>2 personnes</option>
                          <option>3 – 4 personnes</option>
                          <option>5 – 8 personnes</option>
                          <option>Groupe (9+)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Message / Demandes particulières
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Décrivez votre projet de voyage, vos envies, votre budget..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 transition-all resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <input type="checkbox" id="rgpd" required className="accent-ocean-500" />
                      <label htmlFor="rgpd">
                        J&apos;accepte la politique de confidentialité et le traitement de mes données.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-ocean-500 text-white font-semibold py-4 rounded-xl
                        hover:bg-ocean-600 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/30 active:scale-99"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer ma demande
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
