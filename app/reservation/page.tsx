"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, User, Mail, Phone, Calendar, Users,
  CreditCard, Shield, ArrowLeft, Sparkles, Clock, MapPin
} from "lucide-react";
import { hotels, activities, packages } from "@/lib/data";

// ── Types ──────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1 — Détails du séjour
  arrivalDate: string;
  departureDate: string;
  persons: string;
  roomType: string;
  // Step 2 — Vos coordonnées
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  // Step 3 — Paiement
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

// ── Step indicator ──────────────────────────────────────────────────────────────
function StepBar({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Séjour" },
    { n: 2, label: "Coordonnées" },
    { n: 3, label: "Paiement" },
    { n: 4, label: "Confirmation" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${current > s.n ? "bg-tropical-500 text-white" : current === s.n ? "bg-ocean-500 text-white ring-4 ring-ocean-100" : "bg-gray-100 text-gray-400"}`}>
              {current > s.n ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span className={`text-xs font-medium ${current === s.n ? "text-ocean-600" : "text-gray-400"}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 md:w-24 h-0.5 mb-4 mx-1 transition-all duration-500 ${current > s.n ? "bg-tropical-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Offer summary card ──────────────────────────────────────────────────────────
function OfferSummary({ type, id }: { type: string; id: string }) {
  let offer: { name: string; image: string; price: number; detail: string } | null = null;

  if (type === "hotel") {
    const h = hotels.find((h) => h.id === Number(id));
    if (h) offer = { name: h.name, image: h.image, price: h.price, detail: `${h.stars}★ · ${h.location}` };
  } else if (type === "activite") {
    const a = activities.find((a) => a.id === Number(id));
    if (a) offer = { name: a.name, image: a.image, price: a.price, detail: `${a.duration} · Par personne` };
  } else if (type === "forfait") {
    const p = packages.find((p) => p.id === Number(id));
    if (p) offer = { name: p.name, image: p.image, price: p.price, detail: `${p.duration} · ${p.persons}` };
  }

  if (!offer) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ocean-100 overflow-hidden">
      <div className="relative h-36">
        <Image src={offer.image} alt={offer.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-playfair font-bold text-sm leading-tight">{offer.name}</p>
          <p className="text-white/70 text-xs mt-0.5">{offer.detail}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Prix</p>
            <p className="font-playfair font-bold text-ocean-600 text-xl">{offer.price.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-gray-400">FCFA</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-xs text-tropical-600 bg-tropical-50 px-2 py-1 rounded-full">
              <Shield className="w-3 h-3" /> Paiement sécurisé
            </div>
            <div className="flex items-center gap-1 text-xs text-ocean-600 bg-ocean-50 px-2 py-1 rounded-full">
              <Check className="w-3 h-3" /> Annulation gratuite
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Séjour ──────────────────────────────────────────────────────────────
function Step1({ form, setForm, type }: { form: FormData; setForm: (f: FormData) => void; type: string }) {
  const isHotel = type === "hotel";
  const isActivite = type === "activite";

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
      <div>
        <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-1">Détails du séjour</h2>
        <p className="text-gray-500 text-sm">Choisissez vos dates et options</p>
      </div>

      {isHotel && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <div className="p-4">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Arrivée
              </label>
              <input type="date" value={form.arrivalDate} onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })}
                className="text-sm text-gray-700 w-full focus:outline-none" />
            </div>
            <div className="p-4">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Départ
              </label>
              <input type="date" value={form.departureDate} onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                className="text-sm text-gray-700 w-full focus:outline-none" />
            </div>
          </div>
        </div>
      )}

      {isActivite && (
        <div className="border border-gray-200 rounded-xl p-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Date souhaitée
          </label>
          <input type="date" value={form.arrivalDate} onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })}
            className="text-sm text-gray-700 w-full focus:outline-none" />
        </div>
      )}

      {!isActivite && (
        <div className="border border-gray-200 rounded-xl p-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Date de départ
          </label>
          <input type="date" value={form.arrivalDate} onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })}
            className="text-sm text-gray-700 w-full focus:outline-none" />
        </div>
      )}

      <div className="border border-gray-200 rounded-xl p-4">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" /> Nombre de participants
        </label>
        <select value={form.persons} onChange={(e) => setForm({ ...form, persons: e.target.value })}
          className="text-sm text-gray-700 w-full focus:outline-none bg-transparent">
          {["1 personne", "2 personnes", "3 personnes", "4 personnes", "5 personnes", "6+ personnes"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      {isHotel && (
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Type de chambre</label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: "standard", label: "Chambre Standard", desc: "Lit double, vue jardin", price: "+0 FCFA" },
              { value: "superieure", label: "Chambre Supérieure", desc: "Lit king, vue piscine", price: "+15 000 FCFA" },
              { value: "suite", label: "Suite Prestige", desc: "Suite avec salon et terrasse privée", price: "+45 000 FCFA" },
            ].map((room) => (
              <label key={room.value}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${form.roomType === room.value ? "border-ocean-500 bg-ocean-50" : "border-gray-200 hover:border-ocean-200"}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="room" value={room.value} checked={form.roomType === room.value}
                    onChange={(e) => setForm({ ...form, roomType: e.target.value })} className="accent-ocean-500" />
                  <div>
                    <p className="font-semibold text-sm text-ocean-900">{room.label}</p>
                    <p className="text-xs text-gray-400">{room.desc}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-ocean-600">{room.price}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Step 2: Coordonnées ─────────────────────────────────────────────────────────
function Step2({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
      <div>
        <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-1">Vos coordonnées</h2>
        <p className="text-gray-500 text-sm">Renseignez vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Prénom *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="Jean" required
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nom *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Dupont" required
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jean@email.com" required
            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Téléphone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+33 6 00 00 00 00"
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Pays</label>
          <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 bg-white">
            {["France", "Sénégal", "Belgique", "Maroc", "Côte d'Ivoire", "Espagne", "Royaume-Uni", "Autre"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Demandes spéciales</label>
        <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
          rows={3} placeholder="Chambre haute, lit bébé, régime alimentaire, anniversaire..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100 resize-none" />
      </div>
    </motion.div>
  );
}

// ── Step 3: Paiement ────────────────────────────────────────────────────────────
function Step3({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
      <div>
        <h2 className="font-playfair font-bold text-2xl text-ocean-900 mb-1">Paiement</h2>
        <p className="text-gray-500 text-sm">Choisissez votre mode de paiement</p>
      </div>

      {/* Payment methods */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "card", label: "Carte bancaire", icon: "💳" },
          { value: "orange", label: "Orange Money", icon: "🟠" },
          { value: "wave", label: "Wave", icon: "🌊" },
        ].map((pm) => (
          <label key={pm.value}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center
              ${form.paymentMethod === pm.value ? "border-ocean-500 bg-ocean-50" : "border-gray-200 hover:border-ocean-200"}`}>
            <input type="radio" name="payment" value={pm.value} checked={form.paymentMethod === pm.value}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="sr-only" />
            <span className="text-2xl">{pm.icon}</span>
            <span className="text-xs font-semibold text-ocean-900">{pm.label}</span>
          </label>
        ))}
      </div>

      {form.paymentMethod === "card" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Numéro de carte</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                placeholder="4242 4242 4242 4242" maxLength={19}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nom sur la carte</label>
            <input type="text" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })}
              placeholder="JEAN DUPONT"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Expiration</label>
              <input type="text" value={form.cardExpiry} onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                placeholder="MM/AA" maxLength={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">CVV</label>
              <input type="text" value={form.cardCvv} onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                placeholder="123" maxLength={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 focus:ring-2 focus:ring-ocean-100" />
            </div>
          </div>
        </motion.div>
      )}

      {(form.paymentMethod === "orange" || form.paymentMethod === "wave") && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-2xl mb-2">{form.paymentMethod === "orange" ? "🟠" : "🌊"}</p>
          <p className="font-semibold text-ocean-900 mb-1">
            {form.paymentMethod === "orange" ? "Orange Money" : "Wave"}
          </p>
          <p className="text-sm text-gray-500 mb-3">Vous recevrez un lien de paiement par SMS après confirmation.</p>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Numéro de téléphone</label>
            <input type="tel" placeholder="+221 77 000 00 00"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-400 bg-white text-center" />
          </div>
        </motion.div>
      )}

      <div className="bg-ocean-50 border border-ocean-100 rounded-xl p-4 flex items-center gap-3">
        <Shield className="w-5 h-5 text-ocean-500 flex-shrink-0" />
        <p className="text-xs text-ocean-600">
          Vos données de paiement sont chiffrées et sécurisées. Saly Tourisme ne stocke jamais vos informations bancaires.
        </p>
      </div>
    </motion.div>
  );
}

// ── Step 4: Confirmation ────────────────────────────────────────────────────────
function Step4({ form, type, id }: { form: FormData; type: string; id: string }) {
  const refNumber = `ST-${Date.now().toString(36).toUpperCase()}`;

  let offerName = "";
  if (type === "hotel") offerName = hotels.find((h) => h.id === Number(id))?.name || "";
  if (type === "activite") offerName = activities.find((a) => a.id === Number(id))?.name || "";
  if (type === "forfait") offerName = packages.find((p) => p.id === Number(id))?.name || "";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 bg-tropical-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-tropical-500/30"
      >
        <Check className="w-10 h-10 text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-sand-400" />
          <h2 className="font-playfair font-bold text-3xl text-ocean-900">Réservation confirmée !</h2>
          <Sparkles className="w-5 h-5 text-sand-400" />
        </div>
        <p className="text-gray-500 mb-6">
          Un email de confirmation a été envoyé à <strong>{form.email}</strong>
        </p>

        {/* Booking summary */}
        <div className="bg-white rounded-2xl border border-ocean-100 p-6 text-left max-w-md mx-auto mb-6 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Récapitulatif</p>
          <div className="space-y-2.5">
            {[
              { label: "Référence", value: refNumber },
              { label: "Offre", value: offerName },
              { label: "Voyageur", value: `${form.firstName} ${form.lastName}` },
              { label: "Date", value: form.arrivalDate || "À confirmer" },
              { label: "Participants", value: form.persons },
              { label: "Paiement", value: form.paymentMethod === "card" ? "Carte bancaire" : form.paymentMethod === "orange" ? "Orange Money" : "Wave" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-sm font-semibold text-ocean-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-ocean-50 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left">
          <p className="font-semibold text-ocean-900 text-sm mb-3">Prochaines étapes</p>
          <ul className="space-y-2">
            {[
              { icon: <Mail className="w-3.5 h-3.5" />, text: "Email de confirmation dans les 5 minutes" },
              { icon: <Phone className="w-3.5 h-3.5" />, text: "Notre équipe vous contacte sous 2h" },
              { icon: <Clock className="w-3.5 h-3.5" />, text: "Documents de voyage envoyés 48h avant" },
              { icon: <MapPin className="w-3.5 h-3.5" />, text: "Accueil à l'aéroport de Dakar (transfert inclus)" },
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-ocean-700">
                <span className="text-ocean-500">{step.icon}</span>{step.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center gap-2 justify-center bg-ocean-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-ocean-600 transition-colors">
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="flex items-center gap-2 justify-center border-2 border-ocean-200 text-ocean-600 font-semibold px-6 py-3 rounded-full hover:bg-ocean-50 transition-colors">
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────────
function ReservationContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "hotel";
  const id = searchParams.get("id") || "1";

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    arrivalDate: "", departureDate: "", persons: "2 personnes", roomType: "standard",
    firstName: "", lastName: "", email: "", phone: "", country: "France", specialRequests: "",
    paymentMethod: "card", cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "",
  });

  const canNext = () => {
    if (step === 1) return form.arrivalDate !== "";
    if (step === 2) return form.firstName !== "" && form.lastName !== "" && form.email !== "";
    if (step === 3) return form.paymentMethod !== "";
    return true;
  };

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as Step);
  };

  const backHref = type === "hotel" ? `/hebergements/${id}` : type === "activite" ? `/activites/${id}` : `/forfaits/${id}`;

  return (
    <div className="min-h-screen bg-[#f8f6f1] pt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        {step < 4 && (
          <div className="flex items-center gap-3 mb-8">
            <Link href={backHref} className="flex items-center gap-1.5 text-sm text-ocean-500 hover:text-ocean-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="font-playfair font-bold text-xl text-ocean-900">Réservation</h1>
          </div>
        )}

        {/* Step bar */}
        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && <Step1 key="1" form={form} setForm={setForm} type={type} />}
                {step === 2 && <Step2 key="2" form={form} setForm={setForm} />}
                {step === 3 && <Step3 key="3" form={form} setForm={setForm} />}
                {step === 4 && <Step4 key="4" form={form} type={type} id={id} />}
              </AnimatePresence>

              {step < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => step > 1 && setStep((step - 1) as Step)}
                    className={`flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-ocean-600 transition-colors ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Étape précédente
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canNext()}
                    className="flex items-center gap-2 bg-ocean-500 text-white font-bold px-7 py-3.5 rounded-full hover:bg-ocean-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  >
                    {step === 3 ? "Confirmer la réservation" : "Étape suivante"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          {step < 4 && (
            <div className="lg:col-span-1 space-y-4">
              <OfferSummary type={type} id={id} />

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <p className="font-semibold text-ocean-900 text-sm">Vos avantages</p>
                {[
                  { icon: <Shield className="w-3.5 h-3.5" />, text: "Annulation gratuite 48h avant" },
                  { icon: <Check className="w-3.5 h-3.5" />, text: "Confirmation immédiate" },
                  { icon: <Users className="w-3.5 h-3.5" />, text: "Assistance 24h/24 sur place" },
                  { icon: <CreditCard className="w-3.5 h-3.5" />, text: "Paiement 100% sécurisé" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-ocean-500">{a.icon}</span>{a.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f6f1] pt-16 flex items-center justify-center"><div className="text-ocean-500 font-playfair text-xl">Chargement...</div></div>}>
      <ReservationContent />
    </Suspense>
  );
}
