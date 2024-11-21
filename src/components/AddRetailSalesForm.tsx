import React, { useState, useEffect } from "react";

interface RetailSale {
  ProductID: string;
  SalesDate: string;
  PaymentMethod: string;
  Stock: number;
  RestockSchedule: string;
  GymID: number | null;
  TransactionID: number;
  Price: number;
}

interface AddRetailSalesFormProps {
  sale?: RetailSale;
  onSave: (sale: RetailSale) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddRetailSalesForm: React.FC<AddRetailSalesFormProps> = ({
  sale,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<RetailSale>({
    ProductID: "",
    SalesDate: "",
    PaymentMethod: "",
    Stock: 0,
    RestockSchedule: "",
    GymID: null,
    TransactionID: 0,
    Price: 0,
  });

  useEffect(() => {
    if (sale) {
      setFormData(sale);
    } else {
      setFormData({
        ProductID: "",
        SalesDate: "",
        PaymentMethod: "",
        Stock: 0,
        RestockSchedule: "",
        GymID: null,
        TransactionID: 0,
        Price: 0,
      });
    }
  }, [sale]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Stock" || name === "TransactionID" || name === "Price"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{sale ? "Edit Retail Sale" : "Add Retail Sale"}</h2>

      <input
        type="text"
        name="ProductID"
        value={formData.ProductID}
        onChange={handleChange}
        placeholder="Product ID"
        required
      />

      <input
        type="date"
        name="SalesDate"
        value={formData.SalesDate}
        onChange={handleChange}
        placeholder="Sales Date"
        required
      />

      <input
        type="number"
        name="Stock"
        value={formData.Stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />

      <input
        type="text"
        name="RestockSchedule"
        value={formData.RestockSchedule}
        onChange={handleChange}
        placeholder="Restock Schedule"
        required
      />

      <input
        type="number"
        name="GymID"
        value={formData.GymID ?? ""}
        onChange={handleChange}
        placeholder="Gym ID"
      />

      <input
        type="number"
        name="TransactionID"
        value={formData.TransactionID}
        onChange={handleChange}
        placeholder="Transaction ID"
        required
      />

      {/* Price Input */}
      <input
        type="number"
        name="Price"
        value={formData.Price}
        onChange={handleChange}
        placeholder="Price"
        required
      />

      <select
        name="PaymentMethod"
        value={formData.PaymentMethod}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Online">Online</option>
      </select>

      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      {onDelete && (
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      )}
    </form>
  );
};

export default AddRetailSalesForm;
