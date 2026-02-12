import { getProductById } from "../data/products";
import { useLanguage } from "../i18n/useLanguage";

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
  const { language, t } = useLanguage();
  const product = getProductById(productId);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <section className="rounded-[28px] border border-[var(--color-primary)] bg-[var(--color-secondary)] p-8 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] [color:var(--color-primary)]">
            {t("Produit")}
          </p>
          <h1 className="mt-3 text-3xl text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
            {t("Produit introuvable")}
          </h1>
          <p className="mt-2 text-sm [color:var(--color-primary)]">
            {t("Aucun produit ne correspond a l'identifiant")} "{productId}".
          </p>
          <a
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-[var(--color-secondary)] transition"
          >
            {t("Retour au catalogue")}
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
            {t("Retour aux produits")}
          </a>

          <div className="grid gap-3 md:grid-cols-2">
            {product.images.length > 0 ? (
              product.images.slice(0, 2).map((imageUrl, index) => (
                <div key={`${product.id}-gallery-${index}`} className="overflow-hidden rounded-xl">
                  <img
                    src={imageUrl}
                    alt={`${t(product.name)} ${t("vue")} ${index + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="md:col-span-2 rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-secondary)] px-4 py-12 text-center text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                {t("Aucune image disponible")}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                {t(categoryLabelMap[product.category] ?? product.category)}
              </span>
              <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                {t("Ref")}: {product.id}
              </span>
            </div>
            <p className="rounded-[2px] bg-[#f2e933] px-2.5 py-1 text-2xl font-black leading-none text-black">
              {formatPrice(product.price, language)}
            </p>
          </div>

          <h1 className="text-4xl leading-tight text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
            {t(product.name)}
          </h1>
          <p className="max-w-4xl text-base leading-relaxed [color:var(--color-primary)]">
            {t(product.description)}
          </p>

          <section className="rounded-xl border border-[var(--color-primary)] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
              {t("Sports")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sports.map((sport) => (
                <span
                  key={`${product.id}-sport-${sport}`}
                  className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
                >
                  {t(sport)}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
              {t("Niveaux")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.levels.map((level) => (
                <span
                  key={`${product.id}-level-${level}`}
                  className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-[var(--color-secondary)]"
                >
                  {t(levelLabelMap[level] ?? level)}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function formatPrice(price: number, language: "fr" | "en"): string {
  return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
