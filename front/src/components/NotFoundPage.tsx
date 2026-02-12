import { useLanguage } from "../i18n/useLanguage";

type NotFoundPageProps = {
  pathname: string;
};

export default function NotFoundPage({ pathname }: NotFoundPageProps) {
  const { t } = useLanguage();

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] [color:var(--color-primary)]">
        {t("Erreur 404")}
      </p>
      <h1 className="mt-3 text-4xl font-black [color:var(--color-primary)] md:text-5xl">
        {t("Page introuvable")}
      </h1>
      <p className="tone-zone mt-4 max-w-xl text-sm [color:var(--color-primary)] md:text-base">
        {t("La page")} <span className="font-semibold">{pathname}</span>{" "}
        {t("n'existe pas ou a ete deplacee.")}
      </p>
      <a
        href="/"
        className="mt-8 rounded-full px-6 py-3 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
      >
        {t("Retour a l'accueil")}
      </a>
    </main>
  );
}
