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
  const [query, setQuery] = useState(() => {
    const searchParams = new URLSearchParams(globalThis.window?.location.search ?? "");
    return searchParams.get("q")?.trim() ?? "";
  });
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
      <section className="overflow-hidden rounded-[32px] border border-[var(--color-primary)] bg-[var(--color-secondary)] shadow-sm">
        <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] [color:var(--color-primary)]">
              Catalogue Produits
            </p>
            <h1 className="text-4xl leading-tight text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif] md:text-5xl">
              Trouve le bon equipement
            </h1>
            <p className="tone-zone max-w-3xl text-sm [color:var(--color-primary)] md:text-base">
              Experience de recherche complete avec donnees mock: sports,
              categories, niveaux, descriptions et prix.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-4 md:grid-cols-[1fr_220px] md:items-end md:p-5">
            <div>
              <label
                htmlFor="products-search"
                className="block text-xs font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]"
              >
                Rechercher un produit
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 [color:var(--color-primary)]"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  id="products-search"
                  type="search"
                  autoComplete="off"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ex: raquette, badminton, debutant..."
                  className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="products-sort"
                className="block text-xs font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]"
              >
                Trier
              </label>
              <select
                id="products-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="mt-2 w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-sm text-[var(--color-primary)] outline-none [&>option]:text-[var(--color-primary)]"
              >
                <option value="relevance">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
                <option value="name-asc">Nom A-Z</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">
                  Filtres
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold [color:var(--color-primary)] underline-offset-2 hover:underline"
                >
                  Reinitialiser
                </button>
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
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
                  <p className="text-xs font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
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
                  <p className="text-xs font-bold uppercase tracking-[0.14em] [color:var(--color-primary)]">
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                {filteredProducts.length} resultat{filteredProducts.length > 1 ? "s" : ""} sur{" "}
                {mockProducts.length}
              </p>

              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--color-primary)] bg-[var(--color-secondary)] px-6 py-10 text-center">
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    Aucun produit ne correspond a ta recherche.
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    Essaie avec un autre mot-cle ou modifie les filtres sport/categorie/niveau.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group block rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-[var(--color-primary)] focus-visible:shadow-lg focus-visible:outline-none"
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
                        <div className="-mx-2 -mt-2 mb-4 rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-secondary)] px-4 py-10 text-center text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                          Image produit
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                            {categoryLabelMap[product.category] ?? product.category}
                          </span>
                          <StockChip inStock={product.inStock} />
                        </div>
                        <p className="text-lg font-black text-[var(--color-primary)]">{formatPrice(product.price)}</p>
                      </div>

                      <h2 className="mt-3 text-2xl leading-tight text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
                        {formatTitle(product.name)}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed [color:var(--color-primary)]">
                        {product.description}
                      </p>

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                        Sport principal:{" "}
                        {selectedSport !== "ALL" && product.sports.includes(selectedSport)
                          ? selectedSport
                          : product.sports[0]}
                      </p>

                      <div className="mt-3 grid gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                            Sports concernes
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
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide [color:var(--color-primary)]">
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
                        </div>
                      </div>
                      <p className="mt-4 text-xs font-bold uppercase tracking-wide [color:var(--color-primary)] transition group-hover:text-[var(--color-primary)]">
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
          ? "bg-green-100 text-green-700 ring-1 ring-green-300"
          : "bg-red-100 text-red-700 ring-1 ring-red-300"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
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
          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
          : "border-[var(--color-primary)] bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
      }`}
    >
      {label}
    </button>
  );
}
