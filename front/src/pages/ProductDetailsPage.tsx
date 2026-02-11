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

type ProductDetailsPageProps = Readonly<{
  productId: string;
}>;

export default function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
  const product = getProductById(productId);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <section className="rounded-[28px] border border-[var(--color-primary)] bg-[var(--color-secondary)] p-8 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] [color:var(--color-primary)]">
            Produit
          </p>
          <h1 className="mt-3 text-3xl text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
            Produit introuvable
          </h1>
          <p className="mt-2 text-sm [color:var(--color-primary)]">
            Aucun produit ne correspond a l&apos;identifiant "{productId}".
          </p>
          <a
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-[var(--color-secondary)] transition"
          >
            Retour au catalogue
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <section className="overflow-hidden rounded-[32px] border border-[var(--color-primary)] bg-[var(--color-secondary)] shadow-sm">
        <div className="grid gap-6 px-6 py-8 md:px-10 md:py-10">
          <a
            href="/products"
            className="text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)] hover:underline"
          >
            ← Retour aux produits
          </a>

          <div className="grid gap-3 md:grid-cols-2">
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
              <div className="md:col-span-2 rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-secondary)] px-4 py-12 text-center text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                Aucune image disponible
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                {categoryLabelMap[product.category] ?? product.category}
              </span>
              <StockChip inStock={product.inStock} />
              <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                {product.brand}
              </span>
            </div>
            <p className="text-2xl font-black text-[var(--color-primary)]">{formatPrice(product.price)}</p>
          </div>

          <h1 className="text-4xl leading-tight text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
            {product.name}
          </h1>
          <p className="tone-zone max-w-4xl text-base leading-relaxed [color:var(--color-primary)]">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <p className="font-semibold text-[var(--color-primary)]">
              {renderStars(product.rating)}{" "}
              <span className="[color:var(--color-primary)]">
                {product.rating.toFixed(1)} ({product.reviewCount} avis)
              </span>
            </p>
            <p className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
              Ref: {product.sku}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Stock
              </p>
              <p className="mt-2 text-sm [color:var(--color-primary)]">
                {product.inStock
                  ? `${product.stockCount} article(s) disponible(s)`
                  : "Rupture de stock"}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Livraison estimee
              </p>
              <p className="mt-2 text-sm [color:var(--color-primary)]">
                Chez vous en {product.deliveryDays} jour{product.deliveryDays > 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Garantie
              </p>
              <p className="mt-2 text-sm [color:var(--color-primary)]">{product.warrantyMonths} mois</p>
            </div>
            <div className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Marque
              </p>
              <p className="mt-2 text-sm [color:var(--color-primary)]">{product.brand}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Sports et niveaux
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] [color:var(--color-primary)]">
                Sports
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sports.map((sport) => (
                  <span
                    key={`${product.id}-sport-${sport}`}
                    className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
                  >
                    {sport}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] [color:var(--color-primary)]">
                Niveaux
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.levels.map((level) => (
                  <span
                    key={`${product.id}-level-${level}`}
                    className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-[var(--color-secondary)]"
                  >
                    {levelLabelMap[level] ?? level}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[var(--color-primary)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                Caracteristiques et conseil
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm [color:var(--color-primary)]">
                {product.features.map((feature) => (
                  <li key={`${product.id}-feature-${feature}`}>{feature}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm [color:var(--color-primary)]">
                Ce produit est pertinent pour les niveaux{" "}
                {product.levels.map((level) => levelLabelMap[level] ?? level).join(", ")} en{" "}
                {product.sports.join(", ")}.
              </p>
            </section>
          </div>

          <section className="rounded-xl border border-[var(--color-primary)] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
              Disponibilite par magasin
            </p>
            <div className="mt-3 grid gap-2">
              {product.stockByStore.map((store) => (
                <div
                  key={`${product.id}-${store.store}`}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2"
                >
                  <p className="text-sm font-medium text-[var(--color-primary)]">{store.store}</p>
                  <StoreStockChip stock={store.stock} />
                </div>
              ))}
            </div>
          </section>
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

type StockChipProps = Readonly<{
  inStock: boolean;
}>;

function StockChip({ inStock }: StockChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        inStock
          ? "bg-green-100 text-green-700 ring-1 ring-green-300"
          : "bg-red-100 text-red-700 ring-1 ring-red-300"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
      {inStock ? "En stock" : "Rupture"}
    </span>
  );
}

type StoreStockChipProps = Readonly<{
  stock: number;
}>;

function StoreStockChip({ stock }: StoreStockChipProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        stock > 0
          ? "bg-green-100 text-green-700 ring-1 ring-green-300"
          : "bg-red-100 text-red-700 ring-1 ring-red-300"
      }`}
    >
      {stock > 0 ? `${stock} en stock` : "Rupture"}
    </span>
  );
}

function renderStars(rating: number): string {
  const filled = Math.round(rating);
  return "*".repeat(filled) + ".".repeat(5 - filled);
}
