import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEvent = () => {
  // const API_URL = import.meta.env.VITE_API_URL;
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://event-management-mern-wfcr.vercel.app/"; // Fallback

  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/events/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Event creation failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
