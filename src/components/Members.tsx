import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddMemberForm from "./AddMemberForm";
import "../index.css";

interface Member {
  MemID: string;
  Fname: string;
  Lname: string;
  DOB: string;
  Email: string;
  Cell: string;
  JoinDate: string;
  Status: string;
  FitnessGoal: string;
  LockerID: string;
  GymID: string;
  MembershipID: string;
  TrainerSSN: string;
  Street: string;
  City: string;
  State: string;
  Zipcode: string;
  ERContactName: string;
  ERContactPhone: string;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/members");
        setMembers(response.data);
        setFilteredMembers(response.data); // Initialize filteredMembers
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredMembers(
      members.filter(
        (member) =>
          member.MemID.toLowerCase().includes(query) ||
          member.Fname.toLowerCase().includes(query) ||
          member.Lname.toLowerCase().includes(query)
      )
    );
  };

  const handleAddMember = () => {
    setSelectedMember(undefined);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleSave = async (member: Member) => {
    try {
      if (selectedMember) {
        await axios.put(
          `http://localhost:5001/api/members/${member.MemID}`,
          member
        );
        setMembers((prevMembers) =>
          prevMembers.map((m) => (m.MemID === member.MemID ? member : m))
        );
        setFilteredMembers((prevMembers) =>
          prevMembers.map((m) => (m.MemID === member.MemID ? member : m))
        );
      } else {
        await axios.post("http://localhost:5001/api/members", member);
        setMembers((prevMembers) => [...prevMembers, member]);
        setFilteredMembers((prevMembers) => [...prevMembers, member]);
      }
      alert("Member saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member.");
    }
  };

  const handleDeleteMember = async (memID: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:5001/api/members/${memID}`);
        setMembers((prevMembers) =>
          prevMembers.filter((m) => m.MemID !== memID)
        );
        setFilteredMembers((prevMembers) =>
          prevMembers.filter((m) => m.MemID !== memID)
        );
        alert("Member deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member.");
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
        <h1 className="title">Members List</h1>
        <div>
          {!showForm && ( // Hide the search bar when the form is displayed
            <input
              type="text"
              placeholder="Search MemberID, F/Lname"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddMember} style={{ marginLeft: "10px" }}>
            Add Member
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddMemberForm
              member={selectedMember}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedMember
                  ? () => handleDeleteMember(selectedMember.MemID)
                  : undefined
              }
            />
          </div>
        )}
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>MemID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Cell</th>
                <th>Join Date</th>
                <th>Status</th>
                {/* <th>Fitness Goal</th>
                <th>Locker ID</th>
                <th>Gym ID</th>
                <th>Membership ID</th>
                <th>Trainer SSN</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Emergency Contact Name</th>
                <th>Emergency Contact Phone</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.MemID}>
                  <td>{member.MemID}</td>
                  <td>{member.Fname}</td>
                  <td>{member.Lname}</td>
                  <td>{member.DOB}</td>
                  <td>{member.Email}</td>
                  <td>{member.Cell}</td>
                  <td>{member.JoinDate}</td>
                  <td>{member.Status}</td>
                  {/* <td>{member.FitnessGoal}</td>
                  <td>{member.LockerID}</td>
                  <td>{member.GymID}</td>
                  <td>{member.MembershipID}</td>
                  <td>{member.TrainerSSN}</td>
                  <td>{member.Street}</td>
                  <td>{member.City}</td>
                  <td>{member.State}</td>
                  <td>{member.Zipcode}</td>
                  <td>{member.ERContactName}</td>
                  <td>{member.ERContactPhone}</td> */}
                  <td>
                    <button onClick={() => handleEditMember(member)}>
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

export default Members;
