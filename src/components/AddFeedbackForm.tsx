import React, { useState, useEffect } from "react";

interface Feedback {
  FeedbackID: number; // Optional for adding new feedback
  MemID: string;
  FeedbackDate: string;
}

interface AddFeedbackFormProps {
  feedbackData?: Feedback;
  onSave: (feedbackData: Feedback) => void;
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
  });

  useEffect(() => {
    if (feedbackData) {
      setFormData(feedbackData); // Populate form with existing feedback data for editing
    } else {
      setFormData({
        FeedbackID: 0,
        MemID: "",
        FeedbackDate: "",
      });
    }
  }, [feedbackData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Save the feedback (new or updated)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{feedbackData ? "Edit Feedback" : "Add Feedback"}</h2>

      <input
        type="text"
        name="FeedbackID"
        value={formData.FeedbackID || ""}
        onChange={handleChange}
        placeholder="Feedback ID"
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
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      {onDelete && (
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      )}
    </form>
  );
};

export default AddFeedbackForm;
