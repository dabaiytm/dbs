import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Equipment {
  EquipmentID: string;
  EquipmentName: string;
  TargetGroup: string;
  MaintainanceSchedule: string;
  Condition: string;
}

const Equipment: React.FC = () => {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [form, setForm] = useState<Equipment>({
    EquipmentID: "",
    EquipmentName: "",
    TargetGroup: "",
    MaintainanceSchedule: "",
    Condition: "",
  });

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleExit = () => {
    console.log("Exit");
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    axios
      .get("/api/equipment")
      .then((response) => setEquipmentList(response.data))
      .catch((error) => console.error("Error fetching equipment:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEquipment = () => {
    axios
      .post("/api/equipment", form)
      .then(() => {
        fetchEquipment();
        setForm({
          EquipmentID: "",
          EquipmentName: "",
          TargetGroup: "",
          MaintainanceSchedule: "",
          Condition: "",
        });
      })
      .catch((error) => console.error("Error creating equipment:", error));
  };

  const updateEquipment = (EquipmentID: string) => {
    axios
      .put(`/api/equipment/${EquipmentID}`, form)
      .then(() => fetchEquipment())
      .catch((error) => console.error("Error updating equipment:", error));
  };

  const deleteEquipment = (EquipmentID: string) => {
    axios
      .delete(`/api/equipment/${EquipmentID}`)
      .then(() => fetchEquipment())
      .catch((error) => console.error("Error deleting equipment:", error));
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

      <h1>Equipment</h1>
      <div>
        <h2>{form.EquipmentID ? "Update Equipment" : "Add New Equipment"}</h2>
        <input
          type="text"
          name="EquipmentID"
          value={form.EquipmentID}
          onChange={handleInputChange}
          placeholder="Equipment ID"
        />
        <input
          type="text"
          name="EquipmentName"
          value={form.EquipmentName}
          onChange={handleInputChange}
          placeholder="Equipment Name"
        />
        <input
          type="text"
          name="TargetGroup"
          value={form.TargetGroup}
          onChange={handleInputChange}
          placeholder="Target Group"
        />
        <input
          type="text"
          name="MaintainanceSchedule"
          value={form.MaintainanceSchedule}
          onChange={handleInputChange}
          placeholder="Maintenance Schedule"
        />
        <input
          type="text"
          name="Condition"
          value={form.Condition}
          onChange={handleInputChange}
          placeholder="Condition"
        />
        <button
          onClick={
            form.EquipmentID
              ? () => updateEquipment(form.EquipmentID)
              : createEquipment
          }
        >
          {form.EquipmentID ? "Update Equipment" : "Add Equipment"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>Target Group</th>
            <th>Maintenance Schedule</th>
            <th>Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((equipment) => (
            <tr key={equipment.EquipmentID}>
              <td>{equipment.EquipmentID}</td>
              <td>{equipment.EquipmentName}</td>
              <td>{equipment.TargetGroup}</td>
              <td>{equipment.MaintainanceSchedule}</td>
              <td>{equipment.Condition}</td>
              <td>
                <button onClick={() => setForm(equipment)}>Edit</button>
                <button onClick={() => deleteEquipment(equipment.EquipmentID)}>
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

export default Equipment;
