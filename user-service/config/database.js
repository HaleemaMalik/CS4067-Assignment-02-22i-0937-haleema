const { Sequelize } = require("sequelize");
require('dotenv').config();

// await sequelize.sync(); // Creates tables if not exist

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
};


// require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate()
  .then(() => {
	console.log("✅ Database connection has been established successfully.");
  })
  .catch((error) => {
	console.error("❌ Unable to connect to the database:", error);
  });


module.exports = sequelize;
