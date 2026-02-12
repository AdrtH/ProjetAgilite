export default function ProfilePage() {
  return (
    <main className="relative overflow-hidden">
      
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-12">
        <div className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black [color:var(--color-secondary)] [background:var(--color-primary)]">
                QA
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] [color:var(--color-primary)]">
                  Profil utilisateur
                </p>
                <h1 className="mt-2 text-3xl font-black text-[var(--color-primary)] md:text-4xl">
                  Jhon do
                </h1>
                <p className="mt-2 text-sm [color:var(--color-primary)]">
                  Membre depuis janvier 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold [color:var(--color-primary)]"
              >
                Modifier mes infos
              </button>
              <button
                type="button"
                className="rounded-full px-5 py-2 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
              >
                Mettre à jour mon profil sportif
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-8 md:grid-cols-3">
        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Compte
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">Informations</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">E-mail</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">
                jhon.do@mail.com
              </dd>
            </div>
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">Téléphone</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">06 00 00 00 00</dd>
            </div>
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">Ville</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">Lille</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Pratique
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">Profil sportif</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">Sport principal</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">Running</dd>
            </div>
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">Niveau</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">Confirmé</dd>
            </div>
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="[color:var(--color-primary)]">Fréquence</dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">
                3 séances par semaine
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            Budget
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">
            Préférences d&apos;achat
          </h2>
          <div className="mt-4 rounded-xl bg-[var(--color-secondary)] p-4">
            <p className="text-sm [color:var(--color-primary)]">Fourchette favorite</p>
            <p className="mt-1 text-2xl font-black text-[var(--color-primary)]">40 EUR - 180 EUR</p>
            <p className="mt-1 text-sm [color:var(--color-primary)]">
              Magasin préféré : Décathlon Lille
            </p>
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
                Activité récente
              </p>
              <h2 className="mt-2 text-2xl font-black text-[var(--color-primary)]">
                Résumé de vos recommandations
              </h2>
            </div>
            <a
              href="/products"
              className="rounded-full px-5 py-2 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
            >
              Lancer une recherche
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-secondary)] p-5">
              <p className="text-3xl font-black text-[var(--color-primary)]">12</p>
              <p className="mt-1 text-sm [color:var(--color-primary)]">produits recommandés</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-secondary)] p-5">
              <p className="text-3xl font-black text-[var(--color-primary)]">3</p>
              <p className="mt-1 text-sm [color:var(--color-primary)]">
                produits en favoris
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
