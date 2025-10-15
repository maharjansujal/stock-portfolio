import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { usePortfolioStore } from "../store/portfolioStore";
import type { Stock } from "../types/stock";

export default function StockTable() {
  const { stocks, deleteStock } = usePortfolioStore((state) => ({
    stocks: state.stocks,
    deleteStock: state.deleteStock,
  }));

  const columns: ColumnDef<Stock>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "ticker", header: "Ticker" },
    { accessorKey: "companyName", header: "Company Name" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "purchasePrice", header: "Purchase Price" },
    { accessorKey: "currentPrice", header: "Current Price" },
    { accessorKey: "purchaseDate", header: "Purchase Date" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="text-red-500 hover:underline"
          onClick={() => deleteStock(row.original.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: stocks ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-auto border border-gray-300 w-full">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border px-4 py-2 text-left">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
