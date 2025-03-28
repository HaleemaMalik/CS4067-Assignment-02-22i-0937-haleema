const { DataTypes } = require("sequelize");

let Booking; // Declare Booking here so we can export it later

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Booking", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "unpaid",
    },
  });
};




// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Booking = sequelize.define("Booking", {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     eventId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "pending",
//     },
//     paymentStatus: {
//       type: DataTypes.STRING,
//       defaultValue: "unpaid",
//     },
//   });

//   return Booking;
// };
