import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Classes {
  ClassID: string;
  Name: string;
  Schedule: string;
  InstructorId: string;
  MaxCapacity: string;
}

const Classes: React.FC = () => {
  const navigate = useNavigate();
  const [classList, setClassList] = useState<Classes[]>([]);
  const [form, setForm] = useState<Classes>({
    ClassID: "",
    Name: "",
    Schedule: "",
    InstructorId: "",
    MaxCapacity: "",
  });

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleExit = () => {
    console.log("Exit");
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    axios
      .get("/api/classes")
      .then((response) => setClassList(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createClass = () => {
    axios
      .post("/api/classes", form)
      .then(() => {
        fetchClasses();
        setForm({
          ClassID: "",
          Name: "",
          Schedule: "",
          InstructorId: "",
          MaxCapacity: "",
        });
      })
      .catch((error) => console.error("Error creating class:", error));
  };

  const updateClass = (ClassID: string) => {
    axios
      .put(`/api/classes/${ClassID}`, form)
      .then(() => fetchClasses())
      .catch((error) => console.error("Error updating class:", error));
  };

  const deleteClass = (ClassID: string) => {
    axios
      .delete(`/api/classes/${ClassID}`)
      .then(() => fetchClasses())
      .catch((error) => console.error("Error deleting class:", error));
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

      <h1>Classes</h1>
      <div>
        <h2>{form.ClassID ? "Update Class" : "Add New Class"}</h2>
        <input
          type="text"
          name="ClassID"
          value={form.ClassID}
          onChange={handleInputChange}
          placeholder="Class ID"
        />
        <input
          type="text"
          name="Name"
          value={form.Name}
          onChange={handleInputChange}
          placeholder="Class Name"
        />
        <input
          type="text"
          name="Schedule"
          value={form.Schedule}
          onChange={handleInputChange}
          placeholder="Schedule"
        />
        <input
          type="text"
          name="InstructorId"
          value={form.InstructorId}
          onChange={handleInputChange}
          placeholder="Instructor ID"
        />
        <input
          type="text"
          name="MaxCapacity"
          value={form.MaxCapacity}
          onChange={handleInputChange}
          placeholder="Max Capacity"
        />
        <button
          onClick={form.ClassID ? () => updateClass(form.ClassID) : createClass}
        >
          {form.ClassID ? "Update Class" : "Add Class"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Name</th>
            <th>Schedule</th>
            <th>Instructor ID</th>
            <th>Max Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classList.map((cls) => (
            <tr key={cls.ClassID}>
              <td>{cls.ClassID}</td>
              <td>{cls.Name}</td>
              <td>{cls.Schedule}</td>
              <td>{cls.InstructorId}</td>
              <td>{cls.MaxCapacity}</td>
              <td>
                <button onClick={() => setForm(cls)}>Edit</button>
                <button onClick={() => deleteClass(cls.ClassID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;
