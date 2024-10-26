import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Member {
  MemID: number;
  FName: string;
  LName: string;
  DOB: string;
  Email: string;
  Addr: string;
  Cell: string;
  MemId: string;
  JoinDate: string;
  Status: string;
  ERcontact: string;
  FitnessGoal: string;
  LockerID: string;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/members");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit?");
    if (confirmExit) {
      window.close();
    }
  };

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
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={handleExit}>Exit</button>
        </nav>
      </header>
      <main>
        <h1>Members List</h1>
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
                <th>Member ID</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Emergency Contact</th>
                <th>Fitness Goal</th>
                <th>Locker ID</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.MemID}>
                  <td>{member.MemID}</td>
                  <td>{member.FName}</td>
                  <td>{member.LName}</td>
                  <td>{member.DOB}</td>
                  <td>{member.Email}</td>
                  <td>{member.Addr}</td>
                  <td>{member.Cell}</td>
                  <td>{member.MemId}</td>
                  <td>{member.JoinDate}</td>
                  <td>{member.Status}</td>
                  <td>{member.ERcontact}</td>
                  <td>{member.FitnessGoal}</td>
                  <td>{member.LockerID}</td>
                  <td>
                    {/* Link to Member Detail page */}
                    <button
                      onClick={() => navigate(`/members/${member.MemID}`)}
                    >
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
