import { useEffect, useRef } from "react";

export default function Header() {
  const searchParams = new URLSearchParams(globalThis.window?.location.search ?? "");
  const currentQuery = searchParams.get("q")?.trim() ?? "";
  const searchInputRef = useRef<HTMLInputElement>(null);
  const connectedName = sessionStorage.getItem("auth_name")?.trim() ?? "";
  const isConnected = connectedName !== "";
  const profileLetter = connectedName.charAt(0).toUpperCase() || "U";

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
          Le Compagnon d'Equipement
        </a>

        <form
          action="/products"
          method="get"
          autoComplete="off"
          className="order-3 ml-auto w-full max-w-[340px] md:order-none md:w-[300px] lg:w-[340px]"
          role="search"
          aria-label="Recherche globale produit"
        >
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1.5">
            <input
              ref={searchInputRef}
              type="search"
              name="q"
              autoComplete="off"
              defaultValue={currentQuery}
              placeholder="Rechercher un produit..."
              className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)]"
              aria-label="Rechercher"
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

        {isConnected ? (
          <a
            href="/profil"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] [color:var(--color-secondary)]"
            aria-label="Profil utilisateur"
            title="Profil"
          >
            <span className="relative">
              <ProfileIcon className="h-5 w-5" />
              <span className="absolute -bottom-2 -right-2 rounded-full bg-[var(--color-secondary)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-primary)]">
                {profileLetter}
              </span>
            </span>
          </a>
        ) : (
          <div className="flex overflow-hidden rounded-full border border-[var(--color-primary)]">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-semibold [color:var(--color-primary)] [background:var(--color-secondary)] transition hover:bg-gray-50"
            >
              Connexion
            </a>
            <a
              href="/register"
              className="border-l border-[var(--color-primary)] px-4 py-2 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)] transition hover:brightness-110"
            >
              Inscription
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

type ProfileIconProps = Readonly<{ className?: string }>;

function ProfileIcon({ className = "h-4 w-4" }: ProfileIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}
