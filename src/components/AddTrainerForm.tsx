import React, { useState, useEffect } from "react";

interface Trainer {
  TrainerSSN: string;
  Fname: string;
  Lname: string;
  GymID: number;
}

interface AddTrainerFormProps {
  trainer?: Trainer;
  onSave: (trainer: Trainer) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddTrainerForm: React.FC<AddTrainerFormProps> = ({
  trainer,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Trainer>({
    TrainerSSN: "",
    Fname: "",
    Lname: "",
    GymID: 0,
  });

  useEffect(() => {
    if (trainer) {
      setFormData(trainer);
    } else {
      setFormData({
        TrainerSSN: "",
        Fname: "",
        Lname: "",
        GymID: 0,
      });
    }
  }, [trainer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "GymID" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{trainer ? "Edit Trainer" : "Add Trainer"}</h2>

      <input
        type="text"
        name="TrainerSSN"
        value={formData.TrainerSSN}
        onChange={handleChange}
        placeholder="Trainer SSN"
        required
      />

      <input
        type="text"
        name="Fname"
        value={formData.Fname}
        onChange={handleChange}
        placeholder="First Name"
        required
      />

      <input
        type="text"
        name="Lname"
        value={formData.Lname}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />

      <input
        type="number"
        name="GymID"
        value={formData.GymID}
        onChange={handleChange}
        placeholder="Gym ID"
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

export default AddTrainerForm;
