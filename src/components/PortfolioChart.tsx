// src/components/PortfolioChart.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePortfolioStore } from "../store/portfolioStore";
import { useMemo } from "react";

const PortfolioChart = () => {
  const { stocks } = usePortfolioStore();

  const chartData = useMemo(() => {
    const dataMap = new Map<string, number>();

    stocks.forEach((stock) => {
      const purchaseDate = new Date(stock.purchaseDate);
      const dateKey = purchaseDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const stockValue = stock.quantity * stock.purchasePrice;

      dataMap.set(dateKey, (dataMap.get(dateKey) || 0) + stockValue);
    });

    return Array.from(dataMap.entries()).map(([date, value]) => ({
      date,
      value,
    }));
  }, [stocks]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PortfolioChart;
