const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const event = new Event({
      name,
      description,
      date,
      createdBy: req.user.id,
    });
    await event.save();
    res.status(201).json({ message: "Event created successfully!", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Join event controller
exports.joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id; // Get user ID from JWT

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Prevent duplicate joins
    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already joined this event" });
    }

    event.attendees.push(userId);
    await event.save();

    res.status(200).json({
      message: "Event joined successfully",
      attendees: event.attendees,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
