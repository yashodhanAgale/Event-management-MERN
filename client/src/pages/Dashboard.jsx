import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io client
import EventCard from "../components/EventCard";

const socket = io("https://event-management-mern-six.vercel.app"); // Replace with your backend URL

const Dashboard = () => {
  // const API_URL = import.meta.env.VITE_API_URL;
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://event-management-mern-six.vercel.app"; // Fallback

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/events`);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    // Listen for real-time updates
    socket.on("updateAttendeeCount", (eventId) => {
      fetchEvents(); // Refresh event list when an update happens
    });

    return () => socket.off("updateAttendeeCount"); // Cleanup
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => navigate("/create-event")}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Event
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
