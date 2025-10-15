import "./App.css";
import { useState } from "react";
import { usePortfolioStore } from "./store/portfolioStore";

function App() {
  const { stocks, addStock, updateStock, deleteStock } = usePortfolioStore();

  // Local state for Add/ Edit forms
  const [newTicker, setNewTicker] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newPurchasePrice, setNewPurchasePrice] = useState(1);
  const [newCurrentPrice, setNewCurrentPrice] = useState(1);
  const [newPurchaseDate, setNewPurchaseDate] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTicker, setEditTicker] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editQuantity, setEditQuantity] = useState(1);
  const [editPurchasePrice, setEditPurchasePrice] = useState(1);
  const [editCurrentPrice, setEditCurrentPrice] = useState(1);
  const [editPurchaseDate, setEditPurchaseDate] = useState("");

  //Add stock
  function handleAdd() {
    if (!newTicker || !newCompany) return;
    addStock({
      id: Date.now().toString(),
      ticker: newTicker,
      companyName: newCompany,
      quantity: newQuantity,
      purchasePrice: newPurchasePrice,
      currentPrice: newCurrentPrice,
      purchaseDate: newPurchaseDate || new Date().toISOString().split("T")[0],
    });
    setNewTicker("");
    setNewCompany("");
  }

  //Edit Stock
  function handleEdit() {
    if (!editId) return;
    updateStock(editId, {
      ticker: editTicker,
      companyName: editCompany,
      quantity: editQuantity,
      purchasePrice: editPurchasePrice,
      currentPrice: editCurrentPrice,
      purchaseDate: editPurchaseDate,
    });
    setEditId(null);
    setEditTicker("");
    setEditCompany("");
  }
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
            <button
              onClick={() => {
                setEditId(stock.id);
                setEditTicker(stock.ticker);
                setEditCompany(stock.companyName);
                setEditQuantity(stock.quantity);
                setEditPurchasePrice(stock.purchasePrice);
                setEditCurrentPrice(stock.currentPrice);
                setEditPurchaseDate(stock.purchaseDate);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Add Stock</h2>
      <input
        placeholder="Ticker"
        value={newTicker}
        onChange={(e) => setNewTicker(e.target.value)}
      />
      <input
        placeholder="Company Name"
        value={newCompany}
        onChange={(e) => setNewCompany(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newQuantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={newPurchasePrice}
        onChange={(e) => setNewPurchasePrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Current Price"
        value={newCurrentPrice}
        onChange={(e) => setNewCurrentPrice(Number(e.target.value))}
      />
      <input
        type="date"
        placeholder="Purchase Date"
        value={newPurchaseDate}
        onChange={(e) => setNewPurchaseDate(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {editId && (
        <>
          <h2>Edit Stock</h2>
          <input
            placeholder="Ticker"
            value={editTicker}
            onChange={(e) => setEditTicker(e.target.value)}
          />
          <input
            placeholder="Company Name"
            value={editCompany}
            onChange={(e) => setEditCompany(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editQuantity}
            onChange={(e) => setEditQuantity(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Purchase Price"
            value={editPurchasePrice}
            onChange={(e) => setEditPurchasePrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Current Price"
            value={editCurrentPrice}
            onChange={(e) => setEditCurrentPrice(Number(e.target.value))}
          />
          <input
            placeholder="Purchase Date"
            value={editPurchaseDate}
            onChange={(e) => setEditPurchaseDate(e.target.value)}
          />
          <button onClick={handleEdit}>Update</button>
        </>
      )}
    </div>
  );
}

export default App;
