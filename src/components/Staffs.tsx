import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddStaffForm from "./AddStaffForm";
import "../index.css";

interface Staff {
  StaffID: string;
  Fname: string;
  Lname: string;
  Role: string;
  Schedule: string;
  ContactInfo: string;
}

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/staffs");
        setStaffs(response.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  const handleAddStaff = () => {
    setSelectedStaff(undefined);
    setShowForm(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const handleSave = async (staff: Staff) => {
    try {
      if (selectedStaff) {
        // Update existing member
        await axios.put(
          `http://localhost:5001/api/staffs/${staff.StaffID}`,
          staff
        );
        setStaffs((prevStaffs) =>
          prevStaffs.map((m) => (m.StaffID === staff.StaffID ? staff : m))
        );
      } else {
        // Add new member
        await axios.post("http://localhost:5001/api/staffs", staff);
        setStaffs((prevStaffs) => [...prevStaffs, staff]);
      }
      alert("Member saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save staff.");
    }
  };

  const handleDeleteStaff = async (staffID: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:5001/api/staffs/${staffID}`);
        setStaffs((prevStaffs) =>
          prevStaffs.filter((m) => m.StaffID !== staffID)
        );
        alert("Member deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting staff:", error);
        alert("Failed to delete staff.");
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
        <h1>Staff List</h1>
        <button onClick={handleAddStaff}>Add Staff</button>
        <br></br>
        <br></br>

        {showForm && (
          <div className="modal">
            <AddStaffForm
              staff={selectedStaff} // Now it can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedStaff
                  ? () => handleDeleteStaff(selectedStaff.StaffID)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading staff...</p>
        ) : (
          <table id="staff_table">
            <thead>
              <tr>
                <th>StaffID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Schedule</th>
                <th>Contact Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr key={staff.StaffID}>
                  <td>{staff.StaffID}</td>
                  <td>{staff.Fname}</td>
                  <td>{staff.Lname}</td>
                  <td>{staff.Role}</td>
                  <td>{staff.Schedule}</td>
                  <td>{staff.ContactInfo}</td>
                  <td>
                    <button onClick={() => handleEditStaff(staff)}>View</button>
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

export default Staffs;
