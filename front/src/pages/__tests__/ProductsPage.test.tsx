import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductsPage from "../ProductsPage";
import { jsonResponse } from "../../test/http";

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "/products");
  });

  it("loads products from backend and renders sport display names", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = getUrl(input);

      if (url.includes("/api/sports")) {
        return Promise.resolve(
          jsonResponse([
            { key: "FOOTBALL", name: "FOOTBALL" },
            { key: "RUNNING", name: "RUNNING" },
          ]),
        );
      }

      if (url.includes("/api/products")) {
        return Promise.resolve(
          jsonResponse([
            {
              id: "p-foot-001",
              sports: ["FOOTBALL"],
              levels: ["BEGINNER"],
              name: "Ballon football match team pro",
              price: "29.99",
              card_image: "/src/assets/products/p-foot-001-1.png",
            },
          ]),
        );
      }

      return Promise.reject(new Error(`Unexpected url: ${url}`));
    });

    render(<ProductsPage />);

    expect(await screen.findByText("Ballon football match team pro")).toBeInTheDocument();
    const footballLabels = await screen.findAllByText("Football");
    expect(footballLabels.length).toBeGreaterThan(0);
  });

  it("requests backend with sport query param when a sport is selected", async () => {
    const calledUrls: string[] = [];
    vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = getUrl(input);
      calledUrls.push(url);

      if (url.includes("/api/sports")) {
        return Promise.resolve(jsonResponse([{ key: "FOOTBALL", name: "FOOTBALL" }]));
      }

      if (url.includes("/api/products")) {
        return Promise.resolve(
          jsonResponse([
            {
              id: "p-foot-001",
              sports: ["FOOTBALL"],
              levels: ["BEGINNER"],
              name: "Ballon football match team pro",
              price: "29.99",
              card_image: "/src/assets/products/p-foot-001-1.png",
            },
          ]),
        );
      }

      return Promise.reject(new Error(`Unexpected url: ${url}`));
    });

    render(<ProductsPage />);

    const footballFilter = await screen.findByRole("button", { name: "Football" });
    await screen.findByText("Ballon football match team pro");
    const callsBeforeClick = calledUrls.filter((url) => url.includes("/api/products")).length;
    fireEvent.click(footballFilter);

    await waitFor(() => {
      const callsAfterClick = calledUrls.filter((url) => url.includes("/api/products")).length;
      expect(callsAfterClick).toBeGreaterThan(callsBeforeClick);
    });
  });
});

function getUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}
