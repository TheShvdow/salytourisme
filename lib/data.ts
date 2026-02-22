export type Hotel = {
  id: number;
  name: string;
  type: "hotel" | "residence" | "villa";
  stars: number;
  price: number;
  image: string;
  location: string;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
};

export type Activity = {
  id: number;
  name: string;
  category: "nautique" | "culturel" | "nature" | "aventure";
  price: number;
  image: string;
  duration: string;
  description: string;
  includes: string[];
  difficulty: "facile" | "modéré" | "difficile";
  featured?: boolean;
};

export type Package = {
  id: number;
  name: string;
  type: "romantique" | "famille" | "aventure" | "luxe";
  price: number;
  image: string;
  duration: string;
  description: string;
  includes: string[];
  persons: string;
  featured?: boolean;
  badge?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
};

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hôtel Les Filaos",
    type: "hotel",
    stars: 4,
    price: 85000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    location: "Saly Portudal",
    description:
      "Niché au cœur de Saly entre cocotiers et filaos, cet hôtel de charme offre un accès direct à une plage de sable blanc immaculée. Architecture sénégalaise authentique et service de qualité supérieure.",
    amenities: ["Piscine", "Spa", "Restaurant", "Bar", "WiFi", "Plage privée"],
    rating: 4.7,
    reviews: 234,
    featured: true,
  },
  {
    id: 2,
    name: "Royal Saly Resort",
    type: "hotel",
    stars: 5,
    price: 145000,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    location: "Saly Nord",
    description:
      "Le fleuron de l'hôtellerie à Saly. Suites panoramiques face à l'Atlantique, gastronomie internationale et spa de luxe. Une expérience hors du commun pour les voyageurs exigeants.",
    amenities: ["Piscine infinity", "Spa premium", "3 restaurants", "Tennis", "Plongée", "Concierge"],
    rating: 4.9,
    reviews: 189,
    featured: true,
  },
  {
    id: 3,
    name: "Lamantin Beach Hotel",
    type: "hotel",
    stars: 5,
    price: 165000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    location: "Saly Centre",
    description:
      "Hôtel iconique de l'Afrique de l'Ouest, le Lamantin allie architecture coloniale et confort moderne. Ses jardins luxuriants s'étendent jusqu'à la mer dans un écrin de verdure tropicale.",
    amenities: ["2 piscines", "Spa", "Golf 9 trous", "4 restaurants", "Plage", "Animation"],
    rating: 4.8,
    reviews: 412,
    featured: true,
  },
  {
    id: 4,
    name: "Résidence Saly Bay",
    type: "residence",
    stars: 3,
    price: 55000,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    location: "Saly Est",
    description:
      "Résidence idéale pour les familles et les longs séjours. Appartements spacieux avec cuisine équipée, à 200m de la plage. Calme et authenticité assurés.",
    amenities: ["Cuisine équipée", "Piscine", "Gardiennage", "Parking", "WiFi"],
    rating: 4.3,
    reviews: 98,
  },
  {
    id: 5,
    name: "Villa Baobab",
    type: "villa",
    stars: 4,
    price: 120000,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    location: "Saly Portudal",
    description:
      "Villa privée avec jardin tropical et piscine, idéale pour les groupes. 4 chambres climatisées, personnel de maison inclus, 500m de la plage de Saly.",
    amenities: ["Piscine privée", "Chef cuisinier", "Jardin tropical", "Voiture avec chauffeur", "WiFi"],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 6,
    name: "Lodge Ocean Bleu",
    type: "hotel",
    stars: 3,
    price: 42000,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    location: "Saly Sud",
    description:
      "Petit lodge accueillant dans une ambiance familiale chaleureuse. Chambres confortables, cuisine locale excellente et guides touristiques disponibles à toute heure.",
    amenities: ["Restaurant local", "Guide touristique", "Location de vélos", "WiFi", "Terrasse"],
    rating: 4.2,
    reviews: 143,
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    name: "Pêche Sportive en Mer",
    category: "nautique",
    price: 45000,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    duration: "Journée (8h)",
    description:
      "Embarquez sur un bateau de pêche traditionnel piroguer et partez à la conquête des eaux de l'Atlantique. Barracudas, thons et dorades — le large vous réserve de belles surprises.",
    includes: ["Guide professionnel", "Matériel de pêche", "Déjeuner bord", "Boissons"],
    difficulty: "modéré",
    featured: true,
  },
  {
    id: 2,
    name: "Excursion Îles du Saloum",
    category: "nature",
    price: 35000,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    duration: "1 journée",
    description:
      "Découvrez le Delta du Saloum, classé au patrimoine mondial de l'UNESCO. Mangroves, oiseaux migrateurs et villages de pêcheurs authentiques dans un décor de rêve.",
    includes: ["Transport en pirogue", "Guide ornithologue", "Déjeuner dans un village", "Masques et tuba"],
    difficulty: "facile",
    featured: true,
  },
  {
    id: 3,
    name: "Safari Parc de Bandia",
    category: "nature",
    price: 28000,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    duration: "Demi-journée (5h)",
    description:
      "À 35 km de Saly, le Parc de Bandia abrite rhinocéros, girafes, zèbres et buffles dans un écrin naturel de 3500 hectares. Safari en 4x4 avec guide expert.",
    includes: ["Transport aller-retour", "Guide safari", "4x4 tout-terrain", "Photos souvenirs"],
    difficulty: "facile",
    featured: true,
  },
  {
    id: 4,
    name: "Kitesurf à Saly",
    category: "nautique",
    price: 32000,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    duration: "3 heures",
    description:
      "Les vents constants de Saly en font un paradis pour les amateurs de kitesurf. Cours pour débutants ou sessions libres pour confirmés avec instructeurs certifiés.",
    includes: ["Matériel complet", "Instructeur certifié", "Assurance", "Photos/vidéos"],
    difficulty: "modéré",
  },
  {
    id: 5,
    name: "Visite Culturelle Dakar",
    category: "culturel",
    price: 22000,
    image: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
    duration: "Journée",
    description:
      "Découvrez Dakar, ville aux mille visages. Île de Gorée, marché Sandaga, monuments historiques et gastronomie locale — une immersion dans la culture sénégalaise.",
    includes: ["Transport climatisé", "Guide bilingue", "Entrées monuments", "Déjeuner"],
    difficulty: "facile",
  },
  {
    id: 6,
    name: "Quad & 4x4 en Brousse",
    category: "aventure",
    price: 38000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    duration: "4 heures",
    description:
      "Explorez les pistes sauvages autour de Saly en quad ou 4x4. Villages traditionnels, marigots et paysages de savane — une aventure inoubliable hors des sentiers battus.",
    includes: ["Quad ou 4x4", "Casque et équipement", "Guide local", "Jus de fruits frais"],
    difficulty: "modéré",
  },
];

