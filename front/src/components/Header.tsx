import type { MouseEvent } from "react";

export default function Header() {
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold [color:var(--color-primary)]">
          Le Compagnon d'Equipement
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex [color:var(--color-primary)]">
          <a
            href="#fonctionnement"
            onClick={scrollToSection}
            className="hover:opacity-70"
          >
            Fonctionnement
          </a>
          <a
            href="#inscription"
            onClick={scrollToSection}
            className="hover:opacity-70"
          >
            Inscription
          </a>
        </nav>

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
