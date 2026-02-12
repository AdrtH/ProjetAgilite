import { useEffect, useRef } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { navigateTo } from "../navigation";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const searchParams = new URLSearchParams(globalThis.window?.location.search ?? "");
  const currentQuery = searchParams.get("q")?.trim() ?? "";
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchInput = searchInputRef.current;

    if (!searchInput) {
      return;
    }

    const handleSearch = () => {
      if (searchInput.value.trim() === "") {
        searchInput.form?.requestSubmit();
      }
    };

    searchInput.addEventListener("search", handleSearch);

    return () => {
      searchInput.removeEventListener("search", handleSearch);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-primary)] bg-[var(--color-secondary)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-6 py-4 md:flex-nowrap md:gap-4">
        <a href="/" className="text-lg font-bold [color:var(--color-primary)]">
          {t("Le Compagnon d'Equipement")}
        </a>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const nextQuery = String(formData.get("q") ?? "").trim();
            const params = new URLSearchParams();
            if (nextQuery) {
              params.set("q", nextQuery);
            }

            const nextHref = params.toString() ? `/products?${params.toString()}` : "/products";
            navigateTo(nextHref);
          }}
          autoComplete="off"
          className="order-3 ml-auto w-full max-w-[340px] md:order-none md:w-[300px] lg:w-[340px]"
          role="search"
          aria-label={t("Recherche globale produit")}
        >
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1.5">
            <input
              key={currentQuery}
              ref={searchInputRef}
              type="search"
              name="q"
              autoComplete="off"
              defaultValue={currentQuery}
              placeholder={t("Rechercher un produit...")}
              className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)]"
              aria-label={t("Rechercher")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-[var(--color-primary)]">
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              aria-pressed={language === "fr"}
              className={`px-3 py-2 text-xs font-bold uppercase transition ${
                language === "fr"
                  ? "[color:var(--color-secondary)] [background:var(--color-primary)]"
                  : "[color:var(--color-primary)] [background:var(--color-secondary)] hover:bg-gray-50"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`border-l border-[var(--color-primary)] px-3 py-2 text-xs font-bold uppercase transition ${
                language === "en"
                  ? "[color:var(--color-secondary)] [background:var(--color-primary)]"
                  : "[color:var(--color-primary)] [background:var(--color-secondary)] hover:bg-gray-50"
              }`}
            >
              EN
            </button>
          </div>

          <div className="flex overflow-hidden rounded-full border border-[var(--color-primary)]">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-semibold [color:var(--color-primary)] [background:var(--color-secondary)] transition hover:bg-gray-50"
            >
              {t("Connexion")}
            </a>
            <a
              href="/register"
              className="border-l border-[var(--color-primary)] px-4 py-2 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)] transition hover:brightness-110"
            >
              {t("Inscription")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
