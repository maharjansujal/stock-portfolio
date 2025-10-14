import { create } from "zustand";
import type { Stock } from "../types/stock";

interface PortfolioState {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  updateStock: (id: string, data: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>(function (set) {
  return {
    stocks: [],
    addStock: (stock) => set((state) => ({ stocks: [...state.stocks, stock] })),
    updateStock: (id, data) =>
      set((state) => ({
        stocks: state.stocks.map((s) => (s.id === id ? { ...s, ...data } : s)),
      })),
    deleteStock: (id) =>
      set((state) => ({ stocks: state.stocks.filter((s) => s.id !== id) })),
  };
});
