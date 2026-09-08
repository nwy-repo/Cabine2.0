// Catalogue de pass — DONNÉES D'EXEMPLE.
// Remplace ces valeurs par les vrais tarifs Orange/Moov/MTN avant la mise
// en ligne : noms officiels, volumes de données, validité, prix en FCFA.

export const PASS_CATEGORIES = [
  { id: "tout-prix", label: "10 Go à tout prix", hint: "Le meilleur rapport prix / données" },
  { id: "illimite-rs", label: "Pass Illimité RS", hint: "Réseaux sociaux en illimité" },
  { id: "max-it", label: "Pass Max It", hint: "Data + appels combinés" },
  { id: "reseaux-sociaux", label: "Pass Réseaux Sociaux", hint: "WhatsApp, Facebook, Instagram, TikTok" },
  { id: "kdo-max", label: "Pass KDO Max", hint: "Data bonus offerte à l'achat" },
  { id: "1-3-jours", label: "Pass 1 à 3 jours", hint: "Pour une courte durée" },
  { id: "5-7-jours", label: "Pass 5 à 7 jours", hint: "Pour la semaine" },
  { id: "mois", label: "Pass Mois", hint: "Valable 30 jours" },
  { id: "nuit", label: "Pass Nuit", hint: "Utilisable de minuit à 6h" },
];

let uid = 0;
const id = () => `p${++uid}`;

// price en FCFA
function make(name, data, validity, price) {
  return { id: id(), name, data, validity, price };
}

export const INTERNET_PASSES = {
  orange: {
    "tout-prix": [make("Prends 10 Go", "10 Go", "24h", 1000), make("Prends 10 Go Eco", "10 Go", "48h", 1500)],
    "illimite-rs": [make("Illimix Soir", "Illimité RS", "6h (19h-1h)", 500), make("Illimix Jour", "Illimité RS", "24h", 1000)],
    "max-it": [make("Max It 500", "1 Go + 50 min", "24h", 500), make("Max It 1000", "2,5 Go + 100 min", "72h", 1000)],
    "reseaux-sociaux": [make("Réso Light", "150 Mo (WhatsApp)", "24h", 200), make("Réso Max", "500 Mo (RS)", "72h", 500)],
    "kdo-max": [make("KDO Max 1000", "3 Go + 1 Go offert", "7 jours", 1000), make("KDO Max 2000", "6 Go + 2 Go offerts", "7 jours", 2000)],
    "1-3-jours": [make("Pass 1 jour", "1 Go", "24h", 300), make("Pass 3 jours", "2,5 Go", "72h", 700)],
    "5-7-jours": [make("Pass 5 jours", "4 Go", "5 jours", 1200), make("Pass 7 jours", "6 Go", "7 jours", 1500)],
    "mois": [make("Pass Mois Eco", "10 Go", "30 jours", 3000), make("Pass Mois Confort", "20 Go", "30 jours", 5000)],
    "nuit": [make("Pass Nuit", "5 Go", "00h - 6h", 300)],
  },
  moov: {
    "tout-prix": [make("Moov 10 Go", "10 Go", "24h", 950), make("Moov 10 Go+", "10 Go", "48h", 1400)],
    "illimite-rs": [make("Moov Illimité Soir", "Illimité RS", "6h (19h-1h)", 450), make("Moov Illimité Jour", "Illimité RS", "24h", 950)],
    "max-it": [make("Moov Mix 500", "1 Go + 60 min", "24h", 500), make("Moov Mix 1000", "3 Go + 120 min", "72h", 1000)],
    "reseaux-sociaux": [make("Moov Réso", "200 Mo (RS)", "24h", 200), make("Moov Réso Max", "600 Mo (RS)", "72h", 500)],
    "kdo-max": [make("Moov KDO 1000", "3,5 Go + 1 Go offert", "7 jours", 1000), make("Moov KDO 2000", "7 Go + 2 Go offerts", "7 jours", 2000)],
    "1-3-jours": [make("Moov 1 jour", "1,2 Go", "24h", 300), make("Moov 3 jours", "3 Go", "72h", 700)],
    "5-7-jours": [make("Moov 5 jours", "4,5 Go", "5 jours", 1200), make("Moov 7 jours", "7 Go", "7 jours", 1500)],
    "mois": [make("Moov Mois Eco", "11 Go", "30 jours", 3000), make("Moov Mois Confort", "22 Go", "30 jours", 5000)],
    "nuit": [make("Moov Nuit", "6 Go", "00h - 6h", 300)],
  },
  mtn: {
    "tout-prix": [make("MTN 10 Go", "10 Go", "24h", 1000), make("MTN 10 Go+", "10 Go", "48h", 1500)],
    "illimite-rs": [make("MTN Illimité Soir", "Illimité RS", "6h (19h-1h)", 500), make("MTN Illimité Jour", "Illimité RS", "24h", 1000)],
    "max-it": [make("MTN Combo 500", "1 Go + 50 min", "24h", 500), make("MTN Combo 1000", "2,5 Go + 100 min", "72h", 1000)],
    "reseaux-sociaux": [make("MTN Réso", "150 Mo (RS)", "24h", 200), make("MTN Réso Max", "500 Mo (RS)", "72h", 500)],
    "kdo-max": [make("MTN KDO 1000", "3 Go + 1 Go offert", "7 jours", 1000), make("MTN KDO 2000", "6 Go + 2 Go offerts", "7 jours", 2000)],
    "1-3-jours": [make("MTN 1 jour", "1 Go", "24h", 300), make("MTN 3 jours", "2,5 Go", "72h", 700)],
    "5-7-jours": [make("MTN 5 jours", "4 Go", "5 jours", 1200), make("MTN 7 jours", "6 Go", "7 jours", 1500)],
    "mois": [make("MTN Mois Eco", "10 Go", "30 jours", 3000), make("MTN Mois Confort", "20 Go", "30 jours", 5000)],
    "nuit": [make("MTN Nuit", "5 Go", "00h - 6h", 300)],
  },
};

export const MIX_PASSES = {
  orange: [
    make("Mix Essentiel", "1 Go + 100 min + 50 SMS", "7 jours", 1500),
    make("Mix Confort", "3 Go + 200 min + 100 SMS", "30 jours", 4000),
    make("Mix Intense", "8 Go + 500 min illimité RS", "30 jours", 7000),
  ],
  moov: [
    make("Moov Mix Essentiel", "1,2 Go + 100 min + 50 SMS", "7 jours", 1450),
    make("Moov Mix Confort", "3,5 Go + 200 min + 100 SMS", "30 jours", 3900),
    make("Moov Mix Intense", "9 Go + 500 min illimité RS", "30 jours", 6900),
  ],
  mtn: [
    make("MTN Mix Essentiel", "1 Go + 100 min + 50 SMS", "7 jours", 1500),
    make("MTN Mix Confort", "3 Go + 200 min + 100 SMS", "30 jours", 4000),
    make("MTN Mix Intense", "8 Go + 500 min illimité RS", "30 jours", 7000),
  ],
};

export function getInternetCatalog(operatorId) {
  return INTERNET_PASSES[operatorId] ?? {};
}

export function getMixCatalog(operatorId) {
  return MIX_PASSES[operatorId] ?? [];
}

export function formatFcfa(amount) {
  return `${amount.toLocaleString("fr-FR")} F CFA`;
}
