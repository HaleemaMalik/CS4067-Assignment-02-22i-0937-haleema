const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// ✅ Create an event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, price, createdBy } = req.body;
    const event = await Event.create({ title, description, date, location, price, createdBy });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
