import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
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
  while (end > 1 && path.charCodeAt(end - 1) === 47) {
    end -= 1;
  }

  return path.slice(0, end);
};

export default function App() {
  const pathname =
    typeof window !== "undefined" ? normalizePath(window.location.pathname) : "/";

  if (pathname === "/login") {
    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
        <Header />
        <LoginPage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/register") {
    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
        <Header />
        <RegisterPage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/profil") {
    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
        <Header />
        <ProfilePage />
        <Footer />
      </div>
    );
  }

  if (pathname === "/products") {
    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
        <Header />
        <ProductsPage />
        <Footer />
      </div>
    );
  }

  if (pathname.startsWith("/product/") && pathname.length > "/product/".length) {
    const productId = decodeURIComponent(pathname.slice("/product/".length));

    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
        <Header />
        <ProductDetailsPage productId={productId} />
        <Footer />
      </div>
    );
  }

  if (pathname.startsWith("/products/") && pathname.length > "/products/".length) {
    const productId = decodeURIComponent(pathname.slice("/products/".length));

    return (
      <div className="min-h-screen [background:var(--color-secondary)]">
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
    <div className="min-h-screen [background:var(--color-secondary)]">
      <Header />

      {isNotFound ? (
        <NotFoundPage pathname={pathname} />
      ) : (
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full [background:var(--color-primary)] opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full [background:var(--color-primary)] opacity-20 blur-3xl" />

          <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-12 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] [color:var(--color-primary)]">
                Le Compagnon d&apos;Equipement
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight [color:var(--color-primary)] md:text-6xl">
                Recherche directement le materiel qu&apos;il te faut
              </h1>
              <p className="mt-6 max-w-2xl text-lg [color:var(--color-primary)]/85">
                Trouve rapidement les produits adaptes a ton sport, ton niveau et
                ton budget, puis accede aux meilleures recommandations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={productsHref}
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 [background:var(--color-primary)]"
                >
                  Rechercher un produit
                </a>
                <a
                  href="/register"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold [color:var(--color-primary)]"
                >
                  Je m&apos;inscrit
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-sm">
              <h2 className="text-xl font-bold [color:var(--color-primary)]">
                Ce que tu peux faire
              </h2>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="rounded-xl bg-slate-50 p-4">
                  Definir ton sport, ton niveau et ta frequence.
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  Recevoir des articles recommandes selon ton profil.
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  Acheter selon ton budget et la disponibilite en magasin.
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-12">
            <div className="rounded-3xl border-2 border-[var(--color-primary)] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                Recherche instantanee de produits
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Saisis ton besoin et accede directement aux equipements les plus
                pertinents pour ta pratique sportive.
              </p>
              <a
                href={productsHref}
                className="mt-5 inline-block rounded-xl px-5 py-3 text-sm font-semibold text-white [background:var(--color-primary)]"
              >
                Commencer une recherche
              </a>
            </div>
          </section>

          <section
            id="fonctionnement"
            className="mx-auto w-full max-w-6xl px-6 pb-12"
          >
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                Comment ca marche
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-black/10 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    1. Cree ton profil
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Tu indiques ton sport, ton niveau et ta pratique.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    2. Recois des recommandations
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Le site te propose les produits les plus pertinents.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    3. Achete simplement
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Tu compares, verifies le stock et passes commande.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="inscription" className="mx-auto w-full max-w-6xl px-6 pb-16">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold [color:var(--color-primary)]">
                Pourquoi utiliser Le Compagnon d&apos;Equipement
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Une experience simple pour t&apos;aider a acheter le bon
                equipement, sans perdre de temps a comparer des centaines de
                produits.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    Recommandations personnalisees
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Des suggestions adaptees a ton sport et a ton niveau.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    Budget maitrise
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Tu choisis ta fourchette de prix avant de commander.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold [color:var(--color-primary)]">
                    Disponibilite en temps reel
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Verifie le stock magasin avant de valider ton achat.
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
