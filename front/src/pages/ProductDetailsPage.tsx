import type { ReactNode } from "react";
import { getProductById } from "../data/products";

const levelLabelMap: Record<string, string> = {
  BEGINNER: "Debutant",
  AVERAGE: "Intermediaire",
  EXPERT: "Expert",
};

const categoryLabelMap: Record<string, string> = {
  CHAUSSURES: "Chaussures",
  MATERIEL: "Materiel",
  TEXTILE: "Textile",
  ACCESSOIRES: "Accessoires",
  PROTECTION: "Protection",
};

type ProductDetailsPageProps = {
  productId: string;
};

export default function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
  const product = getProductById(productId);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <section className="rounded-[28px] border border-[#722F37]/20 bg-white/85 p-8 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#722F37]/70">
            Produit
          </p>
          <h1 className="mt-3 text-3xl text-[#722F37] [font-family:'Fraunces',serif]">
            Produit introuvable
          </h1>
          <p className="mt-2 text-sm text-[#722F37]/75">
            Aucun produit ne correspond a l&apos;identifiant "{productId}".
          </p>
          <a
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[#722F37] px-5 py-3 text-sm font-bold text-[#EFDFBB] transition hover:brightness-110"
          >
            Retour au catalogue
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <section className="overflow-hidden rounded-[32px] border border-[#722F37]/20 bg-gradient-to-br from-[#FFF9ED] via-[#F8EED7] to-[#EFDFBB] shadow-[0_24px_70px_rgba(114,47,55,0.16)]">
        <div className="grid gap-6 px-6 py-8 md:px-10 md:py-10">
          <a href="/products" className="text-xs font-semibold uppercase tracking-wide text-[#722F37]/80 hover:underline">
            ← Retour aux produits
          </a>

          <div className="rounded-2xl border border-[#722F37]/20 bg-white/85 p-5 md:p-6">
            <div className="mb-5 grid gap-3 md:grid-cols-2">
              {product.galleryImages.length > 0 ? (
                product.galleryImages.slice(0, 2).map((imageUrl, index) => (
                  <div key={`${product.id}-gallery-${index}`} className="overflow-hidden rounded-xl">
                    <img
                      src={imageUrl}
                      alt={`${product.name} vue ${index + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 rounded-xl border border-dashed border-[#722F37]/25 bg-[#EFDFBB]/35 px-4 py-12 text-center text-xs font-semibold uppercase tracking-wide text-[#722F37]/70">
                  Aucune image disponible
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#722F37]/25 bg-[#EFDFBB] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#722F37]">
                  {categoryLabelMap[product.category] ?? product.category}
                </span>
                <StockChip inStock={product.inStock} />
                <span className="rounded-full border border-[#722F37]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#722F37]/80">
                  {product.brand}
                </span>
              </div>

              <p className="text-2xl font-black text-[#722F37]">{formatPrice(product.price)}</p>
            </div>

            <h1 className="mt-4 text-4xl leading-tight text-[#722F37] [font-family:'Fraunces',serif]">
              {product.name}
            </h1>
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#722F37]/80">
              {product.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <p className="font-semibold text-[#722F37]">
                {renderStars(product.rating)}{" "}
                <span className="text-[#722F37]/75">
                  {product.rating.toFixed(1)} ({product.reviewCount} avis)
                </span>
              </p>
              <p className="rounded-full border border-[#722F37]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#722F37]/75">
                Ref: {product.sku}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard title="Stock">
                <p className="text-sm text-[#722F37]/85">
                  {product.inStock
                    ? `${product.stockCount} article(s) disponible(s)`
                    : "Rupture de stock"}
                </p>
              </InfoCard>

              <InfoCard title="Livraison estimee">
                <p className="text-sm text-[#722F37]/85">
                  Chez vous en {product.deliveryDays} jour
                  {product.deliveryDays > 1 ? "s" : ""}
                </p>
              </InfoCard>

              <InfoCard title="Garantie">
                <p className="text-sm text-[#722F37]/85">{product.warrantyMonths} mois</p>
              </InfoCard>

              <InfoCard title="Marque">
                <p className="text-sm text-[#722F37]/85">{product.brand}</p>
              </InfoCard>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <InfoCard title="Sports">
                <div className="flex flex-wrap gap-2">
                  {product.sports.map((sport) => (
                    <span
                      key={`${product.id}-sport-${sport}`}
                      className="rounded-full border border-[#722F37]/30 bg-[#EFDFBB] px-3 py-1 text-xs font-semibold text-[#722F37]"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Caracteristiques">
                <ul className="list-disc space-y-1 pl-4 text-sm text-[#722F37]/85">
                  {product.features.map((feature) => (
                    <li key={`${product.id}-feature-${feature}`}>{feature}</li>
                  ))}
                </ul>
              </InfoCard>
            </div>

            <div className="mt-4">
              <InfoCard title="Disponibilite par magasin">
                <div className="grid gap-2">
                  {product.stockByStore.map((store) => (
                    <div
                      key={`${product.id}-${store.store}`}
                      className="flex items-center justify-between rounded-lg border border-[#722F37]/15 bg-[#FFF9ED] px-3 py-2"
                    >
                      <p className="text-sm font-medium text-[#722F37]">{store.store}</p>
                      <StoreStockChip stock={store.stock} />
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <InfoCard title="Niveaux">
                <div className="flex flex-wrap gap-2">
                  {product.levels.map((level) => (
                    <span
                      key={`${product.id}-level-${level}`}
                      className="rounded-full bg-[#722F37] px-3 py-1 text-xs font-semibold text-[#EFDFBB]"
                    >
                      {levelLabelMap[level] ?? level}
                    </span>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Conseil">
                <p className="text-sm text-[#722F37]/85">
                  Ce produit est pertinent pour les niveaux{" "}
                  {product.levels.map((level) => levelLabelMap[level] ?? level).join(", ")} en{" "}
                  {product.sports.join(", ")}.
                </p>
              </InfoCard>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

type StockChipProps = {
  inStock: boolean;
};

function StockChip({ inStock }: StockChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        inStock
          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
          : "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
      {inStock ? "En stock" : "Rupture"}
    </span>
  );
}

type StoreStockChipProps = {
  stock: number;
};

function StoreStockChip({ stock }: StoreStockChipProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {stock > 0 ? `${stock} en stock` : "Rupture"}
    </span>
  );
}

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-[#722F37]/15 bg-white p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#722F37]/70">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function renderStars(rating: number): string {
  const filled = Math.round(rating);
  return "*".repeat(filled) + ".".repeat(5 - filled);
}
