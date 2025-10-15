import type { Stock } from "../types/stock";

interface StockTableProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
}

export default function StockTable({
  stocks,
  onEdit,
  onDelete,
}: StockTableProps) {
  return (
    <table className="table-auto border border-gray-300 w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Ticker</th>
          <th className="border px-4 py-2">Company Name</th>
          <th className="border px-4 py-2">Quantity</th>
          <th className="border px-4 py-2">Purchase Price</th>
          <th className="border px-4 py-2">Current Price</th>
          <th className="border px-4 py-2">Purchase Date</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center p-4">
              No stocks in your portfolio.
            </td>
          </tr>
        ) : (
          stocks.map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{stock.ticker}</td>
              <td className="border px-4 py-2">{stock.companyName}</td>
              <td className="border px-4 py-2">{stock.quantity}</td>
              <td className="border px-4 py-2">{stock.purchasePrice}</td>
              <td className="border px-4 py-2">{stock.currentPrice}</td>
              <td className="border px-4 py-2">{stock.purchaseDate}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(stock)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(stock.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
