import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddStaffForm from "./AddStaffForm";
import "../index.css";

interface Staff {
  StaffSSN: string;
  Fname: string;
  Lname: string;
  ContactInfo: string;
  GymID: string;
}

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/staffs");
        setStaffs(response.data);
        setFilteredStaffs(response.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStaffs(
      staffs.filter(
        (staff) =>
          staff.Fname.toLowerCase().includes(query) ||
          staff.Lname.toLowerCase().includes(query) ||
          staff.StaffSSN.toLowerCase().includes(query)
      )
    );
  };

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
        // Update existing staff
        await axios.put(
          `http://localhost:5001/api/staffs/${staff.StaffSSN}`,
          staff
        );
        setStaffs((prevStaffs) =>
          prevStaffs.map((s) => (s.StaffSSN === staff.StaffSSN ? staff : s))
        );
        setFilteredStaffs((prevStaffs) =>
          prevStaffs.map((s) => (s.StaffSSN === staff.StaffSSN ? staff : s))
        );
      } else {
        // Add new staff
        await axios.post("http://localhost:5001/api/staffs", staff);
        setStaffs((prevStaffs) => [...prevStaffs, staff]);
        setFilteredStaffs((prevStaffs) => [...prevStaffs, staff]);
      }
      alert("Staff saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving staff:", error);
      alert("Failed to save staff.");
    }
  };

  const handleDeleteStaff = async (staffSSN: string) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:5001/api/staffs/${staffSSN}`);
        setStaffs((prevStaffs) =>
          prevStaffs.filter((s) => s.StaffSSN !== staffSSN)
        );
        setFilteredStaffs((prevStaffs) =>
          prevStaffs.filter((s) => s.StaffSSN !== staffSSN)
        );
        alert("Staff deleted successfully!");
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
          <button onClick={() => navigate("/retailsales")}>Retail Sales</button>
          <button onClick={() => navigate("/trainers")}>Trainers</button>
          <button onClick={() => navigate("/feedback")}>Feedback</button>
          <button onClick={() => navigate("/")}>Log Out</button>
        </nav>
      </header>

      <main>
        <h1 className="title">Staff List</h1>
        <div>
          {!showForm && ( // Hide the search bar when the form is displayed
            <input
              type="text"
              placeholder="Search StaffSSN, F/Lname"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddStaff} style={{ marginLeft: "10px" }}>
            Add Staff
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddStaffForm
              staff={selectedStaff} // It can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedStaff
                  ? () => handleDeleteStaff(selectedStaff.StaffSSN)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading staff...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>StaffSSN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Info</th>
                <th>Gym ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffs.map((staff) => (
                <tr key={staff.StaffSSN}>
                  <td>{staff.StaffSSN}</td>
                  <td>{staff.Fname}</td>
                  <td>{staff.Lname}</td>
                  <td>{staff.ContactInfo}</td>
                  <td>{staff.GymID}</td>
                  <td>
                    <button onClick={() => handleEditStaff(staff)}>Edit</button>
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
