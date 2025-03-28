// const connectWithRetry = require("../config/database");
// const Booking = require("./Booking");

// let sequelize;

// const initDB = async () => {
//   try {
//     sequelize = await connectWithRetry(); // Get actual sequelize instance
//     await sequelize.sync({ alter: true });
//     console.log("✅ Database & tables created!");
//   } catch (error) {
//     console.error("❌ Error initializing database:", error);
//   }
// };

// module.exports = { Booking, initDB };










const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URI_BOOKING, {
  dialect: "postgres",
});

const Booking = require("./Booking")(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Booking,
};






// const { Sequelize } = require("sequelize");
// const Booking = require("./Booking");

// const initModels = async (sequelize) => {
//   Booking.initModel(sequelize); // or sequelize.define(...)
//   await sequelize.sync();       // use { force: true } or { alter: true } if needed
// };

// module.exports = { initModels };


// /models/index.js
// const { Sequelize } = require("sequelize");
// const config = require("../config/database");
// const BookingModel = require("./Booking");

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: "postgres",
//   port: config.PORT,
//   logging: false,
// });

// // initialize model
// const Booking = BookingModel(sequelize);

// sequelize.sync(); // optional: use `await` if this is async in your main index.js

// module.exports = {
//   getBookingModel: () => Booking,
// };
