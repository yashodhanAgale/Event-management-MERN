require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Event = require("./models/Event");
const cors = require("cors");

const app = express();
const server = http.createServer(app); // Create HTTP server for WebSockets

// ✅ Allow CORS for WebSockets & API
const io = new Server(server, {
  cors: {
    origin:
      process.env.FRONTEND_URL ||
      "https://event-management-mern-wfcr.vercel.app",
    methods: ["GET", "POST"],
  },
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Apply CORS Middleware
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "https://event-management-mern-wfcr.vercel.app/",
  })
);
app.use(express.json());

// ✅ Test Route to Check Deployment
app.get("/", (req, res) => {
  res.send("Hello from backend! 🚀 WebSockets are working.");
});

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// ✅ WebSockets for Real-Time Updates
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinEvent", async ({ eventId }) => {
    try {
      const event = await Event.findById(eventId);
      if (event) {
        io.emit("updateAttendeeCount", {
          eventId,
          count: event.attendees.length,
        });
      }
    } catch (error) {
      console.error("Error updating attendee count:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
