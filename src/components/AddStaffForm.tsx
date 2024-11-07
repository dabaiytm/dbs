import React, { useState, useEffect } from "react";

interface Staff {
  StaffID: string;
  Fname: string;
  Lname: string;
  Role: string;
  Schedule: string;
  ContactInfo: string;
}

interface AddStaffFormProps {
  staff?: Staff;
  onSave: (staff: Staff) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({
  staff,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Staff>({
    StaffID: "",
    Fname: "",
    Lname: "",
    Role: "",
    Schedule: "",
    ContactInfo: "",
  });

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    } else {
      setFormData({
        StaffID: "",
        Fname: "",
        Lname: "",
        Role: "",
        Schedule: "",
        ContactInfo: "",
      });
    }
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Call onSave with the form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{staff ? "Edit Staff" : "Add New Staff"}</h2>

      <input
        type="text"
        name="StaffID"
        value={formData.StaffID}
        onChange={handleChange}
        placeholder="Staff ID"
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
        type="text"
        name="Role"
        value={formData.Role}
        onChange={handleChange}
        placeholder="Role"
      />
      <input
        type="text"
        name="Schedule"
        value={formData.Schedule}
        onChange={handleChange}
        placeholder="Schedule"
      />
      <input
        type="text"
        name="ContactInfo"
        value={formData.ContactInfo}
        onChange={handleChange}
        placeholder="ContactInfo"
      />

      <br></br>

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

export default AddStaffForm;
