import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddClassForm from "./AddClassForm";
import "../index.css";

interface Class {
  ClassID: string;
  Name: string;
  Schedule: string;
  TrainerSSN: string;
  MaxCapacity: string;
}

const ClassesPage: React.FC = () => {
  const [classList, setClassList] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | undefined>(
    undefined
  );

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/classes");
        console.log(response.data); // Check the data
        setClassList(response.data);
        setFilteredClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredClasses(
      classList.filter(
        (cls) =>
          cls.Name?.toLowerCase().includes(query) ||
          cls.Schedule?.toLowerCase().includes(query) ||
          cls.TrainerSSN?.toLowerCase().includes(query)
      )
    );
  };

  const handleAddClass = () => {
    setSelectedClass(undefined);
    setShowForm(true);
  };

  const handleEditClass = (cls: Class) => {
    setSelectedClass(cls);
    setShowForm(true);
  };

  const handleSave = async (cls: Class) => {
    try {
      if (selectedClass) {
        // Update existing class
        await axios.put(
          `http://localhost:5001/api/classes/${cls.ClassID}`,
          cls
        );
        setClassList((prevClasses) =>
          prevClasses.map((c) => (c.ClassID === cls.ClassID ? cls : c))
        );
        setFilteredClasses((prevClasses) =>
          prevClasses.map((c) => (c.ClassID === cls.ClassID ? cls : c))
        );
      } else {
        // Add new class
        await axios.post("http://localhost:5001/api/classes", cls);
        setClassList((prevClasses) => [...prevClasses, cls]);
        setFilteredClasses((prevClasses) => [...prevClasses, cls]);
      }
      alert("Class saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving class:", error);
      alert("Failed to save class.");
    }
  };

  const handleDeleteClass = async (classID: string) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await axios.delete(`http://localhost:5001/api/classes/${classID}`);
        setClassList((prevClasses) =>
          prevClasses.filter((c) => c.ClassID !== classID)
        );
        setFilteredClasses((prevClasses) =>
          prevClasses.filter((c) => c.ClassID !== classID)
        );
        alert("Class deleted successfully!");
        setShowForm(false);
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class.");
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
        <h1>Classes List</h1>
        <div>
          {!showForm && (
            <input
              type="text"
              placeholder="Search Name, Schedule or TrainerSSN"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}
          <button onClick={handleAddClass} style={{ marginLeft: "10px" }}>
            Add Class
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddClassForm
              classData={selectedClass} // Can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedClass
                  ? () => handleDeleteClass(selectedClass.ClassID)
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ClassID</th>
                <th>Name</th>
                <th>Schedule</th>
                <th>TrainerSSN</th>
                <th>MaxCapacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls.ClassID}>
                  <td>{cls.ClassID}</td>
                  <td>{cls.Name}</td>
                  <td>{cls.Schedule}</td>
                  <td>{cls.TrainerSSN}</td>
                  <td>{cls.MaxCapacity}</td>
                  <td>
                    <button onClick={() => handleEditClass(cls)}>Edit</button>
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

export default ClassesPage;
