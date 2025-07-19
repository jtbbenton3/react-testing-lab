
import React from "react";
import { describe, it, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    setFetchResponse([
      {
        id: "1",
        date: "2020-01-01",
        description: "Alpha",
        category: "Z",
        amount: 1,
      },
      {
        id: "2",
        date: "2020-01-02",
        description: "Bravo",
        category: "A",
        amount: 2,
      },
    ]);
  });

  it("filters transactions based on search input", async () => {
    render(<App />);
   
    expect(await screen.findByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText(/Search your Recent Transactions/i),
      { target: { value: "Bravo" } }
    );

    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
  });

  it("sorts transactions based on selected field", async () => {
    const { container } = render(<App />);
    expect(await screen.findByText("Alpha")).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("combobox"),
      { target: { value: "category" } }
    );

    const rows = container.querySelectorAll("tbody tr");
    
    expect(rows[1].textContent).toContain("Bravo");
    expect(rows[2].textContent).toContain("Alpha");
  });
});