import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFeedbackForm from "./AddFeedbackForm";

interface Feedback {
  FeedbackID: number;
  MemID: string;
  FeedbackDate: string;
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
    setSelectedFeedback(undefined); // No feedback selected for adding
    setShowForm(true);
  };

  const handleEditFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback); // Feedback selected for editing
    setShowForm(true);
  };

  const handleSave = async (feedback: Feedback) => {
    try {
      if (selectedFeedback) {
        // Update existing feedback
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
        // Add new feedback (no FeedbackID provided)
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

  const handleDeleteFeedback = async (feedbackID: number) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:5001/api/feedback/${feedbackID}`);
        setFeedbackList((prevFeedbacks) =>
          prevFeedbacks.filter((f) => f.FeedbackID !== feedbackID)
        );
        setFilteredFeedback((prevFeedbacks) =>
          prevFeedbacks.filter((f) => f.FeedbackID !== feedbackID)
        );
        alert("Feedback deleted successfully!");
        setShowForm(false);
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
          <button>Members</button>
          <button>Staffs</button>
          <button>Equipment</button>
          <button>Classes</button>
          <button>Retail Sales</button>
          <button>Trainers</button>
          <button>Feedback</button>
          <button>Log Out</button>
        </nav>
      </header>

      <main>
        <h1>Feedback List</h1>
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
              feedbackData={selectedFeedback} // Can be undefined
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={
                selectedFeedback
                  ? () => handleDeleteFeedback(selectedFeedback.FeedbackID)
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
