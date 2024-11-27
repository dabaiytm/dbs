import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddFeedbackForm from "./AddFeedbackForm";
import "../index.css";

interface Feedback {
  FeedbackID: number;
  MemID: string;
  FeedbackDate: string;
  FeedbackReview?: string;
  Rating?: number;
}

const FeedbackPage: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<
    Feedback | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/feedback");
        setFeedbackList(response.data);
        setFilteredFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredFeedback(
      feedbackList.filter(
        (feedback) =>
          feedback.MemID?.toLowerCase().includes(query) ||
          feedback.FeedbackDate?.toLowerCase().includes(query)
      )
    );
  };

  const handleAddFeedback = () => {
    setSelectedFeedback(undefined);
    setShowForm(true);
  };

  const handleEditFeedback = async (feedback: Feedback) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/feedback/${feedback.FeedbackID}`
      );
      const feedbackData = response.data;
      setSelectedFeedback(feedbackData);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Failed to fetch feedback.");
    }
  };

  const handleSave = async (feedback: Feedback) => {
    try {
      if (selectedFeedback) {
        await axios.put(
          `http://localhost:5001/api/feedback/${feedback.FeedbackID}`,
          feedback
        );
        setFeedbackList((prevFeedbacks) =>
          prevFeedbacks.map((f) =>
            f.FeedbackID === feedback.FeedbackID ? feedback : f
          )
        );
        setFilteredFeedback((prevFeedbacks) =>
          prevFeedbacks.map((f) =>
            f.FeedbackID === feedback.FeedbackID ? feedback : f
          )
        );
      } else {
        await axios.post("http://localhost:5001/api/feedback", feedback);
        setFeedbackList((prevFeedbacks) => [...prevFeedbacks, feedback]);
        setFilteredFeedback((prevFeedbacks) => [...prevFeedbacks, feedback]);
      }
      alert("Feedback saved successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback.");
    }
  };

  const handleDeleteFeedback = async (MemID: string, FeedbackDate: string) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        // Send DELETE request with MemID and FeedbackDate as parameters
        await axios.delete(
          `http://localhost:5001/api/feedback/${MemID}/${FeedbackDate}`
        );

        // Update the feedback list by filtering out the deleted feedback
        setFeedbackList((prevFeedbacks) =>
          prevFeedbacks.filter(
            (f) => f.MemID !== MemID || f.FeedbackDate !== FeedbackDate
          )
        );
        setFilteredFeedback((prevFeedbacks) =>
          prevFeedbacks.filter(
            (f) => f.MemID !== MemID || f.FeedbackDate !== FeedbackDate
          )
        );

        alert("Feedback deleted successfully!");
        setShowForm(false); // Optionally hide the form after deletion
      } catch (error) {
        console.error("Error deleting feedback:", error);
        alert("Failed to delete feedback.");
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
        <h1 className="title">Feedback List</h1>
        <div>
          {!showForm && (
            <input
              type="text"
              placeholder="Search MemID or Feedback Date"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          )}

          <button onClick={handleAddFeedback} style={{ marginLeft: "10px" }}>
            Add Feedback
          </button>
        </div>
        <br />
        <br />

        {showForm && (
          <div className="modal">
            <AddFeedbackForm
              feedbackData={selectedFeedback}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedFeedback
                  ? () =>
                      handleDeleteFeedback(
                        selectedFeedback.MemID,
                        selectedFeedback.FeedbackDate
                      )
                  : undefined
              }
            />
          </div>
        )}

        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>FeedbackID</th>
                <th>MemID</th>
                <th>Feedback Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.map((feedback) => (
                <tr key={feedback.FeedbackID}>
                  <td>{feedback.FeedbackID}</td>
                  <td>{feedback.MemID}</td>
                  <td>{feedback.FeedbackDate}</td>
                  <td>
                    <button onClick={() => handleEditFeedback(feedback)}>
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

export default FeedbackPage;
