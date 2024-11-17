import React, { useState, useEffect } from "react";

interface Member {
  MemID: string;
  Fname: string;
  Lname: string;
  DOB: string;
  Email: string;
  Cell: string;
  JoinDate: string;
  Status: string;
  FitnessGoal: string;
  LockerID: string;
  GymID: string;
  MembershipID: string;
  TrainerSSN: string;
  Street: string;
  City: string;
  State: string;
  Zipcode: string;
  ERContactName: string;
  ERContactPhone: string;
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
    Cell: "",
    JoinDate: "",
    Status: "",
    FitnessGoal: "",
    LockerID: "",
    GymID: "",
    MembershipID: "",
    TrainerSSN: "",
    Street: "",
    City: "",
    State: "",
    Zipcode: "",
    ERContactName: "",
    ERContactPhone: "",
  });

  useEffect(() => {
    if (member) {
      setFormData(member); // Load member data into the form if member exists
    } else {
      setFormData({
        MemID: "",
        Fname: "",
        Lname: "",
        DOB: "",
        Email: "",
        Cell: "",
        JoinDate: "",
        Status: "",
        FitnessGoal: "",
        LockerID: "",
        GymID: "",
        MembershipID: "",
        TrainerSSN: "",
        Street: "",
        City: "",
        State: "",
        Zipcode: "",
        ERContactName: "",
        ERContactPhone: "",
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
      <input
        type="text"
        name="GymID"
        value={formData.GymID}
        onChange={handleChange}
        placeholder="Gym ID"
      />
      <input
        type="text"
        name="MembershipID"
        value={formData.MembershipID}
        onChange={handleChange}
        placeholder="Membership ID"
      />
      <input
        type="text"
        name="TrainerSSN"
        value={formData.TrainerSSN}
        onChange={handleChange}
        placeholder="Trainer SSN"
      />
      <input
        type="text"
        name="Street"
        value={formData.Street}
        onChange={handleChange}
        placeholder="Street"
      />
      <input
        type="text"
        name="City"
        value={formData.City}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="State"
        value={formData.State}
        onChange={handleChange}
        placeholder="State"
      />
      <input
        type="text"
        name="Zipcode"
        value={formData.Zipcode}
        onChange={handleChange}
        placeholder="Zipcode"
      />
      <input
        type="text"
        name="ERContactName"
        value={formData.ERContactName}
        onChange={handleChange}
        placeholder="Emergency Contact Name"
      />
      <input
        type="tel"
        name="ERContactPhone"
        value={formData.ERContactPhone}
        onChange={handleChange}
        placeholder="Emergency Contact Phone"
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

export default AddMemberForm;
