const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI_NOTIFY);
        console.log("✅ Connected to MongoDB (Notification Service)");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
