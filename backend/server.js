require("dotenv").config();
const express = require("express");
const http = require("http"); // Required for WebSockets
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Event = require("./models/Event"); // Import Event model
const cors = require("cors");

const app = express();
const server = http.createServer(app); // Create HTTP server for WebSockets
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend requests
  },
});

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// WebSocket Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinEvent", async ({ eventId }) => {
    try {
      const event = await Event.findById(eventId);
      if (event) {
        io.emit("updateAttendeeCount", {
          eventId,
          count: event.attendees.length,
        }); // Send correct count
      }
    } catch (error) {
      console.error("Error updating attendee count:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
