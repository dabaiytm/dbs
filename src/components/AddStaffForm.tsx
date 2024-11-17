import React, { useState, useEffect } from "react";

interface Staff {
  StaffSSN: string;
  Fname: string;
  Lname: string;
  ContactInfo: string;
  GymID: string;
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
    StaffSSN: "",
    Fname: "",
    Lname: "",
    ContactInfo: "",
    GymID: "",
  });

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    } else {
      setFormData({
        StaffSSN: "",
        Fname: "",
        Lname: "",
        ContactInfo: "",
        GymID: "",
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
        name="StaffSSN"
        value={formData.StaffSSN}
        onChange={handleChange}
        placeholder="Staff SSN"
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
        name="ContactInfo"
        value={formData.ContactInfo}
        onChange={handleChange}
        placeholder="Contact Info"
      />
      <input
        type="text"
        name="GymID"
        value={formData.GymID}
        onChange={handleChange}
        placeholder="Gym ID"
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

export default AddStaffForm;
