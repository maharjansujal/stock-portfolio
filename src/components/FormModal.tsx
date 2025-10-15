import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Stock } from "../types/stock";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Stock, "id">) => void;
  stockToEdit?: Stock;
}

export default function FormModal({
  open,
  onClose,
  onSubmit,
  stockToEdit,
}: FormModalProps) {
  const [formData, setFormData] = useState<Omit<Stock, "id">>({
    ticker: "",
    companyName: "",
    quantity: 1,
    purchasePrice: 1,
    currentPrice: 1,
    purchaseDate: "",
  });

  // If editing, pre-fill the form
  useEffect(() => {
    if (stockToEdit) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = stockToEdit;
      setFormData(rest);
      setFormData(rest);
    } else {
      setFormData({
        ticker: "",
        companyName: "",
        quantity: 1,
        purchasePrice: 1,
        currentPrice: 1,
        purchaseDate: "",
      });
    }
  }, [stockToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "purchasePrice" ||
        name === "currentPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.ticker || !formData.companyName) return;
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{stockToEdit ? "Edit Stock" : "Add New Stock"}</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            name="ticker"
            label="Ticker"
            value={formData.ticker}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="companyName"
            label="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="purchasePrice"
            label="Purchase Price"
            type="number"
            value={formData.purchasePrice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="currentPrice"
            label="Current Price"
            type="number"
            value={formData.currentPrice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="purchaseDate"
            label="Purchase Date"
            type="date"
            value={formData.purchaseDate}
            onChange={handleChange}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {stockToEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
