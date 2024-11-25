// AddEquipmentForm.tsx
import React, { useState, useEffect } from "react";
import "../index.css";

interface Equipment {
  EquipmentID: string;
  EquipmentName: string;
  TargetGroup: string;
  MaintainanceSchedule: string;
  ConditionStatus: string;
  GymID: string;
}

interface AddEquipmentFormProps {
  equipment?: Equipment;
  onSave: (equipment: Equipment) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  equipment,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Equipment>({
    EquipmentID: "",
    EquipmentName: "",
    TargetGroup: "",
    MaintainanceSchedule: "",
    ConditionStatus: "",
    GymID: "",
  });

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    } else {
      setFormData({
        EquipmentID: "",
        EquipmentName: "",
        TargetGroup: "",
        MaintainanceSchedule: "",
        ConditionStatus: "",
        GymID: "",
      });
    }
  }, [equipment]);

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
      <h2>{equipment ? "Edit Equipment" : "Add Equipment"}</h2>

      <input
        type="text"
        name="EquipmentID"
        value={formData.EquipmentID}
        onChange={handleChange}
        placeholder="Equipment ID"
        required
      />

      <input
        type="text"
        name="EquipmentName"
        value={formData.EquipmentName}
        onChange={handleChange}
        placeholder="Equipment Name"
        required
      />

      <input
        type="text"
        name="TargetGroup"
        value={formData.TargetGroup}
        onChange={handleChange}
        placeholder="Target Group"
        required
      />

      <input
        type="text"
        name="MaintainanceSchedule"
        value={formData.MaintainanceSchedule}
        onChange={handleChange}
        placeholder="MaintainanceSchedule"
      />

      <input
        type="text"
        name="ConditionStatus"
        value={formData.ConditionStatus}
        onChange={handleChange}
        placeholder="Condition Status"
        required
      />

      <input
        type="number"
        name="GymID"
        value={formData.GymID !== null ? formData.GymID : ""}
        onChange={handleChange}
        placeholder="Gym ID"
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

export default AddEquipmentForm;
