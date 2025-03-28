require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const { consumeMessages, connectRabbitMQWithRetry } = require("./rabbitmq");
const cors = require("cors");
const Notification = require("./models/Notification");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, async () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);

  // ✅ Connect to RabbitMQ with Retry
  const rabbitConnection = await connectRabbitMQWithRetry();

  // ✅ Start consuming messages using same connection
  await consumeMessages(rabbitConnection);
});

// GET all notifications
app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
