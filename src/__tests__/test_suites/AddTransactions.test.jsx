
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Add Transactions", () => {
  it("adds a new transaction to the list and calls POST", async () => {
    
    global.setFetchResponse([]);
    const { container } = render(<App />);

    
    const newTxn = {
      id: "2",
      date: "2020-01-01",
      description: "New transaction",
      category: "Income",
      amount: 200,
    };
    global.fetch = vi.fn((url, opts) => {
      if (opts?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(newTxn),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    
    fireEvent.change(container.querySelector("input[name='date']"), {
      target: { value: "2020-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "New transaction" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Category/i), {
      target: { value: "Income" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
      target: { value: "200" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    
    expect(await screen.findByText("New transaction")).toBeInTheDocument();

    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/transactions"),
      expect.objectContaining({ method: "POST" })
    );
  });
});