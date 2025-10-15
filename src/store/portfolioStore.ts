import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Stock } from "../types/stock";

// 2️⃣ Define your Zustand store interface
interface PortfolioState {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  updateStock: (id: string, data: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
}

// 3️⃣ Create the Zustand store with persistence
export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      stocks: [
        {
          id: "1",
          ticker: "AAPL",
          companyName: "Apple",
          quantity: 10,
          purchasePrice: 150,
          currentPrice: 160,
          purchaseDate: "2025-10-01",
        },
      ],

      addStock: (stock) =>
        set((state) => ({
          stocks: [...state.stocks, stock],
        })),

      updateStock: (id, data) =>
        set((state) => ({
          stocks: state.stocks.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        })),

      deleteStock: (id) =>
        set((state) => ({
          stocks: state.stocks.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "portfolio-storage", // 🧠 key in localStorage
      storage: createJSONStorage(() => localStorage), // or sessionStorage if you prefer
    }
  )
);
