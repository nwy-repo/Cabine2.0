// Données et thème visuel des 3 opérateurs.
// NB: ces informations (nom, couleurs) sont génériques et publiques ;
// les offres/prix dans passes.js sont des exemples illustratifs, à
// remplacer par les vrais tarifs de l'opérateur avant mise en production.

export const OPERATORS = {
  orange: {
    id: "orange",
    name: "Orange CI",
    tagline: "Le réseau qui vous connecte, partout.",
    gradientFrom: "from-orange-500",
    gradientTo: "to-black",
    accentText: "text-orange-600",
    accentBg: "bg-orange-600",
    accentBgHover: "hover:bg-orange-700",
    ring: "focus:ring-orange-500",
    darkText: false,
  },
  moov: {
    id: "moov",
    name: "Moov Africa",
    tagline: "La force du réseau, la clarté du service.",
    gradientFrom: "from-blue-700",
    gradientTo: "to-slate-950",
    accentText: "text-blue-700",
    accentBg: "bg-blue-700",
    accentBgHover: "hover:bg-blue-800",
    ring: "focus:ring-blue-600",
    darkText: false,
  },
  mtn: {
    id: "mtn",
    name: "MTN CI",
    tagline: "Everywhere you go.",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-neutral-900",
    accentText: "text-yellow-500",
    accentBg: "bg-yellow-400",
    accentBgHover: "hover:bg-yellow-500",
    ring: "focus:ring-yellow-400",
    darkText: true,
  },
};

export const OPERATOR_LIST = Object.values(OPERATORS);

export function getOperator(id) {
  return OPERATORS[id] ?? null;
}
