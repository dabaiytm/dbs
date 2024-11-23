import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTrainerForm from "./AddTrainerForm";
import "../index.css";

interface Trainer {
  TrainerSSN: string;
  Fname: string;
  Lname: string;
  GymID: number;
}

const TrainerPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/trainers");
        setTrainers(response.data);
        setFilteredTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredTrainers(
      trainers.filter(
        (trainer) =>
          trainer.Fname.toLowerCase().includes(query) ||
          trainer.Lname.toLowerCase().includes(query) ||
          trainer.TrainerSSN.toLowerCase().includes(query)
      )
    );
  };

  const handleAddTrainer = () => {
    setSelectedTrainer(undefined);
    setShowForm(true);
  };

  const handleEditTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowForm(true);
  };

  const handleSave = async (trainer: Trainer) => {
    try {
      if (selectedTrainer) {
        // Update existing trainer
        await axios.put(
          `http://localhost:5001/api/trainers/${trainer.TrainerSSN}`,
          trainer
        );
        setTrainers((prevTrainers) =>
          prevTrainers.map((t) =>
            t.TrainerSSN === trainer.TrainerSSN ? trainer : t
          )
        );
        setFilteredTrainers((prevTrainers) =>
          prevTrainers.map((t) =>
            t.TrainerSSN === trainer.TrainerSSN ? trainer : t
          )
        );
      } else {
        // Add new trainer
        await axios.post("http://localhost:5001/api/trainers", trainer);
        setTrainers((prevTrainers) => [...prevTrainers, trainer]);
        setFilteredTrainers((prevTrainers) => [...prevTrainers, trainer]);
      }
      alert("Trainer saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving trainer:", error);
      alert("Failed to save trainer.");
    }
  };

  const handleDeleteTrainer = async (trainerID: string) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await axios.delete(`http://localhost:5001/api/trainers/${trainerID}`);
        setTrainers((prevTrainers) =>
          prevTrainers.filter((trainer) => trainer.TrainerSSN !== trainerID)
        );
        setFilteredTrainers((prevTrainers) =>
          prevTrainers.filter((trainer) => trainer.TrainerSSN !== trainerID)
        );
        alert("Trainer deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting trainer:", error);
        alert("Failed to delete trainer.");
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
        <h1>Trainers List</h1>
        <div>
          {!showForm && (
            <input
              type="text"
              placeholder="Search by ID, First or Last Name"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddTrainer} style={{ marginLeft: "10px" }}>
            Add Trainer
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddTrainerForm
              trainer={selectedTrainer} // Can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedTrainer
                  ? () => handleDeleteTrainer(selectedTrainer.TrainerSSN)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading trainers...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Trainer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gym ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.TrainerSSN}>
                  <td>{trainer.TrainerSSN}</td>
                  <td>{trainer.Fname}</td>
                  <td>{trainer.Lname}</td>
                  <td>{trainer.GymID}</td>
                  <td>
                    <button onClick={() => handleEditTrainer(trainer)}>
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

export default TrainerPage;
