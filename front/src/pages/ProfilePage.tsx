import { type ReactNode, useEffect, useMemo, useState } from "react";

type ApiUser = {
  id: number;
  name: string;
  sport: string;
  level: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const connectedName = sessionStorage.getItem("auth_name")?.trim().toLowerCase() ?? "";
      if (connectedName === "") {
        setErrorMessage("Aucun utilisateur connecte.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/:name?name=${encodeURIComponent(connectedName)}`);
        if (!response.ok) {
          throw new Error("user");
        }

        const payload = (await response.json()) as ApiUser;
        setUser(payload);
      } catch {
        setErrorMessage("Impossible de recuperer le profil utilisateur.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadUser();
  }, []);

  const initials = useMemo(() => {
    const name = user?.name ?? sessionStorage.getItem("auth_name") ?? "";
    const first = name.trim().charAt(0).toUpperCase();
    return first || "U";
  }, [user?.name]);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 pb-10 pt-12">
        <section className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
          <p className="text-sm [color:var(--color-primary)]">Chargement du profil...</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 pb-10 pt-12">
        <section className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-black text-[var(--color-primary)] md:text-4xl">
            Profil
          </h1>
          <p className="mt-3 text-sm [color:var(--color-primary)]">
            {errorMessage || "Utilisateur non disponible."}
          </p>
          <a
            href="/login"
            className="mt-5 inline-block rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold [color:var(--color-primary)]"
          >
            Aller a la connexion
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-10 pt-12">
      <section className="rounded-3xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black [color:var(--color-secondary)] [background:var(--color-primary)]">
            {initials}
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] [color:var(--color-primary)]">
              <IconBadge>
                <UserIcon />
              </IconBadge>
              Profil utilisateur
            </p>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-primary)] md:text-4xl">
              {user.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            <IconBadge>
              <AccountIcon />
            </IconBadge>
            Compte
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">Informations</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="flex items-center gap-2 [color:var(--color-primary)]">
                <IconBadge>
                  <MailIcon />
                </IconBadge>
                E-mail
              </dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">{user.name}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            <IconBadge>
              <ActivityIcon />
            </IconBadge>
            Pratique
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">Profil sportif</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="flex items-center gap-2 [color:var(--color-primary)]">
                <IconBadge>
                  <SportIcon />
                </IconBadge>
                Sport principal
              </dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">{user.sport}</dd>
            </div>
            <div className="rounded-xl bg-[var(--color-secondary)] p-3">
              <dt className="flex items-center gap-2 [color:var(--color-primary)]">
                <IconBadge>
                  <LevelIcon />
                </IconBadge>
                Niveau
              </dt>
              <dd className="mt-1 font-medium text-[var(--color-primary)]">{user.level}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-[var(--color-primary)] bg-[var(--color-secondary)] p-5 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] [color:var(--color-primary)]">
            <IconBadge>
              <CompassIcon />
            </IconBadge>
            Navigation
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">
            Actions rapides
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="/products"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold [color:var(--color-secondary)] [background:var(--color-primary)]"
            >
              <ProductsIcon />
              Voir les produits
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M6.5 15c.8-1.2 1.8-2 3-2s2.2.8 3 2" />
      <path d="M14 10h6" />
      <path d="M14 14h4" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h4l2-4 3 8 2-4h7" />
      <path d="M3 19h18" />
    </svg>
  );
}

function SportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 18 18 6" />
      <path d="M7 7h3v3H7z" />
      <path d="M14 14h3v3h-3z" />
      <path d="M5 19h4" />
      <path d="M15 5h4" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19h16" />
      <path d="m6 15 4-4 3 2 5-6" />
      <path d="M18 7h-3" />
      <path d="M18 7v3" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 8h16l-1 11H5L4 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

type IconBadgeProps = Readonly<{ children: ReactNode }>;

function IconBadge({ children }: IconBadgeProps) {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)]">
      {children}
    </span>
  );
}
