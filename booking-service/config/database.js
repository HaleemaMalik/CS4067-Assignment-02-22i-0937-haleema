// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// console.log("Connecting to DB:", process.env.POSTGRES_URI);
// const sequelize = new Sequelize(process.env.POSTGRES_URI, {
//   dialect: "postgres",
//   logging: false,
// });

// module.exports = sequelize;



const { Sequelize } = require("sequelize");

const connectWithRetry = async () => {
  const sequelize = new Sequelize(process.env.POSTGRES_URI_BOOKING, {
    dialect: "postgres",
    logging: false,
  });

  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connection established.");
      break;
    } catch (err) {
      console.error("❌ Failed to connect to PostgreSQL. Retrying in 5s...");
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return sequelize;
};

module.exports = connectWithRetry;
