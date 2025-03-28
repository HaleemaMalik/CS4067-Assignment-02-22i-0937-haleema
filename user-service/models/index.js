const sequelize = require("../config/database");
const User = require("./User");

const initDB = async () => {
	try {
		await sequelize.sync({ alter: true });
		console.log("✅ Database & tables created!");
	} catch (error) {
		console.error("❌ Error initializing database:", error);
	}
};

module.exports = { User, initDB };