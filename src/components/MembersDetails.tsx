// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// interface Member {
//   MemID: number;
//   FName: string;
//   LName: string;
//   DOB: string;
//   Email: string;
//   Addr: string;
//   Cell: string;
//   MemId: string;
//   JoinDate: string;
//   Status: string;
//   ERcontact: string;
//   FitnessGoal: string;
//   LockerID: string;
// }

// const MemberDetail: React.FC = () => {
//   const { memId } = useParams<{ memId: string }>();
//   const [member, setMember] = useState<Member | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch member details by MemID
//   const fetchMember = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5001/api/members/${memId}`
//       );
//       const data = await response.json();
//       setMember(data);
//     } catch (error) {
//       console.error("Error fetching member details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMember();
//   }, [memId]);

//   const handleUpdate = async () => {
//     if (!member) return;
//     try {
//       const response = await fetch(
//         `http://localhost:5001/api/members/${member.MemID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(member),
//         }
//       );

//       if (response.ok) {
//         alert("Member updated successfully!");
//         // Optionally, redirect back to members list
//         navigate("/members");
//       }
//     } catch (error) {
//       console.error("Error updating member:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!member) return;
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this member?"
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/api/members/${member.MemID}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.ok) {
//           alert("Member deleted successfully!");
//           navigate("/members");
//         }
//       } catch (error) {
//         console.error("Error deleting member:", error);
//       }
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMember((prev) => ({
//       ...prev!,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleExit = () => {
//     const confirmExit = window.confirm("Are you sure you want to exit?");
//     if (confirmExit) {
//       window.close();
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar">
//         <button onClick={() => navigate("/members")}>Members</button>
//         <button onClick={() => navigate("/staffs")}>Staffs</button>
//         <button onClick={() => navigate("/equipment")}>Equipment</button>
//         <button onClick={() => navigate("/classes")}>Classes</button>
//         <button onClick={() => navigate("/retail-sales")}>Retail Sales</button>
//         <button onClick={() => navigate("/trainers")}>Trainers</button>
//         <button onClick={handleLogout}>Log Out</button>
//         <button onClick={handleExit}>Exit</button>
//       </nav>
//       <h1>
//         {loading
//           ? "Loading..."
//           : `Member Details: ${member?.FName} ${member?.LName}`}
//       </h1>
//       {loading ? (
//         <p>Loading member details...</p>
//       ) : member ? (
//         <div>
//           <div>
//             <label>First Name:</label>
//             <input
//               type="text"
//               name="FName"
//               value={member.FName}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Last Name:</label>
//             <input
//               type="text"
//               name="LName"
//               value={member.LName}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               name="DOB"
//               value={member.DOB}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="Email"
//               value={member.Email}
//               onChange={handleChange}
//             />
//           </div>
//           {/* Add fields for other attributes as needed */}
//           <div>
//             <button onClick={handleUpdate}>Update</button>
//             <button onClick={handleDelete}>Delete</button>
//             <button onClick={() => navigate("/members")}>Back</button>
//           </div>
//         </div>
//       ) : (
//         <p>No member found.</p>
//       )}
//     </div>
//   );
// };

// export default MemberDetail;
