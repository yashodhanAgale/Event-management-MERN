const express = require("express");
const {
  createEvent,
  getEvents,
  joinEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/create", authMiddleware, createEvent);
router.get("/", getEvents);
router.post("/:eventId/join", authMiddleware, joinEvent);
module.exports = router;
