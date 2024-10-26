import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Staff {
  StaffID: string;
  Fname: string;
  Lname: string;
  Role: string;
  Schedule: string;
  ContactInfo: string;
}

const Staff: React.FC = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [form, setForm] = useState<Staff>({
    StaffID: "",
    Fname: "",
    Lname: "",
    Role: "",
    Schedule: "",
    ContactInfo: "",
  });

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleExit = () => {
    console.log("Exit");
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    axios
      .get("/api/staff")
      .then((response) => setStaffList(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createStaff = () => {
    axios
      .post("/api/staff", form)
      .then(() => {
        fetchStaff();
        setForm({
          StaffID: "",
          Fname: "",
          Lname: "",
          Role: "",
          Schedule: "",
          ContactInfo: "",
        });
      })
      .catch((error) => console.error("Error creating staff:", error));
  };

  const updateStaff = (StaffID: string) => {
    axios
      .put(`/api/staff/${StaffID}`, form)
      .then(() => fetchStaff())
      .catch((error) => console.error("Error updating staff:", error));
  };

  const deleteStaff = (StaffID: string) => {
    axios
      .delete(`/api/staff/${StaffID}`)
      .then(() => fetchStaff())
      .catch((error) => console.error("Error deleting staff:", error));
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

      <h1>Staff</h1>
      <div>
        <h2>{form.StaffID ? "Update Staff" : "Add New Staff"}</h2>
        <input
          type="text"
          name="StaffID"
          value={form.StaffID}
          onChange={handleInputChange}
          placeholder="Staff ID"
        />
        <input
          type="text"
          name="Fname"
          value={form.Fname}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="Lname"
          value={form.Lname}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="Role"
          value={form.Role}
          onChange={handleInputChange}
          placeholder="Role"
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
          name="ContactInfo"
          value={form.ContactInfo}
          onChange={handleInputChange}
          placeholder="Contact Info"
        />
        <button
          onClick={form.StaffID ? () => updateStaff(form.StaffID) : createStaff}
        >
          {form.StaffID ? "Update Staff" : "Add Staff"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Schedule</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.StaffID}>
              <td>{staff.StaffID}</td>
              <td>{staff.Fname}</td>
              <td>{staff.Lname}</td>
              <td>{staff.Role}</td>
              <td>{staff.Schedule}</td>
              <td>{staff.ContactInfo}</td>
              <td>
                <button onClick={() => setForm(staff)}>Edit</button>
                <button onClick={() => deleteStaff(staff.StaffID)}>
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

export default Staff;
