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
    <main className="register-shell">
      <div className="register-layout">
        <section className="register-hero">
          <p className="register-kicker">Le Compagnon d&apos;Équipement</p>
          <h1>Créez votre compte</h1>
          <p className="register-intro">
            Inscription front uniquement pour le moment. Aucun envoi de données
            vers le back.
          </p>

          <ul className="register-highlights" aria-label="Avantages du compte">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="register-card" aria-label="Formulaire d&apos;inscription">
          <div>
            <p className="register-chip">Étape {step} sur 2</p>
            <h2>Inscription</h2>
            <p className="register-copy">
              {step === 1
                ? "Renseignez votre e-mail et votre mot de passe."
                : "Complétez votre profil sportif et votre budget."}
            </p>
          </div>

          <form
            className="register-form"
            onSubmit={(event) => {
              event.preventDefault();

              if (step === 1 && isStepOneValid) {
                transitionToStep(2);
              }
            }}
          >
            <div
              className={`step-panel ${
                motionPhase === "idle" ? "" : `is-${motionPhase} ${motionDirection}`
              }`}
            >
              {step === 1 ? (
              <>
                <label className="field">
                  <span>E-mail</span>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="prenom@mail.com"
                    value={account.email}
                    onChange={(event) =>
                      setAccount((prev) => ({ ...prev, email: event.target.value }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Mot de passe</span>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="********"
                    value={account.password}
                    onChange={(event) =>
                      setAccount((prev) => ({ ...prev, password: event.target.value }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Confirmer le mot de passe</span>
                  <input
                    className="form-input"
                    type="password"
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

                <button className="register-submit" type="submit" disabled={!isStepOneValid}>
                  Suivant
                </button>
              </>
            ) : (
              <>
                <div className="field-row">
                  <label className="field">
                    <span>Sport principal</span>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Running"
                      value={profile.sport}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, sport: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Niveau</span>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Débutant / Confirmé / Expert"
                      value={profile.level}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, level: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label className="field">
                    <span>Fréquence de pratique</span>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="3 séances par semaine"
                      value={profile.frequency}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, frequency: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Magasin préféré</span>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Décathlon Lille"
                      value={profile.store}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, store: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label className="field">
                    <span>Budget minimum (EUR)</span>
                    <input
                      className="form-input"
                      type="number"
                      min="0"
                      placeholder="40"
                      value={profile.budgetMin}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, budgetMin: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Budget maximum (EUR)</span>
                    <input
                      className="form-input"
                      type="number"
                      min="0"
                      placeholder="180"
                      value={profile.budgetMax}
                      onChange={(event) =>
                        setProfile((prev) => ({ ...prev, budgetMax: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <div className="register-actions">
                  <button
                    className="register-back"
                    type="button"
                    onClick={() => transitionToStep(1)}
                  >
                    Retour
                  </button>

                  {isStepTwoValid ? (
                    <button className="register-submit" type="submit">
                      Créer mon compte
                    </button>
                  ) : (
                    <p className="register-hint">Complétez tous les champs.</p>
                  )}
                </div>
              </>
            )}
            </div>
          </form>

          <div className="register-footnote">
            <span>Déjà un compte ?</span>
            <button
              className="register-login"
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
