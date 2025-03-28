// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// const router = express.Router();

// // Register a new user
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // User login
// // // User login
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     console.log(`🟢 Login attempt for: ${email}`);

// //     const user = await User.findOne({ where: { email } });

// //     if (!user) {
// //       console.log("🔴 User not found!");
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       console.log("🔴 Incorrect password!");
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //     console.log("✅ Login successful!");
    
// //     res.json({ token });
// //   } catch (error) {
// //     console.error("❌ Server error:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, userId: user.id }); // 🔥 Return userId along with token
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });



// // Get user profile
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Update user
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     await user.update({ name, email });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Delete user
// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     await user.destroy();
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;










const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();

// ✅ Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(`🟢 Registering user: ${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    console.log("✅ User registered successfully:", user.id);
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ Registration failed:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// ✅ User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🟢 Login attempt for: ${email}`);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("🔴 User not found!");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("🔴 Incorrect password!");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful for:", user.id);
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error("❌ Server error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get user profile
router.get("/:id", async (req, res) => {
  try {
    console.log(`🟢 Fetching profile for user: ${req.params.id}`);
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log("🔴 User not found!");
      return res.status(404).json({ error: "User not found" });
    }
    console.log("✅ User profile fetched:", user.id);
    res.json(user);
  } catch (error) {
    console.error("❌ Server error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User
// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from PostgreSQL
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Update user
router.put("/:id", async (req, res) => {
  try {
    console.log(`🟢 Updating user: ${req.params.id}`);
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log("🔴 User not found!");
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ name, email });
    console.log("✅ User updated:", user.id);
    res.json(user);
  } catch (error) {
    console.error("❌ Server error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete user
router.delete("/:id", async (req, res) => {
  try {
    console.log(`🟢 Deleting user: ${req.params.id}`);
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log("🔴 User not found!");
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    console.log("✅ User deleted:", req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Server error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
