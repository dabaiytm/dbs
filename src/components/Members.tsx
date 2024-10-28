import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddMemberForm from "./AddMemberForm";

interface Member {
  MemID: string;
  Fname: string;
  Lname: string;
  DOB: string;
  Email: string;
  Addr: string;
  Cell: string;
  JoinDate: string;
  Status: string;
  ERcontact: string;
  FitnessGoal: string;
  LockerID: string;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  ); // Change here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = () => {
    setSelectedMember(undefined); // Reset selected member for new addition
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member); // Load member data into form for editing
    setShowForm(true);
  };

  const handleSave = async (member: Member) => {
    try {
      if (selectedMember) {
        // Update existing member
        await axios.put(
          `http://localhost:5001/api/members/${member.MemID}`,
          member
        );
        setMembers((prevMembers) =>
          prevMembers.map((m) => (m.MemID === member.MemID ? member : m))
        );
      } else {
        // Add new member
        await axios.post("http://localhost:5001/api/members", member);
        setMembers((prevMembers) => [...prevMembers, member]);
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
        <h1>Members List</h1>
        <button onClick={handleAddMember}>Add Member</button>

        {showForm && (
          <div className="modal">
            <AddMemberForm
              member={selectedMember} // Now it can be undefined
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
          <table>
            <thead>
              <tr>
                <th>MemID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Address</th>
                <th>Cell</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Emergency Contact</th>
                <th>Fitness Goal</th>
                <th>Locker ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.MemID}>
                  <td>{member.MemID}</td>
                  <td>{member.Fname}</td>
                  <td>{member.Lname}</td>
                  <td>{member.DOB}</td>
                  <td>{member.Email}</td>
                  <td>{member.Addr}</td>
                  <td>{member.Cell}</td>
                  <td>{member.JoinDate}</td>
                  <td>{member.Status}</td>
                  <td>{member.ERcontact}</td>
                  <td>{member.FitnessGoal}</td>
                  <td>{member.LockerID}</td>
                  <td>
                    <button onClick={() => handleEditMember(member)}>
                      View
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
