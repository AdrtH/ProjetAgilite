export type Product = {
  id: string;
  category: string;
  sports: string[];
  levels: string[];
  name: string;
  description: string;
  price: number;
  images: string[];
};

const seededProducts: Omit<Product, "images">[] = [
  {
    id: "p-bad-001",
    category: "CHAUSSURES",
    sports: ["BADMINTON"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Chaussures badminton court grip 900",
    description:
      "Chaussure indoor stable et legere pour les changements de direction rapides sur terrain.",
    price: 84.99,
  },
  {
    id: "p-bad-002",
    category: "MATERIEL",
    sports: ["BADMINTON"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Raquette badminton power strike 78",
    description:
      "Raquette equilibree orientee puissance, ideale pour un jeu offensif et des smashs repetes.",
    price: 69.99,
  },
  {
    id: "p-run-001",
    category: "CHAUSSURES",
    sports: ["RUNNING"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Chaussures running comfort run 500",
    description:
      "Amorti souple pour les sorties regulieres sur route avec un bon maintien du pied.",
    price: 59.99,
  },
  {
    id: "p-run-002",
    category: "TEXTILE",
    sports: ["RUNNING"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Veste running coupe-vent dry pace",
    description:
      "Veste respirante et deperlante pour courir par temps frais ou vent modere.",
    price: 44.99,
  },
  {
    id: "p-foot-001",
    category: "MATERIEL",
    sports: ["FOOTBALL"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Ballon football match team pro",
    description:
      "Ballon cousu machine avec toucher regulier et bonne resistance a l'usure.",
    price: 29.99,
  },
  {
    id: "p-foot-002",
    category: "PROTECTION",
    sports: ["FOOTBALL"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Protege-tibias shield flex",
    description:
      "Protection legere avec coque flexible et manchette textile pour un confort durable.",
    price: 19.99,
  },
  {
    id: "p-ten-001",
    category: "MATERIEL",
    sports: ["TENNIS"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Raquette tennis control spin 102",
    description:
      "Raquette maniable pour progresser, favorise le controle de balle et les effets.",
    price: 89.99,
  },
  {
    id: "p-ten-002",
    category: "ACCESSOIRES",
    sports: ["TENNIS"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Sac tennis competition 9 raquettes",
    description:
      "Grand compartiment isotherme pour transporter raquettes, textiles et accessoires.",
    price: 64.99,
  },
  {
    id: "p-cyc-001",
    category: "MATERIEL",
    sports: ["CYCLISME"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Casque velo route safe ride 300",
    description:
      "Casque aeroventile ajuste avec molette arriere pour les sorties route et velotaf.",
    price: 39.99,
  },
  {
    id: "p-cyc-002",
    category: "ACCESSOIRES",
    sports: ["CYCLISME"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Eclairage velo avant/arriere usb",
    description:
      "Kit d'eclairage rechargeable pour etre visible en ville et sur pistes cyclables.",
    price: 24.99,
  },
  {
    id: "p-mus-001",
    category: "MATERIEL",
    sports: ["MUSCULATION"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Halteres ajustables home set 20kg",
    description:
      "Jeu d'halteres modulables pour entrainements a domicile, progression par paliers.",
    price: 119.99,
  },
  {
    id: "p-mus-002",
    category: "ACCESSOIRES",
    sports: ["MUSCULATION"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Ceinture de force power support",
    description:
      "Ceinture de maintien lombaire pour les exercices de souleve et squat charges.",
    price: 34.99,
  },
  {
    id: "p-nat-001",
    category: "MATERIEL",
    sports: ["NATATION"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Lunettes natation clear vision",
    description:
      "Lunettes anti-buee avec joint souple pour un confort longue duree en piscine.",
    price: 14.99,
  },
  {
    id: "p-nat-002",
    category: "TEXTILE",
    sports: ["NATATION"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Maillot natation training one-piece",
    description:
      "Maillot resistant au chlore, coupe ergonomique pour entrainements frequents.",
    price: 27.99,
  },
  {
    id: "p-rand-001",
    category: "CHAUSSURES",
    sports: ["RANDONNEE"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Chaussures randonnee mid trek 100",
    description:
      "Tige montante pour maintenir la cheville, semelle adherente sur sentiers mixtes.",
    price: 74.99,
  },
  {
    id: "p-rand-002",
    category: "ACCESSOIRES",
    sports: ["RANDONNEE"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Sac a dos randonnee 25L breathe",
    description:
      "Sac compact avec dos ventile et poches acces rapide pour sorties a la journee.",
    price: 49.99,
  },
  {
    id: "p-bas-001",
    category: "CHAUSSURES",
    sports: ["BASKETBALL"],
    levels: ["AVERAGE", "EXPERT"],
    name: "Chaussures basketball jump elite 700",
    description:
      "Amorti dynamique et maintien lateral renforce pour les appuis explosifs.",
    price: 94.99,
  },
  {
    id: "p-yog-001",
    category: "MATERIEL",
    sports: ["YOGA"],
    levels: ["BEGINNER", "AVERAGE", "EXPERT"],
    name: "Tapis yoga confort align 6mm",
    description:
      "Tapis antiderapant avec bonne densite pour postures d'equilibre et seances au sol.",
    price: 22.99,
  },
  {
    id: "p-yog-002",
    category: "ACCESSOIRES",
    sports: ["YOGA"],
    levels: ["BEGINNER", "AVERAGE"],
    name: "Sangle yoga stretch assist",
    description:
      "Sangle reglable pour travailler la mobilite et progresser sur les amplitudes.",
    price: 9.99,
  },
];

const productImageModules = import.meta.glob("../assets/products/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const mockProducts: Product[] = seededProducts.map((product) => ({
  ...product,
  images: getImagesForProduct(product.id),
}));

export const getProductById = (id: string): Product | undefined =>
  mockProducts.find((product) => product.id === id);

function getImagesForProduct(productId: string): string[] {
  return Object.entries(productImageModules)
    .map(([path, url]) => ({ path, url }))
    .filter(({ path }) => path.includes(`/products/${productId}-`))
    .sort((left, right) => extractImageOrder(left.path) - extractImageOrder(right.path))
    .map(({ url }) => url);
}

function extractImageOrder(path: string): number {
  const filename = path.split("/").pop() ?? "";
  const regexp = /-(\d+)\.[^.]+$/;
  const match = regexp.exec(filename);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}
