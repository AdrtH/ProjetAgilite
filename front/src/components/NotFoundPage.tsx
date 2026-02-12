type NotFoundPageProps = {
  pathname: string;
};

export default function NotFoundPage({ pathname }: NotFoundPageProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] [color:var(--color-primary)]">
        Erreur 404
      </p>
      <h1 className="mt-3 text-4xl font-black [color:var(--color-primary)] md:text-5xl">
        Page introuvable
      </h1>
      <p className="tone-zone mt-4 max-w-xl text-sm [color:var(--color-primary)] md:text-base">
        La page <span className="font-semibold">{pathname}</span> n&apos;existe
        pas ou a ete deplacee.
      </p>
      <a
        href="/"
        className="mt-8 rounded-full px-6 py-3 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
      >
        Retour a l&apos;accueil
      </a>
    </main>
  );
}
