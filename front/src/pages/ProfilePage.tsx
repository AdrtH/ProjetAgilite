export default function ProfilePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full [background:var(--color-primary)] opacity-12 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full [background:var(--color-primary)] opacity-12 blur-3xl" />

      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-12">
        <div className="rounded-3xl border border-black/10 bg-white/95 p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black text-white [background:var(--color-primary)]">
                QA
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] [color:var(--color-primary)]">
                  Profil utilisateur
                </p>
                <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
                  Jhon do
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Membre depuis janvier 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold [color:var(--color-primary)]"
              >
                Modifier mes infos
              </button>
              <button
                type="button"
                className="rounded-full px-5 py-2 text-sm font-semibold text-white [background:var(--color-primary)]"
              >
                Mettre à jour mon profil sportif
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-8 md:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Compte
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">Informations</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">E-mail</dt>
              <dd className="mt-1 font-medium text-slate-800">
                jhon.do@mail.com
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">Téléphone</dt>
              <dd className="mt-1 font-medium text-slate-800">06 00 00 00 00</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">Ville</dt>
              <dd className="mt-1 font-medium text-slate-800">Lille</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Pratique
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">Profil sportif</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">Sport principal</dt>
              <dd className="mt-1 font-medium text-slate-800">Running</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">Niveau</dt>
              <dd className="mt-1 font-medium text-slate-800">Confirmé</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">Fréquence</dt>
              <dd className="mt-1 font-medium text-slate-800">
                3 séances par semaine
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Budget
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">
            Préférences d&apos;achat
          </h2>
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Fourchette favorite</p>
            <p className="mt-1 text-2xl font-black text-slate-900">40 EUR - 180 EUR</p>
            <p className="mt-1 text-sm text-slate-600">
              Magasin préféré : Décathlon Lille
            </p>
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
                Activité récente
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Résumé de vos recommandations
              </h2>
            </div>
            <a
              href="/products"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white [background:var(--color-primary)]"
            >
              Lancer une recherche
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-3xl font-black text-slate-900">12</p>
              <p className="mt-1 text-sm text-slate-600">produits recommandés</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-3xl font-black text-slate-900">3</p>
              <p className="mt-1 text-sm text-slate-600">
                produits en favoris
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
