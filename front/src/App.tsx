import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
import { useLanguage } from "./i18n/useLanguage";
import { navigateTo, onNavigation } from "./navigation";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";

const normalizePath = (path: string): string => {
  if (path === "/") {
    return "/";
  }

  let end = path.length;
  while (end > 1 && path.codePointAt(end - 1) === 47) {
    end -= 1;
  }

  return path.slice(0, end);
};

type RouteSnapshot = {
  pathname: string;
  search: string;
  hash: string;
};

const readCurrentRoute = (): RouteSnapshot => {
  const windowObject = globalThis.window;

  return {
    pathname: windowObject?.location.pathname ?? "/",
    search: windowObject?.location.search ?? "",
    hash: windowObject?.location.hash ?? "",
  };
};

export default function App() {
  const { t } = useLanguage();
  const [route, setRoute] = useState<RouteSnapshot>(readCurrentRoute);
  const pathname = normalizePath(route.pathname);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(readCurrentRoute());
    };

    const unsubscribeNavigation = onNavigation(syncRoute);
    const documentObject = globalThis.document;

    if (!documentObject) {
      return unsubscribeNavigation;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const windowObject = globalThis.window;
      if (!windowObject) {
        return;
      }

      const url = new URL(href, windowObject.location.href);
      if (url.origin !== windowObject.location.origin) {
        return;
      }

      event.preventDefault();
      navigateTo(`${url.pathname}${url.search}${url.hash}`);
    };

    documentObject.addEventListener("click", handleDocumentClick);

    return () => {
      unsubscribeNavigation();
      documentObject.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  if (pathname === "/login") {
    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <LoginPage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/register") {
    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <RegisterPage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/profil") {
    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <ProfilePage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/products") {
    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <ProductsPage />
        <Footer />
      </div>
    );
  }

  if (pathname.startsWith("/product/") && pathname.length > "/product/".length) {
    const productId = decodeURIComponent(pathname.slice("/product/".length));

    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <ProductDetailsPage productId={productId} />
        <Footer />
      </div>
    );
  }

  if (pathname.startsWith("/products/") && pathname.length > "/products/".length) {
    const productId = decodeURIComponent(pathname.slice("/products/".length));

    return (
      <div className="min-h-screen [background:var(--surface-muted)]">
        <Header />
        <ProductDetailsPage productId={productId} />
        <Footer />
      </div>
    );
  }

  const knownRoutes = new Set(["/", "/products"]);
  const isNotFound = !knownRoutes.has(pathname);
  const productsHref = "/products";

  return (
    <div className="min-h-screen [background:var(--surface-muted)]">
      <Header />

      {isNotFound ? (
        <NotFoundPage pathname={pathname} />
      ) : (
        <main>
          <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-12 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] [color:var(--color-primary)]">
                {t("Le Compagnon d'Equipement")}
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight [color:var(--color-primary)] md:text-6xl">
                {t("Recherche directement le materiel qu'il te faut")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg [color:var(--color-primary)]">
                {t(
                  "Trouve rapidement les produits adaptes a ton sport, ton niveau et ton budget, puis accede aux meilleures recommandations.",
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={productsHref}
                  className="rounded-full px-6 py-3 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
                >
                  {t("Rechercher un produit")}
                </a>
                <a
                  href="/register"
                  className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold [color:var(--color-primary)]"
                >
                  {t("Inscription")}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm">
              <h2 className="text-xl font-bold [color:var(--color-primary)]">
                {t("Ce que tu peux faire")}
              </h2>
              <div className="mt-5 space-y-3 text-sm [color:var(--color-primary)]">
                <div className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-4">
                  {t("Definir ton sport, ton niveau et ta frequence.")}
                </div>
                <div className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-4">
                  {t("Recevoir des articles recommandes selon ton profil.")}
                </div>
                <div className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-4">
                  {t("Acheter selon ton budget et la disponibilite en magasin.")}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-12">
            <div className="rounded-3xl border-2 border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                {t("Recherche instantanee de produits")}
              </h2>
              <p className="mt-2 text-sm [color:var(--color-primary)]">
                {t(
                  "Saisis ton besoin et accede directement aux equipements les plus pertinents pour ta pratique sportive.",
                )}
              </p>
              <a
                href={productsHref}
                className="mt-5 inline-block rounded-xl px-5 py-3 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
              >
                {t("Commencer une recherche")}
              </a>
            </div>
          </section>

          <section
            id="fonctionnement"
            className="mx-auto w-full max-w-6xl px-6 pb-12"
          >
            <div className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                {t("Comment ca marche")}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[var(--color-primary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("1. Cree ton profil")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Tu indiques ton sport, ton niveau et ta pratique.")}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-primary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("2. Recois des recommandations")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Le site te propose les produits les plus pertinents.")}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-primary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("3. Achete simplement")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Tu compares, verifies le stock et passes commande.")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="inscription" className="mx-auto w-full max-w-6xl px-6 pb-16">
            <div className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                {t("Pourquoi utiliser Le Compagnon d'Equipement")}
              </h2>
              <p className="mt-2 text-sm [color:var(--color-primary)]">
                {t(
                  "Une experience simple pour t'aider a acheter le bon equipement, sans perdre de temps a comparer des centaines de produits.",
                )}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("Recommandations personnalisees")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Des suggestions adaptees a ton sport et a ton niveau.")}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("Budget maitrise")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Tu choisis ta fourchette de prix avant de commander.")}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    {t("Disponibilite en temps reel")}
                  </p>
                  <p className="mt-2 text-sm [color:var(--color-primary)]">
                    {t("Verifie le stock magasin avant de valider ton achat.")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}
