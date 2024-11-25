import React, { useEffect, useState } from "react";
import "../index.css";

interface Feedback {
  FeedbackID: number;
  MemID: string;
  FeedbackDate: string;
  FeedbackReview?: string;
  Rating?: number;
}

interface AddFeedbackFormProps {
  feedbackData?: Feedback;
  onSave: (feedback: Feedback) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddFeedbackForm: React.FC<AddFeedbackFormProps> = ({
  feedbackData,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Feedback>({
    FeedbackID: 0,
    MemID: "",
    FeedbackDate: "",
    FeedbackReview: "",
    Rating: 0,
  });

  useEffect(() => {
    if (feedbackData) {
      setFormData(feedbackData); // Set the form data based on feedbackData
    } else {
      setFormData({
        FeedbackID: 0,
        MemID: "",
        FeedbackDate: "",
        FeedbackReview: "",
        Rating: 0,
      });
    }
  }, [feedbackData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{feedbackData ? "Edit Feedback" : "Add Feedback"}</h2>
      <div className="input_bar">
        <input
          type="text"
          name="FeedbackID"
          value={formData.FeedbackID || ""}
          onChange={handleChange}
          placeholder="Feedback ID"
          disabled={!!feedbackData}
        />
        <input
          type="text"
          name="MemID"
          value={formData.MemID}
          onChange={handleChange}
          placeholder="Member ID"
          required
        />
        <input
          type="date"
          name="FeedbackDate"
          value={formData.FeedbackDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Rating"
          value={formData.Rating || ""}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min={1}
          max={5}
        />
        <textarea
          name="FeedbackReview"
          value={formData.FeedbackReview || ""}
          onChange={handleChange}
          placeholder="Feedback Review"
        />
      </div>
      <br />
      <div className="btns">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default AddFeedbackForm;
