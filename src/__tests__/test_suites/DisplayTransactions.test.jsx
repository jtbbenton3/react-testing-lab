
import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";

describe("Display Transactions", () => {
  beforeEach(() => {
    setFetchResponse([
      {
        id: "1",
        date: "2019-12-01",
        description: "Test transaction",
        category: "Test",
        amount: 100,
      },
    ]);
  });

  it("displays transactions on load", async () => {
    render(<App />);
    expect(await screen.findByText("Test transaction")).toBeInTheDocument();
    expect(screen.getByText("2019-12-01")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});