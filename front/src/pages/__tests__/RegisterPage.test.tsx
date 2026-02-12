import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RegisterPage from "../RegisterPage";
import { jsonResponse } from "../../test/http";

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it("loads sports from backend and shows them in sport select", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = String(input);

      if (url.includes("/api/sports")) {
        return Promise.resolve(
          jsonResponse([
            { key: "BADMINTON", name: "Badminton" },
            { key: "FOOTBALL", name: "FOOTBALL" },
          ]),
        );
      }

      if (url.includes("/api/register")) {
        return Promise.resolve(jsonResponse("success"));
      }

      return Promise.reject(new Error(`Unexpected url: ${url}`));
    });

    render(<RegisterPage />);

    expect(await screen.findByRole("option", { name: "Badminton" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "Football" })).toBeInTheDocument();
  });

  it("posts form payload to /api/register", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = String(input);

      if (url.includes("/api/sports")) {
        return Promise.resolve(
          jsonResponse([{ key: "RUNNING", name: "RUNNING" }]),
        );
      }

      if (url.includes("/api/register")) {
        return Promise.resolve(jsonResponse("success"));
      }

      return Promise.reject(new Error(`Unexpected url: ${url}`));
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "example@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "secret" },
    });

    const sportSelect = await screen.findByLabelText("Sport");
    fireEvent.change(sportSelect, { target: { value: "RUNNING" } });
    fireEvent.change(screen.getByLabelText("Niveau sportif"), {
      target: { value: "Debutant" },
    });

    fireEvent.click(screen.getByRole("button", { name: /créer mon compte/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/register",
        expect.objectContaining({ method: "POST" }),
      );
    });

    const registerCall = fetchMock.mock.calls.find(([url]) => String(url).includes("/api/register"));
    expect(registerCall).toBeTruthy();

    const init = registerCall?.[1] as RequestInit;
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(init.body).toBe(
      JSON.stringify({
        name: "example@gmail.com",
        password: "secret",
        sport: "RUNNING",
        niveauSportif: "Debutant",
      }),
    );
  });
});
