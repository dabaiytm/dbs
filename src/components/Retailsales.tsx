import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddRetailSaleForm from "./AddRetailSalesForm";
import "../index.css";

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

const RetailSalePage: React.FC = () => {
  const [retailSales, setRetailSales] = useState<RetailSale[]>([]);
  const [filteredSales, setFilteredSales] = useState<RetailSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState<RetailSale | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetailSales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/retailsales"
        );
        setRetailSales(response.data);
        setFilteredSales(response.data);
      } catch (error) {
        console.error("Error fetching retail sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetailSales();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredSales(
      retailSales.filter(
        (sale) =>
          sale.PaymentMethod.toLowerCase().includes(query) ||
          sale.Price.toString().includes(query) ||
          sale.SalesDate.toString().includes(query)
      )
    );
  };

  const handleAddSale = () => {
    setSelectedSale(undefined);
    setShowForm(true);
  };

  const handleEditSale = (sale: RetailSale) => {
    setSelectedSale(sale);
    setShowForm(true);
  };

  const handleSave = async (sale: RetailSale) => {
    try {
      if (selectedSale) {
        // Update existing sale
        await axios.put(
          `http://localhost:5001/api/retailsales/${sale.TransactionID}`,
          sale
        );
        setRetailSales((prevSales) =>
          prevSales.map((s) =>
            s.TransactionID === sale.TransactionID ? sale : s
          )
        );
        setFilteredSales((prevSales) =>
          prevSales.map((s) =>
            s.TransactionID === sale.TransactionID ? sale : s
          )
        );
      } else {
        // Add new sale
        await axios.post("http://localhost:5001/api/retailsales", sale);
        setRetailSales((prevSales) => [...prevSales, sale]);
        setFilteredSales((prevSales) => [...prevSales, sale]);
      }
      alert("Sale saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving sale:", error);
      alert("Failed to save sale.");
    }
  };

  const handleDeleteSale = async (transactionID: number) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      try {
        await axios.delete(
          `http://localhost:5001/api/retailsales/${transactionID}`
        );
        setRetailSales((prevSales) =>
          prevSales.filter((sale) => sale.TransactionID !== transactionID)
        );
        setFilteredSales((prevSales) =>
          prevSales.filter((sale) => sale.TransactionID !== transactionID)
        );
        alert("Sale deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting sale:", error);
        alert("Failed to delete sale.");
      }
    }
  };

  const handleCancel = () => setShowForm(false);

  return (
    <div>
      <header>
        <nav className="navbar">
          <button onClick={() => navigate("/members")}>Members</button>
          <button onClick={() => navigate("/staffs")}>Staffs</button>
          <button onClick={() => navigate("/equipment")}>Equipment</button>
          <button onClick={() => navigate("/classes")}>Classes</button>
          <button onClick={() => navigate("/retailsales")}>Retail Sales</button>
          <button onClick={() => navigate("/trainers")}>Trainers</button>
          <button onClick={() => navigate("/")}>Log Out</button>
          <button
            onClick={() =>
              window.confirm("Are you sure you want to exit?") && window.close()
            }
          >
            Exit
          </button>
        </nav>
      </header>

      <main>
        <h1>Retail Sales</h1>
        <div>
          {!showForm && (
            <input
              type="text"
              placeholder="Search by Date, Price, or PayMethod"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddSale} style={{ marginLeft: "10px" }}>
            Add Sale
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddRetailSaleForm
              sale={selectedSale} // Can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedSale
                  ? () => handleDeleteSale(selectedSale.TransactionID)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading sales...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ProductID</th>
                <th>Sales Date</th>
                <th>Stock</th>
                <th>Restock Schedule</th>
                <th>Gym ID</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.TransactionID}>
                  <td>{sale.ProductID}</td>
                  <td>{sale.SalesDate}</td>
                  <td>{sale.Stock}</td>
                  <td>{sale.RestockSchedule}</td>
                  <td>{sale.GymID}</td>
                  <td>${sale.Price}</td>
                  <td>{sale.PaymentMethod}</td>
                  <td>
                    <button onClick={() => handleEditSale(sale)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default RetailSalePage;
