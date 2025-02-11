// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./config/db");
// const Event = require("./models/Event");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app); // Create HTTP server for WebSockets
// const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");

// // ✅ Allow CORS for WebSockets & API
// const io = new Server(server, {
//   cors: {
//     origin:
//       process.env.FRONTEND_URL ||
//       "https://event-management-mern-qbw3.onrender.com",
//     methods: ["GET", "POST"],
//   },
// });

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Apply CORS Middleware
// // app.use(
// //   cors({
// //     origin:
// //       process.env.FRONTEND_URL ||
// //       "https://event-management-mern-wfcr.vercel.app/",
// //   })
// // );

// app.use(cors());
// app.use(express.json());

// // ✅ Test Route to Check Deployment
// app.get("/", (req, res) => {
//   res.send("Hello from backend! 🚀 WebSockets are working.");
// });

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);

// // ✅ WebSockets for Real-Time Updates
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinEvent", async ({ eventId }) => {
//     try {
//       const event = await Event.findById(eventId);
//       if (event) {
//         io.emit("updateAttendeeCount", {
//           eventId,
//           count: event.attendees.length,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating attendee count:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./config/db");
// const Event = require("./models/Event");
// const cors = require("cors");

// // ✅ Initialize Express App
// const app = express();
// const server = http.createServer(app); // Create HTTP server for WebSockets
// const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");

// // ✅ Allow CORS for Frontend & API Requests
// const allowedOrigins = [
//   "https://event-management-mern-wfcr.vercel.app", // ✅ Your Frontend URL
//   "https://event-management-mern-qbw3.onrender.com", // ✅ Your Backend URL (API)
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // ✅ Allows cookies & authentication headers
//   })
// );

// app.use(express.json()); // ✅ Parse JSON Requests

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Test Route to Check Deployment
// app.get("/", (req, res) => {
//   res.send("Hello from backend! 🚀 WebSockets are working.");
// });

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);

// // ✅ WebSockets for Real-Time Updates
// const io = new Server(server, {
//   cors: { origin: allowedOrigins, methods: ["GET", "POST"] },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinEvent", async ({ eventId }) => {
//     try {
//       const event = await Event.findById(eventId);
//       if (event) {
//         io.emit("updateAttendeeCount", {
//           eventId,
//           count: event.attendees.length,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating attendee count:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./config/db");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app); // Create HTTP server for WebSockets

// // ✅ Set CORS Correctly
// const allowedOrigins = [
//   "https://event-management-mern-wfcr.vercel.app", // ✅ Your Frontend URL
//   "https://event-management-mern-fawn.vercel.app", // ✅ Your Backend API URL
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// // ✅ Fix Preflight Request Issue (CORS for ALL Routes)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200); // ✅ Handle preflight requests
//   }

//   next();
// });

// app.use(express.json());

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Test Route to Check Deployment
// app.get("/", (req, res) => {
//   res.send("Hello from backend! 🚀 WebSockets are working.");
// });

// // ✅ API Routes
// const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);

// // ✅ WebSockets for Real-Time Updates
// const io = new Server(server, {
//   cors: { origin: allowedOrigins, methods: ["GET", "POST"] },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./config/db");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const server = http.createServer(app);

// // ✅ Fix CORS Issues
// const allowedOrigins = [
//   "https://event-management-mern-wfcr.vercel.app", // ✅ Your Frontend URL
//   "https://event-management-mern-fawn.vercel.app", // ✅ Your Backend API URL
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Requested-With"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// // ✅ Use Body Parser (Same as Working Backend)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Test Route to Check Deployment
// app.get("/", (req, res) => {
//   res.send("Hello from backend! 🚀 WebSockets are working.");
// });

// // ✅ Import Routes
// const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);

// // ✅ WebSockets (Allow CORS)
// const io = new Server(server, {
//   cors: { origin: allowedOrigins, methods: ["GET", "POST"] },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

// ✅ Set Allowed Frontend URLs
const allowedOrigins = [
  "https://event-management-mern-wfcr.vercel.app", // ✅ Your Frontend
  "https://event-management-mern-qbw3.onrender.com", // ✅ Your Backend
];

// ✅ Fix CORS Issues
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Hello from backend! 🚀 WebSockets are working.");
});

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// ✅ WebSockets with CORS Fix
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
