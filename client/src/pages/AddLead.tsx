import { useState } from "react";
import API from "../api/axios";

const AddLead = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    status: "New",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/leads", form);
      alert("Lead added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Add Lead</h2>

      <input name="name" placeholder="Name" onChange={handleChange} className="block mb-2 p-2 bg-gray-800" />
      <input name="email" placeholder="Email" onChange={handleChange} className="block mb-2 p-2 bg-gray-800" />

      <select name="source" onChange={handleChange} className="block mb-2 p-2 bg-gray-800">
        <option value="">Select Source</option>
        <option>Website</option>
        <option>Instagram</option>
        <option>Referral</option>
      </select>

      <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded">
        Save Lead
      </button>
    </div>
  );
};

export default AddLead;