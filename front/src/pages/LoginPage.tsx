import { useMemo, useState } from "react";

const highlights = [
  "Retrouvez vos recommandations d'équipement personnalisées.",
  "Suivez votre profil sportif et vos budgets enregistrés.",
  "Accédez rapidement aux produits vus récemment.",
];

export default function LoginPage() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isFormValid = useMemo(() => {
    return form.name.trim() !== "" && form.password.trim() !== "";
  }, [form]);

  const submitLogin = async () => {
    let response: Response;
    const payload = {
      name: form.name.trim().toLowerCase(),
      password: form.password,
    };

    try {
      response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error("Impossible de contacter le serveur.");
    }

    if (response.ok) {
<<<<<<< HEAD
      return payload.name;
=======
      return;
>>>>>>> a37f639 (connexion login)
    }

    const body = (await response.json().catch(() => null)) as
      | { error?: string; "error : "?: string }
      | null;
    const serverError =
      body?.error ?? body?.["error : "] ?? "Utilisateur ou mot de passe non valide.";
    throw new Error(serverError);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <div className="grid overflow-hidden rounded-[32px] border border-[var(--color-primary)] shadow-sm lg:grid-cols-[1.05fr_1fr]">
        <section className="flex flex-col justify-center gap-5 bg-[var(--color-primary)] px-6 py-8 text-[var(--color-secondary)] md:px-10 md:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] [color:var(--color-secondary)]">
            Le Compagnon d&apos;Équipement
          </p>
          <h1 className="max-w-[13ch] text-3xl leading-tight [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif] md:text-4xl">
            Connectez-vous
          </h1>
          <p className="tone-zone max-w-[34ch] text-sm leading-relaxed [color:var(--color-primary)] md:text-base">
            Connexion front uniquement pour le moment. Aucun envoi de données
            vers le back.
          </p>

          <ul className="grid gap-3 text-sm md:text-base" aria-label="Avantages de connexion">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="grid content-center gap-5 bg-[var(--color-secondary)] px-6 py-8 text-[var(--color-primary)] md:px-8 md:py-10"
          aria-label="Formulaire de connexion"
        >
          <div>
            <p className="inline-flex rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]">
              Connexion
            </p>
            <h2 className="mt-3 text-3xl leading-tight [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
              Bon retour
            </h2>
            <p className="tone-zone mt-2 text-sm leading-relaxed [color:var(--color-primary)]">
              Renseignez votre e-mail et votre mot de passe.
            </p>
          </div>

          <form
            className="grid gap-3"
            autoComplete="off"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!isFormValid || isSubmitting) {
                return;
              }

              setErrorMessage("");
              setSuccessMessage("");
              setIsSubmitting(true);

              try {
<<<<<<< HEAD
                const connectedName = await submitLogin();
                sessionStorage.setItem("auth_name", connectedName);
                setSuccessMessage("Connexion validee.");
                window.location.pathname = "/profil";
=======
                await submitLogin();
                setSuccessMessage("Connexion validee.");
>>>>>>> a37f639 (connexion login)
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : "Erreur lors de la connexion.";
                setErrorMessage(message);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <label className="grid gap-1.5">
              <span className="text-xs font-bold">E-mail</span>
              <input
                className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                type="email"
                autoComplete="off"
                placeholder="prenom@mail.com"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-bold">Mot de passe</span>
              <input
                className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                type="password"
                autoComplete="off"
                placeholder="********"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </label>

            {errorMessage ? (
              <p className="text-xs font-bold text-red-700">{errorMessage}</p>
            ) : null}
            {successMessage ? (
              <p className="text-xs font-bold text-green-700">{successMessage}</p>
            ) : null}

            <button
              className="mt-1 rounded-xl bg-[var(--color-primary)] px-4 py-3 font-bold text-[var(--color-secondary)] transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-sm [color:var(--color-primary)]">
            <span>Pas encore de compte ?</span>
            <button
              className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)] transition hover:bg-[var(--color-secondary)]"
              type="button"
              onClick={() => {
                window.location.pathname = "/register";
              }}
            >
              Créer un compte
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
