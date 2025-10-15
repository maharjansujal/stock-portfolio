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
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="border-b px-6 py-3 text-left">Ticker</th>
            <th className="border-b px-6 py-3 text-left">Company Name</th>
            <th className="border-b px-6 py-3 text-left">Quantity</th>
            <th className="border-b px-6 py-3 text-left">Purchase Price</th>
            <th className="border-b px-6 py-3 text-left">Current Price</th>
            <th className="border-b px-6 py-3 text-left">Purchase Date</th>
            <th className="border-b px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No stocks in your portfolio.
              </td>
            </tr>
          ) : (
            stocks.map((stock, index) => (
              <tr
                key={stock.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors duration-300`}
              >
                <td className="border-b px-6 py-4">{stock.ticker}</td>
                <td className="border-b px-6 py-4">{stock.companyName}</td>
                <td className="border-b px-6 py-4">{stock.quantity}</td>
                <td className="border-b px-6 py-4">${stock.purchasePrice}</td>
                <td className="border-b px-6 py-4">${stock.currentPrice}</td>
                <td className="border-b px-6 py-4">{stock.purchaseDate}</td>
                <td className="border-b px-6 py-4 space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                    onClick={() => onEdit(stock)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
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
    </div>
  );
}
