const highlights = [
  "Retrouvez vos recommandations d'équipement personnalisées.",
  "Suivez votre profil sportif et vos budgets enregistrés.",
  "Accédez rapidement aux produits vus récemment.",
];

export default function LoginPage() {
  return (
    <main className="register-shell">
      <div className="register-layout">
        <section className="register-hero">
          <p className="register-kicker">Le Compagnon d&apos;Équipement</p>
          <h1>Connectez-vous</h1>
          <p className="register-intro">
            Connexion front uniquement pour le moment. Aucun envoi de données
            vers le back.
          </p>

          <ul className="register-highlights" aria-label="Avantages de connexion">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="register-card" aria-label="Formulaire de connexion">
          <div>
            <p className="register-chip">Connexion</p>
            <h2>Bon retour</h2>
            <p className="register-copy">
              Renseignez votre e-mail et votre mot de passe.
            </p>
          </div>

          <form className="register-form" onSubmit={(event) => event.preventDefault()}>
            <label className="field">
              <span>E-mail</span>
              <input className="form-input" type="email" placeholder="prenom@mail.com" />
            </label>

            <label className="field">
              <span>Mot de passe</span>
              <input className="form-input" type="password" placeholder="********" />
            </label>

            <button className="register-submit" type="submit">
              Se connecter
            </button>
          </form>

          <div className="register-footnote">
            <span>Pas encore de compte ?</span>
            <button
              className="register-login"
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
