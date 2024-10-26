import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Trainer {
  TrainerID: string;
  Fname: string;
  Lname: string;
  Expertise: string;
  Availability: string;
  Schedule: string;
  Certification: string;
  AssociateMember: string;
}

const Trainer: React.FC = () => {
  const navigate = useNavigate();
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
  const [form, setForm] = useState<Trainer>({
    TrainerID: "",
    Fname: "",
    Lname: "",
    Expertise: "",
    Availability: "",
    Schedule: "",
    Certification: "",
    AssociateMember: "",
  });

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleExit = () => {
    console.log("Exit");
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = () => {
    axios
      .get("/api/trainers")
      .then((response) => setTrainerList(response.data))
      .catch((error) => console.error("Error fetching trainers:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTrainer = () => {
    axios
      .post("/api/trainers", form)
      .then(() => {
        fetchTrainers();
        setForm({
          TrainerID: "",
          Fname: "",
          Lname: "",
          Expertise: "",
          Availability: "",
          Schedule: "",
          Certification: "",
          AssociateMember: "",
        });
      })
      .catch((error) => console.error("Error creating trainer:", error));
  };

  const updateTrainer = (TrainerID: string) => {
    axios
      .put(`/api/trainers/${TrainerID}`, form)
      .then(() => fetchTrainers())
      .catch((error) => console.error("Error updating trainer:", error));
  };

  const deleteTrainer = (TrainerID: string) => {
    axios
      .delete(`/api/trainers/${TrainerID}`)
      .then(() => fetchTrainers())
      .catch((error) => console.error("Error deleting trainer:", error));
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

      <h1>Trainers</h1>
      <div>
        <h2>{form.TrainerID ? "Update Trainer" : "Add New Trainer"}</h2>
        <input
          type="text"
          name="TrainerID"
          value={form.TrainerID}
          onChange={handleInputChange}
          placeholder="Trainer ID"
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
          name="Expertise"
          value={form.Expertise}
          onChange={handleInputChange}
          placeholder="Expertise"
        />
        <input
          type="text"
          name="Availability"
          value={form.Availability}
          onChange={handleInputChange}
          placeholder="Availability"
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
          name="Certification"
          value={form.Certification}
          onChange={handleInputChange}
          placeholder="Certification"
        />
        <input
          type="text"
          name="AssociateMember"
          value={form.AssociateMember}
          onChange={handleInputChange}
          placeholder="Associate Member"
        />
        <button
          onClick={
            form.TrainerID ? () => updateTrainer(form.TrainerID) : createTrainer
          }
        >
          {form.TrainerID ? "Update Trainer" : "Add Trainer"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Trainer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Expertise</th>
            <th>Availability</th>
            <th>Schedule</th>
            <th>Certification</th>
            <th>Associate Member</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainerList.map((trainer) => (
            <tr key={trainer.TrainerID}>
              <td>{trainer.TrainerID}</td>
              <td>{trainer.Fname}</td>
              <td>{trainer.Lname}</td>
              <td>{trainer.Expertise}</td>
              <td>{trainer.Availability}</td>
              <td>{trainer.Schedule}</td>
              <td>{trainer.Certification}</td>
              <td>{trainer.AssociateMember}</td>
              <td>
                <button onClick={() => setForm(trainer)}>Edit</button>
                <button onClick={() => deleteTrainer(trainer.TrainerID)}>
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

export default Trainer;
