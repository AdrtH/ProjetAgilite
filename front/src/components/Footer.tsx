export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 border-t border-[var(--color-secondary)] [background:var(--color-primary)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 text-sm [color:var(--color-secondary)]">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold [color:var(--color-secondary)]">Le Compagnon d'Equipement</p>
            <p className="mt-2">
              Trouve le bon materiel selon ton sport, ton niveau et ton budget.
            </p>
          </div>

          <div>
            <p className="font-semibold [color:var(--color-secondary)]">Acces rapide</p>
            <div className="mt-2 space-y-1">
              <a href="/login" className="block hover:underline">
                Connexion
              </a>
              <a href="/register" className="block hover:underline">
                Inscription
              </a>
              <a href="/products" className="block hover:underline">
                Recherche produit
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold [color:var(--color-secondary)]">Disponibilite</p>
            <p className="mt-2">
              Recommandations personnalisees et verification du stock avant
              achat.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-secondary)] pt-5">
          <p className="text-xs [color:var(--color-secondary)]">
            © 2026 Le Compagnon d&apos;Equipement. Tous droits reserves.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-full border border-[var(--color-secondary)] px-4 py-2 text-xs font-semibold [color:var(--color-secondary)]"
          >
            Remonter en haut
          </button>
        </div>
      </div>
    </footer>
  );
}
