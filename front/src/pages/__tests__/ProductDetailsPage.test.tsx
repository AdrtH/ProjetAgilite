import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductDetailsPage from "../ProductDetailsPage";
import { jsonResponse } from "../../test/http";

describe("ProductDetailsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches details from backend with expected URL shape", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        id: "p-cyc-001",
        sports: ["CYCLISME"],
        levels: ["BEGINNER", "AVERAGE"],
        name: "Casque velo route safe ride 300",
        price: "39.99",
        card_image: "/src/assets/products/p-cyc-001-1.png",
      }),
    );

    render(<ProductDetailsPage productId="p-cyc-001" />);

    expect(await screen.findByText("Casque velo route safe ride 300")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/products/:product_id?product_id=p-cyc-001",
    );
  });

  it("shows not found state when backend returns 404", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ error: "Could not find product" }, { status: 404 }),
    );

    render(<ProductDetailsPage productId="missing-id" />);

    await waitFor(() => {
      expect(screen.getByText("Produit introuvable")).toBeInTheDocument();
    });
  });
});
