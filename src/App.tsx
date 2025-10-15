import "./App.css";
import { useState } from "react";
import { usePortfolioStore } from "./store/portfolioStore";
import type { Stock } from "./types/stock";

function App() {
  const { stocks, addStock, updateStock, deleteStock } = usePortfolioStore();

  // Shared state for both Add and Edit forms
  const [formData, setFormData] = useState({
    ticker: "",
    companyName: "",
    quantity: 1,
    purchasePrice: 1,
    currentPrice: 1,
    purchaseDate: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Update form data based on input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Stock
  function handleAdd() {
    if (!formData.ticker || !formData.companyName) return;
    addStock({
      id: Date.now().toString(),
      ticker: formData.ticker,
      companyName: formData.companyName,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice,
      currentPrice: formData.currentPrice,
      purchaseDate:
        formData.purchaseDate || new Date().toISOString().split("T")[0],
    });
    setFormData({
      ticker: "",
      companyName: "",
      quantity: 1,
      purchasePrice: 1,
      currentPrice: 1,
      purchaseDate: "",
    });
  }

  // Handle Edit Stock
  function handleEdit() {
    if (!editId) return;
    updateStock(editId, formData);
    setEditId(null);
    setFormData({
      ticker: "",
      companyName: "",
      quantity: 1,
      purchasePrice: 1,
      currentPrice: 1,
      purchaseDate: "",
    });
  }

  const handleEditClick = (stock: Stock) => {
    setEditId(stock.id);
    setFormData({
      ticker: stock.ticker,
      companyName: stock.companyName,
      quantity: stock.quantity,
      purchasePrice: stock.purchasePrice,
      currentPrice: stock.currentPrice,
      purchaseDate: stock.purchaseDate,
    });
  };

  return (
    <div className="p-4">
      <h1>My Stocks</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.ticker} - {stock.companyName} | Qty: {stock.quantity} |
            Purchase: {stock.purchasePrice} | Current: {stock.currentPrice} |
            Date: {stock.purchaseDate}
            <button onClick={() => deleteStock(stock.id)}>Delete</button>
            <button onClick={() => handleEditClick(stock)}>Edit</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>{editId ? "Edit Stock" : "Add Stock"}</h2>
      <input
        name="ticker"
        placeholder="Ticker"
        value={formData.ticker}
        onChange={handleInputChange}
      />
      <input
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleInputChange}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleInputChange}
      />
      <input
        name="purchasePrice"
        type="number"
        placeholder="Purchase Price"
        value={formData.purchasePrice}
        onChange={handleInputChange}
      />
      <input
        name="currentPrice"
        type="number"
        placeholder="Current Price"
        value={formData.currentPrice}
        onChange={handleInputChange}
      />
      <input
        name="purchaseDate"
        type="date"
        placeholder="Purchase Date"
        value={formData.purchaseDate}
        onChange={handleInputChange}
      />
      <button onClick={editId ? handleEdit : handleAdd}>
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default App;
