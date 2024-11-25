import React, { useState, useEffect } from "react";
import "../index.css";

interface Class {
  ClassID: string;
  Name: string;
  Schedule: string;
  TrainerSSN: string;
  MaxCapacity: string;
}

interface AddClassFormProps {
  classData?: Class;
  onSave: (classData: Class) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddClassForm: React.FC<AddClassFormProps> = ({
  classData,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Class>({
    ClassID: "",
    Name: "",
    Schedule: "",
    TrainerSSN: "",
    MaxCapacity: "",
  });

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    } else {
      setFormData({
        ClassID: "",
        Name: "",
        Schedule: "",
        TrainerSSN: "",
        MaxCapacity: "",
      });
    }
  }, [classData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{classData ? "Edit Class" : "Add Class"}</h2>
      <input
        type="text"
        name="ClassID"
        value={formData.ClassID}
        onChange={handleChange}
        placeholder="Class ID"
        required
      />

      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        placeholder="Class Name"
        required
      />

      <input
        type="text"
        name="Schedule"
        value={formData.Schedule}
        onChange={handleChange}
        placeholder="Schedule"
        required
      />

      <input
        type="text"
        name="TrainerSSN"
        value={formData.TrainerSSN}
        onChange={handleChange}
        placeholder="Instructor ID"
        required
      />

      <input
        type="text"
        name="MaxCapacity"
        value={formData.MaxCapacity}
        onChange={handleChange}
        placeholder="Max Capacity"
        required
      />
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

export default AddClassForm;
