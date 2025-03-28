const express = require("express");
const dotenv = require("dotenv");
const { initDB } = require("./models");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

// Sample user registration route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
  }

  res.status(201).json({ message: "User registered successfully!", user: { name, email } });
});

// app.get("/users", async (req, res) => {
//   try {
//       const users = await User.findAll();  // If using Sequelize
//       res.json(users);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 User Service running on port ${PORT}`);
});
