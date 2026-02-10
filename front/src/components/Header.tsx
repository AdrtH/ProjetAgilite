export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold [color:var(--color-primary)]">
          Le Compagnon d'Equipement
        </a>

        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold [color:var(--color-primary)]"
          >
            Connexion
          </a>
          <a
            href="/register"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white [background:var(--color-primary)]"
          >
            Inscription
          </a>
        </div>
      </div>
    </header>
  );
}
