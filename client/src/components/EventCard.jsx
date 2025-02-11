import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("https://event-management-mern-qbw3.onrender.com"); // Replace with your backend URL

const EventCard = ({ event }) => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [attendeeCount, setAttendeeCount] = useState(event.attendees.length);
  const [hasJoined, setHasJoined] = useState(event.attendees.includes(user.id)); // Check if user has joined

  useEffect(() => {
    // Listen for real-time updates
    socket.on("updateAttendeeCount", ({ eventId, count }) => {
      if (eventId === event._id) {
        setAttendeeCount(count); // Update with correct count from backend
      }
    });

    return () => socket.off("updateAttendeeCount");
  }, []);

  const handleJoinEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/api/events/${event._id}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHasJoined(true);
      socket.emit("joinEvent", {
        eventId: event._id,
        count: data.attendees.length,
      }); // Send correct count
    } catch (error) {
      alert(error.response?.data?.message || "Failed to join event");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-400">
        {new Date(event.date).toLocaleString()}
      </p>
      <p className="text-blue-500 font-bold">Attendees: {attendeeCount}</p>

      <button
        onClick={handleJoinEvent}
        className={`mt-2 px-4 py-2 rounded ${
          hasJoined
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 text-white"
        }`}
        disabled={hasJoined}
      >
        {hasJoined ? "Joined" : "Join Event"}
      </button>
    </div>
  );
};

export default EventCard;
