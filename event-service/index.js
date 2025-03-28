const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./config/database");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 5002;

connectDB(); // Connect to MongoDB

app.get('/events', (req, res) => {
  res.json([{ id: 1, name: "Sample Event" }]);  // Example response
});

app.listen(PORT, () => {
  console.log(`🚀 Event Service running on port ${PORT}`);
});