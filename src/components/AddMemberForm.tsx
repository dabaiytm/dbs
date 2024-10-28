import React, { useState, useEffect } from "react";

interface Member {
  MemID: string;
  Fname: string;
  Lname: string;
  DOB: string;
  Email: string;
  Addr: string;
  Cell: string;
  JoinDate: string;
  Status: string;
  ERcontact: string;
  FitnessGoal: string;
  LockerID: string;
}

interface AddMemberFormProps {
  member: Member | undefined; // Accept undefined here
  onSave: (member: Member) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({
  member,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Member>({
    MemID: "",
    Fname: "",
    Lname: "",
    DOB: "",
    Email: "",
    Addr: "",
    Cell: "",
    JoinDate: "",
    Status: "",
    ERcontact: "",
    FitnessGoal: "",
    LockerID: "",
  });

  useEffect(() => {
    if (member) {
      setFormData(member); // Load member data into the form if member exists
    } else {
      // Reset the form data for adding a new member
      setFormData({
        MemID: "",
        Fname: "",
        Lname: "",
        DOB: "",
        Email: "",
        Addr: "",
        Cell: "",
        JoinDate: "",
        Status: "",
        ERcontact: "",
        FitnessGoal: "",
        LockerID: "",
      });
    }
  }, [member]);

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
      <h2>{member ? "Edit Member" : "Add New Member"}</h2>

      <input
        type="text"
        name="MemID"
        value={formData.MemID}
        onChange={handleChange}
        placeholder="Member ID"
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
        type="date"
        name="DOB"
        value={formData.DOB}
        onChange={handleChange}
        placeholder="Date of Birth"
      />
      <input
        type="email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="Addr"
        value={formData.Addr}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="tel"
        name="Cell"
        value={formData.Cell}
        onChange={handleChange}
        placeholder="Cell Number"
      />
      <input
        type="date"
        name="JoinDate"
        value={formData.JoinDate}
        onChange={handleChange}
        placeholder="Join Date"
      />
      <input
        type="text"
        name="Status"
        value={formData.Status}
        onChange={handleChange}
        placeholder="Status"
      />
      <input
        type="text"
        name="ERcontact"
        value={formData.ERcontact}
        onChange={handleChange}
        placeholder="Emergency Contact"
      />
      <input
        type="text"
        name="FitnessGoal"
        value={formData.FitnessGoal}
        onChange={handleChange}
        placeholder="Fitness Goal"
      />
      <input
        type="text"
        name="LockerID"
        value={formData.LockerID}
        onChange={handleChange}
        placeholder="Locker ID"
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

export default AddMemberForm;
