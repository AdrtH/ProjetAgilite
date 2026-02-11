export type Product = {
  brand: string;
  sku: string;
  id: string;
  category: string;
  sports: string[];
  levels: string[];
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  warrantyMonths: number;
  deliveryDays: number;
  features: string[];
  cardImage: string;
  galleryImages: string[];
  stockByStore: Array<{
    store: string;
    stock: number;
  }>;
  inStock: boolean;
  stockCount: number;
};

type ProductSeed = Omit<
  Product,
  | "brand"
  | "sku"
  | "rating"
  | "reviewCount"
  | "warrantyMonths"
  | "deliveryDays"
  | "features"
  | "cardImage"
  | "galleryImages"
  | "stockByStore"
  | "inStock"
  | "stockCount"
>;

const seededProducts: ProductSeed[] = [
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

const stockPattern = [0, 12, 6, 20, 3, 0, 8, 14, 5, 2, 0, 11, 9, 4, 1, 0, 7, 15, 10];
const brands = ["Aptonia", "Kalenji", "Kipsta", "Domyos", "Artengo", "Btwin", "Nabaiji"];
const deliveryPattern = [1, 2, 3, 2, 4, 1, 3, 2];
const reviewPattern = [18, 42, 65, 27, 103, 11, 54, 89, 34, 22];
const ratingPattern = [4.6, 4.4, 4.8, 4.3, 4.7, 4.1, 4.5, 4.2];
const warrantyPattern = [12, 24, 12, 24, 36];
const storeNames = [
  "Decathlon Lille",
  "Decathlon Paris Madeleine",
  "Decathlon Lyon Part-Dieu",
  "Decathlon Bordeaux Lac",
];

const featureByCategory: Record<string, string[]> = {
  CHAUSSURES: ["Respirabilite", "Amorti", "Maintien lateral"],
  MATERIEL: ["Robustesse", "Performance", "Confort d'utilisation"],
  TEXTILE: ["Respirant", "Leger", "Séchage rapide"],
  ACCESSOIRES: ["Pratique", "Compact", "Polyvalent"],
  PROTECTION: ["Protection ciblee", "Confort", "Maintien"],
};

const productImageModules = import.meta.glob("../assets/products/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const mockProducts: Product[] = seededProducts.map((product, index) => {
  const stockCount = stockPattern[index % stockPattern.length];
  const features = featureByCategory[product.category] ?? ["Confort", "Durabilite", "Polyvalence"];
  const storeStockParts = splitStock(stockCount, storeNames.length, index);
  const galleryImages = getImagesForProduct(product.id);

  return {
    ...product,
    brand: brands[index % brands.length],
    sku: `REF-${product.id.toUpperCase()}`,
    rating: ratingPattern[index % ratingPattern.length],
    reviewCount: reviewPattern[index % reviewPattern.length],
    warrantyMonths: warrantyPattern[index % warrantyPattern.length],
    deliveryDays: deliveryPattern[index % deliveryPattern.length],
    features,
    cardImage: galleryImages[0] ?? "",
    galleryImages,
    stockByStore: storeNames.map((store, storeIndex) => ({
      store,
      stock: storeStockParts[storeIndex],
    })),
    inStock: stockCount > 0,
    stockCount,
  };
});

export const getProductById = (id: string): Product | undefined =>
  mockProducts.find((product) => product.id === id);

function splitStock(total: number, parts: number, seed: number): number[] {
  const distribution = new Array<number>(parts).fill(0);

  for (let index = 0; index < total; index += 1) {
    const slot = (seed + index) % parts;
    distribution[slot] += 1;
  }

  return distribution;
}

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
