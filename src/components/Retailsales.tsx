import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RetailSale {
  ProductID: string;
  Price: number;
  SalesDate: string;
  PaymentMethod: string;
  Stock: number;
  RestockSchedule: string;
}

const RetailSale: React.FC = () => {
  const navigate = useNavigate();
  const [retailSales, setRetailSales] = useState<RetailSale[]>([]);
  const [form, setForm] = useState<RetailSale>({
    ProductID: "",
    Price: 0,
    SalesDate: "",
    PaymentMethod: "",
    Stock: 0,
    RestockSchedule: "",
  });

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  const handleExit = () => {
    // Add your exit logic here
    console.log("Exit");
  };

  // Fetch retail sales on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    axios
      .get("/api/retail_sales")
      .then((response) => {
        setRetailSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching retail sales:", error);
      });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create a new sale
  const createSale = () => {
    axios
      .post("/api/retail_sales", form)
      .then(() => {
        fetchSales(); // Refresh list after creation
        setForm({
          ProductID: "",
          Price: 0,
          SalesDate: "",
          PaymentMethod: "",
          Stock: 0,
          RestockSchedule: "",
        });
      })
      .catch((error) => {
        console.error("Error creating sale:", error);
      });
  };

  // Update a sale
  const updateSale = (ProductID: string) => {
    axios
      .put(`/api/retail_sales/${ProductID}`, form)
      .then(() => {
        fetchSales(); // Refresh list after update
      })
      .catch((error) => {
        console.error("Error updating sale:", error);
      });
  };

  // Delete a sale
  const deleteSale = (ProductID: string) => {
    axios
      .delete(`/api/retail_sales/${ProductID}`)
      .then(() => {
        fetchSales(); // Refresh list after deletion
      })
      .catch((error) => {
        console.error("Error deleting sale:", error);
      });
  };

  return (
    <div>
      {/* Header with navigation */}
      <header>
        <nav className="navbar">
          <button onClick={() => navigate("/members")}>Members</button>
          <button onClick={() => navigate("/staffs")}>Staffs</button>
          <button onClick={() => navigate("/equipment")}>Equipment</button>
          <button onClick={() => navigate("/classes")}>Classes</button>
          <button onClick={() => navigate("/retail-sales")}>
            Retail Sales
          </button>
          <button onClick={() => navigate("/trainers")}>Trainers</button>
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={handleExit}>Exit</button>
        </nav>
      </header>

      <h1>Retail Sales</h1>

      {/* Create/Update Form */}
      <div>
        <h2>{form.ProductID ? "Update Sale" : "Add New Sale"}</h2>
        <input
          type="text"
          name="ProductID"
          value={form.ProductID}
          onChange={handleInputChange}
          placeholder="Product ID"
        />
        <input
          type="number"
          name="Price"
          value={form.Price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="date"
          name="SalesDate"
          value={form.SalesDate}
          onChange={handleInputChange}
          placeholder="Sales Date"
        />
        <input
          type="text"
          name="PaymentMethod"
          value={form.PaymentMethod}
          onChange={handleInputChange}
          placeholder="Payment Method"
        />
        <input
          type="number"
          name="Stock"
          value={form.Stock}
          onChange={handleInputChange}
          placeholder="Stock"
        />
        <input
          type="text"
          name="RestockSchedule"
          value={form.RestockSchedule}
          onChange={handleInputChange}
          placeholder="Restock Schedule"
        />
        <button
          onClick={
            form.ProductID ? () => updateSale(form.ProductID) : createSale
          }
        >
          {form.ProductID ? "Update Sale" : "Add Sale"}
        </button>
      </div>

      {/* Table displaying retail sales */}
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Price</th>
            <th>Sales Date</th>
            <th>Payment Method</th>
            <th>Stock</th>
            <th>Restock Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {retailSales.map((sale) => (
            <tr key={sale.ProductID}>
              <td>{sale.ProductID}</td>
              <td>{sale.Price}</td>
              <td>{sale.SalesDate}</td>
              <td>{sale.PaymentMethod}</td>
              <td>{sale.Stock}</td>
              <td>{sale.RestockSchedule}</td>
              <td>
                <button onClick={() => setForm(sale)}>Edit</button>
                <button onClick={() => deleteSale(sale.ProductID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetailSale;