export const packages: Package[] = [
  {
    id: 1,
    name: "Séjour Romantique 7 Nuits",
    type: "romantique",
    price: 890000,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    duration: "7 nuits / 8 jours",
    persons: "2 personnes",
    description:
      "Offrez-vous une escapade inoubliable avec votre partenaire. Chambre vue mer, dîner aux chandelles sur la plage, spa en duo et excursion en pirogue au coucher du soleil.",
    includes: [
      "Vol aller-retour Paris-Dakar",
      "7 nuits en hôtel 5★",
      "Pension complète",
      "Transferts VIP",
      "Spa en duo (2h)",
      "Dîner romantique plage",
      "Excursion coucher soleil",
    ],
    featured: true,
    badge: "Coup de cœur",
  },
  {
    id: 2,
    name: "Week-end Famille Tout Compris",
    type: "famille",
    price: 520000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    duration: "4 nuits / 5 jours",
    persons: "2 adultes + 2 enfants",
    description:
      "Un séjour parfait pour toute la famille. Club enfants, activités aquatiques, animation en soirée et cuisine variée pour tous les goûts dans un cadre sécurisé.",
    includes: [
      "Hébergement 4★ tout compris",
      "Club enfants 4-12 ans",
      "Activités aquatiques illimitées",
      "Animation quotidienne",
      "Transferts aéroport",
      "Excursion Parc Bandia",
    ],
    featured: true,
    badge: "Best-seller",
  },
  {
    id: 3,
    name: "Circuit Découverte Sénégal",
    type: "aventure",
    price: 750000,
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    duration: "10 nuits / 11 jours",
    persons: "Par personne",
    description:
      "Le tour complet du Sénégal : Dakar, Gorée, Lac Rose, Casamance, Saint-Louis et Saly. Rencontres authentiques, paysages variés et expériences culinaires mémorables.",
    includes: [
      "10 nuits en hôtels sélectionnés",
      "Transport en minibus climatisé",
      "Guide francophone expert",
      "Tous les repas",
      "Entrées sites touristiques",
      "Vols intérieurs Dakar-Ziguinchor",
    ],
    featured: true,
  },
  {
    id: 4,
    name: "Lune de Miel Prestige",
    type: "luxe",
    price: 1450000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    duration: "10 nuits / 11 jours",
    persons: "2 personnes",
    description:
      "Le forfait ultime pour les mariés. Suite de luxe avec piscine privée, butler personnel, expériences gastronomiques exclusives et des souvenirs qui dureront toujours.",
    includes: [
      "Suite avec piscine privée",
      "Butler personnel 24h/24",
      "Dîners gastronomiques privés",
      "Spa illimité",
      "Transferts en voiture de luxe",
      "Champagne à l'arrivée",
      "Séance photo professionnelle",
    ],
    badge: "Luxe",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie-Claire Dupont",
    country: "France",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    comment:
      "Un voyage absolument magnifique ! L'équipe de Saly Tourisme nous a accompagnés avec professionnalisme du début à la fin. La plage de Saly est un paradis et les excursions proposées étaient toutes exceptionnelles.",
    date: "Janvier 2026",
  },
  {
    id: 2,
    name: "Amadou Diallo",
    country: "Sénégal",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    comment:
      "J'ai réservé le forfait famille pour les fêtes. Mes enfants ont adoré le club et les activités aquatiques. Le Royal Saly Resort est un hôtel de très haute qualité. Je recommande vivement !",
    date: "Décembre 2025",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    country: "Royaume-Uni",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    comment:
      "Saly Tourisme made our honeymoon absolutely perfect. The romantic package exceeded all our expectations. The sunset pirogue excursion was magical. We will definitely come back!",
    date: "Novembre 2025",
  },
  {
    id: 4,
    name: "Pierre-Antoine Lebrun",
    country: "Belgique",
    avatar: "https://i.pravatar.cc/80?img=57",
    rating: 4,
    comment:
      "Le circuit découverte Sénégal était une révélation. 11 jours à explorer ce pays magnifique avec un guide exceptionnel. La Casamance est à couper le souffle. Merci à toute l'équipe !",
    date: "Octobre 2025",
  },
];
