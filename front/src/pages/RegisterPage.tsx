import { useMemo, useState } from "react";

const highlights = [
  "Créez votre espace pour enregistrer vos préférences sportives.",
  "Accédez ensuite aux recommandations personnalisées.",
  "Retrouvez votre profil à tout moment après connexion.",
];

const levelOptions = ["Debutant", "Intermediaire", "Confirme", "Expert"];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    sport: "",
    niveauSportif: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = useMemo(() => {
    return (
      form.name.trim() !== "" &&
      form.password.trim() !== "" &&
      form.sport.trim() !== "" &&
      form.niveauSportif.trim() !== ""
    );
  }, [form]);

  const submitRegistration = async () => {
    let response: Response;
    try {
      response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } catch {
      throw new Error("Impossible de contacter le serveur.");
    }

    if (response.ok) {
      return;
    }

    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    const serverError = body?.error ?? "Inscription refusee par le serveur.";
    throw new Error(serverError);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <div className="grid overflow-hidden rounded-[32px] border border-[#722F37]/20 shadow-[0_28px_80px_rgba(114,47,55,0.22)] lg:grid-cols-[1.05fr_1fr]">
        <section className="flex flex-col justify-center gap-5 bg-gradient-to-br from-[#722F37] via-[#672A32] to-[#5A2229] px-6 py-8 text-[#EFDFBB] md:px-10 md:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EFDFBB]/85">
            Le Compagnon d&apos;Équipement
          </p>
          <h1 className="max-w-[13ch] text-3xl leading-tight [font-family:'Fraunces',serif] md:text-4xl">
            Créez votre compte
          </h1>
          <p className="max-w-[34ch] text-sm leading-relaxed text-[#EFDFBB]/90 md:text-base">
            Créez votre compte en envoyant directement les informations au back.
          </p>

          <ul className="grid gap-3 text-sm md:text-base" aria-label="Avantages du compte">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#EFDFBB]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="grid content-center gap-5 bg-gradient-to-b from-[#FFF9ED] to-[#F8EED7] px-6 py-8 text-[#722F37] md:px-8 md:py-10"
          aria-label="Formulaire d&apos;inscription"
        >
          <div>
            <h2 className="mt-3 text-3xl leading-tight [font-family:'Fraunces',serif]">
              Inscription
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#722F37]/80">
              Renseignez les 4 champs attendus par votre API.
            </p>
          </div>

          <form
            className="grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!isFormValid || isSubmitting) {
                return;
              }

              setErrorMessage("");
              setIsSubmitting(true);

              try {
                await submitRegistration();
                sessionStorage.setItem(
                  "auth_notice",
                  "Compte cree avec succes. Connectez-vous."
                );
                window.location.pathname = "/login";
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : "Erreur lors de l'inscription.";
                setErrorMessage(message);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <label className="grid gap-1.5">
              <span className="text-xs font-bold">Email</span>
              <input
                className="w-full rounded-xl border border-[#722F37]/25 bg-white/80 px-3 py-2.5 text-[#722F37] outline-none transition focus:border-[#722F37]/70 focus:ring-4 focus:ring-[#722F37]/15"
                type="email"
                placeholder="example@gmail.com"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-bold">Mot de passe</span>
              <input
                className="w-full rounded-xl border border-[#722F37]/25 bg-white/80 px-3 py-2.5 text-[#722F37] outline-none transition focus:border-[#722F37]/70 focus:ring-4 focus:ring-[#722F37]/15"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-bold">Sport</span>
              <input
                className="w-full rounded-xl border border-[#722F37]/25 bg-white/80 px-3 py-2.5 text-[#722F37] outline-none transition focus:border-[#722F37]/70 focus:ring-4 focus:ring-[#722F37]/15"
                type="text"
                placeholder="Running"
                value={form.sport}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, sport: event.target.value }))
                }
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-bold">Niveau sportif</span>
              <select
                className="w-full rounded-xl border border-[#722F37]/25 bg-white/80 px-3 py-2.5 text-[#722F37] outline-none transition focus:border-[#722F37]/70 focus:ring-4 focus:ring-[#722F37]/15"
                value={form.niveauSportif}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, niveauSportif: event.target.value }))
                }
              >
                <option value="" disabled>
                  Selectionner un niveau
                </option>
                {levelOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            {errorMessage ? (
              <p className="text-xs font-bold text-red-700">{errorMessage}</p>
            ) : null}
            <button
              className="mt-1 rounded-xl bg-[#722F37] px-4 py-3 font-bold text-[#EFDFBB] transition hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[#722F37]/85">
            <span>Déjà un compte ?</span>
            <button
              className="rounded-full border border-[#722F37]/35 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#722F37] transition hover:bg-white"
              type="button"
              onClick={() => {
                window.location.pathname = "/login";
              }}
            >
              Se connecter
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
