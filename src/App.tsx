import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { usePortfolioStore } from "./store/portfolioStore";
import type { Stock } from "./types/stock";
import FormModal from "./components/FormModal";
import StockTable from "./components/Table";
import PortfolioChart from "./components/PortfolioChart";

function App() {
  const { stocks, addStock, updateStock, deleteStock } = usePortfolioStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [stockToEdit, setStockToEdit] = useState<Stock | null>(null);

  // Open Add Modal
  const handleAddClick = () => {
    setStockToEdit(null);
    setModalOpen(true);
  };

  // Handle Form Submission (Add or Update)
  const handleSubmit = (data: Omit<Stock, "id">) => {
    if (stockToEdit) {
      // Editing existing stock
      updateStock(stockToEdit.id, data);
    } else {
      // Adding new stock
      addStock({
        id: Date.now().toString(),
        ...data,
      });
    }
    setModalOpen(false);
    setStockToEdit(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock Portfolio</h1>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Stock
        </Button>
      </header>
      <PortfolioChart />
      <section>
        <StockTable
          stocks={stocks}
          onEdit={(stock) => {
            setStockToEdit(stock);
            setModalOpen(true);
          }}
          onDelete={(id) => deleteStock(id)}
        />
      </section>

      <FormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setStockToEdit(null);
        }}
        stockToEdit={stockToEdit || undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
