import { useEffect, useMemo, useRef, useState } from "react";
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

type ApiProduct = {
  id: string;
  sports: string[];
  levels: string[];
  name: string;
  price: string | number;
  card_image?: string | null;
};

type ApiSport = {
  key: string;
  name: string;
};

const mockById = new Map(mockProducts.map((product) => [product.id, product] as const));
const allSports = Array.from(
  new Set(mockProducts.flatMap((product) => product.sports)),
).sort((left, right) => left.localeCompare(right, "fr"));
const allCategories = Array.from(
  new Set(mockProducts.map((product) => product.category)),
).sort((left, right) => left.localeCompare(right, "fr"));
const allLevels = Array.from(
  new Set(mockProducts.flatMap((product) => product.levels)),
);

export default function ProductsPage() {
  const [query, setQuery] = useState(() => {
    const searchParams = new URLSearchParams(globalThis.window?.location.search ?? "");
    return searchParams.get("q")?.trim() ?? "";
  });
  const [selectedSport, setSelectedSport] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const [apiProducts, setApiProducts] = useState<Product[]>(mockProducts);
  const [totalProductsCount, setTotalProductsCount] = useState(mockProducts.length);
  const [sportOptions, setSportOptions] = useState<Array<{ key: string; name: string }>>(
    allSports.map((sport) => ({ key: sport, name: sport })),
  );
  const latestRequestIdRef = useRef(0);

  const sports = useMemo(
    () => sportOptions.map((sport) => sport.key),
    [sportOptions],
  );
  const sportNameByKey = useMemo(
    () =>
      Object.fromEntries(
        sportOptions.map((sport) => [sport.key, toSentenceCase(sport.name)]),
      ) as Record<string, string>,
    [sportOptions],
  );
  const categories = allCategories;
  const levels = allLevels;

  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch("/api/sports");
        if (!response.ok) {
          throw new Error("sports");
        }

        const rows = (await response.json()) as ApiSport[];
        if (rows.length === 0) {
          return;
        }

        setSportOptions(
          rows
            .map((row) => ({ key: row.key, name: row.name }))
            .sort((left, right) => left.name.localeCompare(right.name, "fr")),
        );
      } catch {
        // Keep fallback sport list from local mock dataset.
      }
    };

    void fetchSports();
  }, []);

  useEffect(() => {
    const normalizedText = normalizeSearchText(query);

    if (!normalizedText) {
      setSelectedSport((previous) => (previous === "ALL" ? previous : "ALL"));
      setSelectedCategory((previous) => (previous === "ALL" ? previous : "ALL"));
      setSelectedLevels((previous) => (previous.length === 0 ? previous : []));
      return;
    }

    const matchedSport =
      sports.find((sport) => normalizedText.includes(normalizeSearchText(sport))) ?? "ALL";

    const matchedCategory =
      categories.find((category) => {
        const normalizedCategory = normalizeSearchText(category);
        const normalizedCategoryLabel = normalizeSearchText(categoryLabelMap[category] ?? category);

        return (
          normalizedText.includes(normalizedCategory) ||
          normalizedText.includes(normalizedCategoryLabel)
        );
      }) ?? "ALL";

    const matchedLevels = levels.filter((level) => {
      const normalizedLevel = normalizeSearchText(level);
      const normalizedLevelLabel = normalizeSearchText(levelLabelMap[level] ?? level);

      return (
        normalizedText.includes(normalizedLevel) || normalizedText.includes(normalizedLevelLabel)
      );
    });

    setSelectedSport((previous) => (previous === matchedSport ? previous : matchedSport));
    setSelectedCategory((previous) =>
      previous === matchedCategory ? previous : matchedCategory,
    );
    setSelectedLevels((previous) =>
      areArraysEqual(previous, matchedLevels) ? previous : matchedLevels,
    );
  }, [categories, levels, query, sports]);

  useEffect(() => {
    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;

    const fetchFilteredProducts = async () => {
      const levelsToQuery = selectedLevels.length > 0 ? selectedLevels : [null];

      try {
        const requests = levelsToQuery.map(async (level) => {
          const params = new URLSearchParams();
          if (selectedSport !== "ALL") {
            params.set("sport", selectedSport);
          }
          if (level) {
            params.set("level", level);
          }

          const url = params.toString() ? `/api/products?${params.toString()}` : "/api/products";
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("products");
          }

          return (await response.json()) as ApiProduct[];
        });

        const resolved = await Promise.all(requests);
        if (requestId !== latestRequestIdRef.current) {
          return;
        }

        const merged = resolved.flat();
        const normalized = normalizeApiProducts(merged);
        setApiProducts(normalized);
        if (selectedSport === "ALL" && selectedLevels.length === 0) {
          setTotalProductsCount(normalized.length);
        }
      } catch {
        // Keep previous successful payload if request fails.
      }
    };

    void fetchFilteredProducts();
  }, [selectedLevels, selectedSport]);

  const filteredProducts = useMemo(() => {
    const filtered = apiProducts.filter((product) => {
      const matchesSport = selectedSport === "ALL" || product.sports.includes(selectedSport);
      const matchesCategory = selectedCategory === "ALL" || product.category === selectedCategory;
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
        ...product.sports.map((sport) => sportNameByKey[sport] ?? sport),
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

      return (
        getRelevanceScore(right, normalizedQuery, sportNameByKey) -
        getRelevanceScore(left, normalizedQuery, sportNameByKey)
      );
    });

    return sorted;
  }, [
    apiProducts,
    normalizedQuery,
    selectedCategory,
    selectedLevels,
    selectedSport,
    sortBy,
    sportNameByKey,
  ]);

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
                    {sportOptions.map((sport) => (
                      <FilterChip
                        key={sport.key}
                        label={toSentenceCase(sport.name)}
                        active={selectedSport === sport.key}
                        onClick={() => setSelectedSport(sport.key)}
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
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] [color:var(--color-primary)]">
                  {filteredProducts.length} resultat{filteredProducts.length > 1 ? "s" : ""} sur{" "}
                  {totalProductsCount}
                </p>

                <div className="relative w-full md:w-44">
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-primary)]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="M3 5h14l-5.4 6.2v3.8l-3.2-1.8v-2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <select
                    id="products-sort"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    aria-label="Trier les produits"
                    className="w-full rounded-lg border border-[var(--color-primary)] bg-[var(--color-secondary)] py-2 pr-2.5 pl-8 text-xs text-[var(--color-primary)] outline-none [&>option]:text-[var(--color-primary)]"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix decroissant</option>
                    <option value="name-asc">Nom A-Z</option>
                  </select>
                </div>
              </div>

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
                      {product.images[0] ? (
                        <div className="-mx-2 -mt-2 mb-4 overflow-hidden rounded-xl">
                          <img
                            src={product.images[0]}
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
                        <span className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                          {categoryLabelMap[product.category] ?? product.category}
                        </span>
                        <p className="rounded-[2px] bg-[#f2e933] px-2 py-1 text-lg font-black leading-none text-black">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <h2 className="mt-3 text-2xl leading-tight text-[var(--color-primary)] [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed [color:var(--color-primary)]">
                        {product.description}
                      </p>

                      <div className="mt-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide [color:var(--color-primary)]">
                          Sports
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {product.sports.map((sport) => (
                            <span
                              key={`${product.id}-sport-${sport}`}
                              className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]"
                            >
                              {sportNameByKey[sport] ?? sport}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
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

function normalizeApiProducts(rows: ApiProduct[]): Product[] {
  const deduped = new Map<string, Product>();

  rows.forEach((row) => {
    const fallback = mockById.get(row.id);
    const parsedPrice =
      typeof row.price === "number" ? row.price : Number.parseFloat(String(row.price));

    deduped.set(row.id, {
      id: row.id,
      category: fallback?.category ?? "MATERIEL",
      sports: row.sports,
      levels: row.levels,
      name: row.name,
      description: fallback?.description ?? "",
      price: Number.isFinite(parsedPrice) ? parsedPrice : fallback?.price ?? 0,
      images: fallback?.images ?? (row.card_image ? [row.card_image] : []),
    });
  });

  return Array.from(deduped.values());
}

function getRelevanceScore(
  product: Product,
  normalizedQuery: string,
  sportNameByKey: Record<string, string>,
): number {
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

  if (
    product.sports.some((sport) =>
      (sportNameByKey[sport] ?? sport).toLowerCase().includes(normalizedQuery),
    )
  ) {
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

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function areArraysEqual(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
}

function toSentenceCase(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (normalized.length === 0) {
    return value;
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
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
