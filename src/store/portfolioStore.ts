import { create } from "zustand";
import type { Stock } from "../types/stock";

const stored = localStorage.getItem("portfolio");

interface PortfolioState {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  updateStock: (id: string, data: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(function (set) {
  return {
    stocks: stored
      ? JSON.parse(stored)
      : [
          {
            id: "1",
            ticker: "AAPL",
            companyName: "Apple",
            quantity: 10,
            purchasePrice: 150,
            currentPrice: 160,
            purchaseDate: "2025-10-01",
          },
          {
            id: "2",
            ticker: "GOOGL",
            companyName: "Alphabet",
            quantity: 5,
            purchasePrice: 100,
            currentPrice: 110,
            purchaseDate: "2025-09-20",
          },
        ],
    addStock: (stock) => set((state) => ({ stocks: [...state.stocks, stock] })),
    updateStock: (id, data) =>
      set((state) => ({
        stocks: state.stocks.map((s) => (s.id === id ? { ...s, ...data } : s)),
      })),
    deleteStock: (id) =>
      set((state) => ({ stocks: state.stocks.filter((s) => s.id !== id) })),
  };
});
