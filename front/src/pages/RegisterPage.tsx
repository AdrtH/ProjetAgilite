import { useEffect, useMemo, useRef, useState } from "react";

const highlights = [
  "Créez votre espace pour enregistrer vos préférences sportives.",
  "Accédez ensuite aux recommandations personnalisées.",
  "Retrouvez votre profil à tout moment après connexion.",
];

type RegisterStep = 1 | 2;
type MotionPhase = "idle" | "leaving" | "entering";
type MotionDirection = "forward" | "backward";

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>(1);
  const [motionPhase, setMotionPhase] = useState<MotionPhase>("idle");
  const [motionDirection, setMotionDirection] = useState<MotionDirection>("forward");
  const timeoutRef = useRef<number[]>([]);
  const [account, setAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = useState({
    sport: "",
    level: "",
    frequency: "",
    store: "",
    budgetMin: "",
    budgetMax: "",
  });

  const isStepOneValid = useMemo(() => {
    return (
      account.email.trim() !== "" &&
      account.password.trim() !== "" &&
      account.confirmPassword.trim() !== "" &&
      account.password === account.confirmPassword
    );
  }, [account]);

  const isStepTwoValid = useMemo(() => {
    const min = Number(profile.budgetMin);
    const max = Number(profile.budgetMax);

    return (
      profile.sport.trim() !== "" &&
      profile.level.trim() !== "" &&
      profile.frequency.trim() !== "" &&
      profile.store.trim() !== "" &&
      profile.budgetMin.trim() !== "" &&
      profile.budgetMax.trim() !== "" &&
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      max >= min
    );
  }, [profile]);

  const transitionToStep = (nextStep: RegisterStep) => {
    if (nextStep === step || motionPhase !== "idle") {
      return;
    }

    const direction: MotionDirection = nextStep > step ? "forward" : "backward";
    setMotionDirection(direction);
    setMotionPhase("leaving");

    const leaveTimeout = window.setTimeout(() => {
      setStep(nextStep);
      setMotionPhase("entering");

      const enterTimeout = window.setTimeout(() => {
        setMotionPhase("idle");
      }, 240);

      timeoutRef.current.push(enterTimeout);
    }, 170);

    timeoutRef.current.push(leaveTimeout);
  };

  useEffect(() => {
    return () => {
      timeoutRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRef.current = [];
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <div className="grid overflow-hidden rounded-[32px] border border-[var(--color-primary)] shadow-sm lg:grid-cols-[1.05fr_1fr]">
        <section className="flex flex-col justify-center gap-5 bg-[var(--color-primary)] px-6 py-8 text-[var(--color-secondary)] md:px-10 md:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] [color:var(--color-secondary)]">
            Le Compagnon d&apos;Équipement
          </p>
          <h1 className="max-w-[13ch] text-3xl leading-tight [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif] md:text-4xl">
            Créez votre compte
          </h1>
          <p className="tone-zone max-w-[34ch] text-sm leading-relaxed [color:var(--color-primary)] md:text-base">
            Inscription front uniquement pour le moment. Aucun envoi de données
            vers le back.
          </p>

          <ul className="grid gap-3 text-sm md:text-base" aria-label="Avantages du compte">
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
          aria-label="Formulaire d&apos;inscription"
        >
          <div>
            <p className="inline-flex rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]">
              Étape {step} sur 2
            </p>
            <h2 className="mt-3 text-3xl leading-tight [font-family:'Decathlon Sans','Segoe UI',Tahoma,sans-serif]">
              Inscription
            </h2>
            <p className="tone-zone mt-2 text-sm leading-relaxed [color:var(--color-primary)]">
              {step === 1
                ? "Renseignez votre e-mail et votre mot de passe."
                : "Complétez votre profil sportif et votre budget."}
            </p>
          </div>

          <form
            className="grid gap-3"
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();

              if (step === 1 && isStepOneValid) {
                transitionToStep(2);
              }
            }}
          >
            <div
              className={`grid gap-3 transition-all duration-200 ease-out ${
                motionPhase === "idle"
                  ? "translate-x-0 opacity-100"
                  : motionPhase === "leaving"
                    ? `${motionDirection === "forward" ? "-translate-x-4" : "translate-x-4"} pointer-events-none opacity-0`
                    : `${motionDirection === "forward" ? "translate-x-4" : "-translate-x-4"} opacity-0`
              }`}
            >
              {step === 1 ? (
              <>
                <label className="grid gap-1.5">
                  <span className="text-xs font-bold">E-mail</span>
                  <input
                    className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                    type="email"
                    autoComplete="off"
                    placeholder="prenom@mail.com"
                    value={account.email}
                    onChange={(event) =>
                      setAccount((prev) => ({ ...prev, email: event.target.value }))
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
                    value={account.password}
                    onChange={(event) =>
                      setAccount((prev) => ({ ...prev, password: event.target.value }))
                    }
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-xs font-bold">Confirmer le mot de passe</span>
                  <input
                    className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                    type="password"
                    autoComplete="off"
                    placeholder="********"
                    value={account.confirmPassword}
                    onChange={(event) =>
                      setAccount((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }))
                    }
                  />
                </label>

                <button
                  className="mt-1 rounded-xl bg-[var(--color-primary)] px-4 py-3 font-bold text-[var(--color-secondary)] transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                  type="submit"
                  disabled={!isStepOneValid}
                >
                  Suivant
                </button>
              </>
            ) : (
              <>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Sport principal</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="text"
                      autoComplete="off"
                      placeholder="Running"
                      value={profile.sport}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, sport: event.target.value }))
                      }
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Niveau</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="text"
                      autoComplete="off"
                      placeholder="Débutant / Confirmé / Expert"
                      value={profile.level}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, level: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Fréquence de pratique</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="text"
                      autoComplete="off"
                      placeholder="3 séances par semaine"
                      value={profile.frequency}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, frequency: event.target.value }))
                      }
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Magasin préféré</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="text"
                      autoComplete="off"
                      placeholder="Décathlon Lille"
                      value={profile.store}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, store: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Budget minimum (EUR)</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="number"
                      autoComplete="off"
                      min="0"
                      placeholder="40"
                      value={profile.budgetMin}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, budgetMin: event.target.value }))
                      }
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-bold">Budget maximum (EUR)</span>
                    <input
                      className="w-full rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-2.5 text-gray-500 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-0"
                      type="number"
                      autoComplete="off"
                      min="0"
                      placeholder="180"
                      value={profile.budgetMax}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, budgetMax: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="flex min-h-10 items-center justify-between gap-2">
                  <button
                    className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-secondary)] px-4 py-2.5 font-bold text-[var(--color-primary)] transition hover:bg-[var(--color-secondary)]"
                    type="button"
                    onClick={() => transitionToStep(1)}
                  >
                    Retour
                  </button>

                  {isStepTwoValid ? (
                    <button
                      className="rounded-xl bg-[var(--color-primary)] px-4 py-3 font-bold text-[var(--color-secondary)] transition active:translate-y-px"
                      type="submit"
                    >
                      Créer mon compte
                    </button>
                  ) : (
                    <p className="text-xs font-bold [color:var(--color-primary)]">
                      Complétez tous les champs.
                    </p>
                  )}
                </div>
              </>
            )}
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-sm [color:var(--color-primary)]">
            <span>Déjà un compte ?</span>
            <button
              className="rounded-full border border-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)] transition hover:bg-[var(--color-secondary)]"
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
