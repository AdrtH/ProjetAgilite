import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";

export default function App() {
  if (normalizedPath === "/login") {
    return <LoginPage />;
  }

  if (normalizedPath === "/register") {
    return <RegisterPage />;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold [color:var(--color-secondary)]">
        Palette SCSS + Tailwind OK
      </h1>

      <div className="mt-6 rounded-xl bg-white/80 p-5 shadow">
        <p className="font-medium [color:var(--color-secondary)]">
          Si tu vois ces couleurs, la palette est bien chargée.
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded border border-black/10 [background:var(--color-primary)]" />
            <span className="text-sm [color:var(--color-secondary)]">
              Primary
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded border border-black/10 [background:var(--color-secondary)]" />
            <span className="text-sm [color:var(--color-secondary)]">
              Secondary
            </span>
          </div>
        </div>

        <button className="mt-5 rounded px-4 py-2 text-white [background:var(--color-secondary)]">
          Bouton test
        </button>
      </div>
    </div>
  );
}
