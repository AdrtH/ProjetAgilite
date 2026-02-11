import { useMemo, useState } from "react";
import { mockProducts, type Product } from "../data/products";

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

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc";

const formatTitle = (value: string): string => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const sports = Array.from(
    new Set(mockProducts.flatMap((product) => product.sports)),
  ).sort((left, right) => left.localeCompare(right, "fr"));
  const categories = Array.from(
    new Set(mockProducts.map((product) => product.category)),
  ).sort((left, right) => left.localeCompare(right, "fr"));
  const levels = Array.from(
    new Set(mockProducts.flatMap((product) => product.levels)),
  );
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSport =
        selectedSport === "ALL" || product.sports.includes(selectedSport);
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.some((level) => product.levels.includes(level));

      if (!matchesSport || !matchesCategory || !matchesLevel) {
        return false;
      }

      const searchableText = [
        product.name,
        product.description,
        product.category,
        ...product.sports,
        ...product.levels.map((level) => levelLabelMap[level] ?? level),
      ]
        .join(" ")
        .toLowerCase();

      if (!normalizedQuery) {
        return true;
      }

      return searchableText.includes(normalizedQuery);
    });

    const sorted = [...filtered];
    sorted.sort((left, right) => {
      if (sortBy === "price-asc") {
        return left.price - right.price;
      }

      if (sortBy === "price-desc") {
        return right.price - left.price;
      }

      if (sortBy === "name-asc") {
        return left.name.localeCompare(right.name, "fr");
      }

      if (!normalizedQuery) {
        return left.name.localeCompare(right.name, "fr");
      }

      return getRelevanceScore(right, normalizedQuery) - getRelevanceScore(left, normalizedQuery);
    });

    return sorted;
  }, [normalizedQuery, selectedCategory, selectedLevels, selectedSport, sortBy]);

  const resetFilters = () => {
    setQuery("");
    setSelectedSport("ALL");
    setSelectedCategory("ALL");
    setSelectedLevels([]);
    setSortBy("relevance");
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels((previous) =>
      previous.includes(level)
        ? previous.filter((item) => item !== level)
        : [...previous, level],
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <section className="overflow-hidden rounded-[32px] border border-[#722F37]/20 bg-gradient-to-br from-[#FFF9ED] via-[#F8EED7] to-[#EFDFBB] shadow-[0_24px_70px_rgba(114,47,55,0.16)]">
        <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#722F37]/80">
              Catalogue Produits
            </p>
            <h1 className="text-4xl leading-tight text-[#722F37] [font-family:'Fraunces',serif] md:text-5xl">
              Trouve le bon equipement
            </h1>
            <p className="max-w-3xl text-sm text-[#722F37]/80 md:text-base">
              Experience de recherche complete avec donnees mock: sports,
              categories, niveaux, descriptions et prix.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl border border-[#722F37]/20 bg-white/80 p-4 md:grid-cols-[1fr_220px] md:items-end md:p-5">
            <div>
              <label
                htmlFor="products-search"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#722F37]/75"
              >
                Rechercher un produit
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#722F37]/25 bg-white px-3 py-2.5">
                <span className="text-xs font-semibold uppercase text-[#722F37]/65">
                  Search
                </span>
                <input
                  id="products-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ex: raquette, badminton, debutant..."
                  className="w-full bg-transparent text-sm text-[#722F37] outline-none placeholder:text-[#722F37]/55"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="products-sort"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#722F37]/75"
              >
                Trier
              </label>
              <select
                id="products-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="mt-2 w-full rounded-xl border border-[#722F37]/25 bg-white px-3 py-2.5 text-sm text-[#722F37] outline-none"
              >
                <option value="relevance">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
                <option value="name-asc">Nom A-Z</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-2xl border border-[#722F37]/20 bg-white/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wide text-[#722F37]">
                  Filtres
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#722F37]/80 underline-offset-2 hover:underline"
                >
                  Reinitialiser
                </button>
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#722F37]/75">
                    Sport
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <FilterChip
                      label="Tous"
                      active={selectedSport === "ALL"}
                      onClick={() => setSelectedSport("ALL")}
                    />
                    {sports.map((sport) => (
                      <FilterChip
                        key={sport}
                        label={sport}
                        active={selectedSport === sport}
                        onClick={() => setSelectedSport(sport)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#722F37]/75">
                    Categorie
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <FilterChip
                      label="Toutes"
                      active={selectedCategory === "ALL"}
                      onClick={() => setSelectedCategory("ALL")}
                    />
                    {categories.map((category) => (
                      <FilterChip
                        key={category}
                        label={categoryLabelMap[category] ?? category}
                        active={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#722F37]/75">
                    Niveau
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <FilterChip
                        key={level}
                        label={levelLabelMap[level] ?? level}
                        active={selectedLevels.includes(level)}
                        onClick={() => toggleLevel(level)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="grid gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#722F37]/80">
                {filteredProducts.length} resultat{filteredProducts.length > 1 ? "s" : ""} sur{" "}
                {mockProducts.length}
              </p>

              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#722F37]/30 bg-white/70 px-6 py-10 text-center">
                  <p className="text-lg font-semibold text-[#722F37]">
                    Aucun produit ne correspond a ta recherche.
                  </p>
                  <p className="mt-2 text-sm text-[#722F37]/75">
                    Essaie avec un autre mot-cle ou modifie les filtres sport/categorie/niveau.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group block rounded-2xl border border-[#722F37]/15 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#722F37]/40 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-[#722F37]/40 focus-visible:shadow-lg focus-visible:outline-none"
                    >
                      {product.cardImage ? (
                        <div className="-mx-2 -mt-2 mb-4 overflow-hidden rounded-xl">
                          <img
                            src={product.cardImage}
                            alt={product.name}
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                        <div className="-mx-2 -mt-2 mb-4 rounded-xl border border-dashed border-[#722F37]/25 bg-[#EFDFBB]/35 px-4 py-10 text-center text-xs font-semibold uppercase tracking-wide text-[#722F37]/70">
                          Image produit
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#722F37]/25 bg-[#EFDFBB] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#722F37]">
                            {categoryLabelMap[product.category] ?? product.category}
                          </span>
                          <StockChip inStock={product.inStock} />
                        </div>
                        <p className="text-lg font-black text-[#722F37]">{formatPrice(product.price)}</p>
                      </div>

                      <h2 className="mt-3 text-2xl leading-tight text-[#722F37] [font-family:'Fraunces',serif]">
                        {formatTitle(product.name)}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#722F37]/80">
                        {product.description}
                      </p>

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#722F37]/70">
                        Sport principal:{" "}
                        {selectedSport !== "ALL" && product.sports.includes(selectedSport)
                          ? selectedSport
                          : product.sports[0]}
                      </p>

                      <div className="mt-3 grid gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#722F37]/70">
                            Sports concernes
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {product.sports.map((sport) => (
                              <span
                                key={`${product.id}-sport-${sport}`}
                                className="rounded-full border border-[#722F37]/30 bg-[#EFDFBB] px-3 py-1 text-xs font-semibold text-[#722F37]"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#722F37]/70">
                            Niveaux
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {product.levels.map((level) => (
                              <span
                                key={`${product.id}-level-${level}`}
                                className="rounded-full bg-[#722F37] px-3 py-1 text-xs font-semibold text-[#EFDFBB]"
                              >
                                {levelLabelMap[level] ?? level}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#722F37]/75 transition group-hover:text-[#722F37]">
                        Voir le detail produit
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type StockChipProps = Readonly<{
  inStock: boolean;
}>;

function StockChip({ inStock }: StockChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        inStock
          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
          : "bg-rose-100 text-rose-700 ring-1 ring-rose-300"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
      {inStock ? "Stock" : "Rupture"}
    </span>
  );
}

function getRelevanceScore(product: Product, normalizedQuery: string): number {
  let score = 0;
  const name = product.name.toLowerCase();
  const description = product.description.toLowerCase();

  if (name.startsWith(normalizedQuery)) {
    score += 6;
  } else if (name.includes(normalizedQuery)) {
    score += 4;
  }

  if (description.includes(normalizedQuery)) {
    score += 2;
  }

  if (product.sports.some((sport) => sport.toLowerCase().includes(normalizedQuery))) {
    score += 3;
  }

  if (
    product.levels.some((level) =>
      (levelLabelMap[level] ?? level).toLowerCase().includes(normalizedQuery),
    )
  ) {
    score += 2;
  }

  return score;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

type FilterChipProps = Readonly<{
  label: string;
  active: boolean;
  onClick: () => void;
}>;

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
        active
          ? "border-[#722F37] bg-[#722F37] text-[#EFDFBB]"
          : "border-[#722F37]/30 bg-white text-[#722F37] hover:bg-[#EFDFBB]/60"
      }`}
    >
      {label}
    </button>
  );
}
