// Equipment.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddEquipmentForm from "./AddEquipmentForm";
import "../index.css";

interface Equipment {
  EquipmentID: string;
  EquipmentName: string;
  TargetGroup: string;
  MaintainanceSchedule: string;
  ConditionStatus: string;
  GymID: number | null;
}

const EquipmentPage: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<
    Equipment | undefined
  >(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/equipment");
        setEquipmentList(response.data);
        setFilteredEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredEquipment(
      equipmentList.filter(
        (equipment) =>
          equipment.EquipmentID.toLowerCase().includes(query) ||
          equipment.EquipmentName.toLowerCase().includes(query) ||
          (equipment.GymID !== null &&
            equipment.GymID.toString().toLowerCase().includes(query))
      )
    );
  };

  const handleAddEquipment = () => {
    setSelectedEquipment(undefined);
    setShowForm(true);
  };

  const handleEditEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowForm(true);
  };

  const handleSave = async (equipment: Equipment) => {
    try {
      if (selectedEquipment) {
        // Update existing equipment
        await axios.put(
          `http://localhost:5001/api/equipment/${equipment.EquipmentID}`,
          equipment
        );
        setEquipmentList((prevEquipment) =>
          prevEquipment.map((e) =>
            e.EquipmentID === equipment.EquipmentID ? equipment : e
          )
        );
        setFilteredEquipment((prevEquipment) =>
          prevEquipment.map((e) =>
            e.EquipmentID === equipment.EquipmentID ? equipment : e
          )
        );
      } else {
        // Add new equipment
        await axios.post("http://localhost:5001/api/equipment", equipment);
        setEquipmentList((prevEquipment) => [...prevEquipment, equipment]);
        setFilteredEquipment((prevEquipment) => [...prevEquipment, equipment]);
      }
      alert("Equipment saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert("Failed to save equipment.");
    }
  };

  const handleDeleteEquipment = async (equipmentID: string) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await axios.delete(
          `http://localhost:5001/api/equipment/${equipmentID}`
        );
        setEquipmentList((prevEquipment) =>
          prevEquipment.filter((e) => e.EquipmentID !== equipmentID)
        );
        setFilteredEquipment((prevEquipment) =>
          prevEquipment.filter((e) => e.EquipmentID !== equipmentID)
        );
        alert("Equipment deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting equipment:", error);
        alert("Failed to delete equipment.");
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
          <button onClick={() => navigate("/retail-sales")}>
            Retail Sales
          </button>
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
        <h1>Equipment List</h1>
        <div>
          {!showForm && (
            <input
              type="text"
              placeholder="Search EquipmentID, Name, or GymID"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddEquipment} style={{ marginLeft: "10px" }}>
            Add Equipment
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddEquipmentForm
              equipment={selectedEquipment} // Can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedEquipment
                  ? () => handleDeleteEquipment(selectedEquipment.EquipmentID)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading equipment...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>EquipmentID</th>
                <th>EquipmentName</th>
                <th>Target Group</th>
                <th>Maintainance Schedule</th>
                <th>Condition Status</th>
                <th>Gym ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((equipment) => (
                <tr key={equipment.EquipmentID}>
                  <td>{equipment.EquipmentID}</td>
                  <td>{equipment.EquipmentName}</td>
                  <td>{equipment.TargetGroup}</td>
                  <td>{equipment.MaintainanceSchedule}</td>
                  <td>{equipment.ConditionStatus}</td>
                  <td>{equipment.GymID}</td>
                  <td>
                    <button onClick={() => handleEditEquipment(equipment)}>
                      Edit
                    </button>
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

export default EquipmentPage;
