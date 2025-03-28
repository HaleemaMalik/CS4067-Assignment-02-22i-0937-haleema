const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5003;

// Import sequelize instance and models
const { sequelize } = require("./models");

// Import routes
const bookingRoutes = require("./routes/bookingRoutes");

// Middleware
app.use(express.json());
app.use("/bookings", bookingRoutes);

// Sync DB and start server
sequelize.sync()
  .then(() => {
    console.log("✅ Booking Service: Database synced successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Booking Service is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Booking Service: Failed to sync database:", err);
  });
