const amqp = require("amqplib");
const Notification = require("./models/Notification");
const nodemailer = require("nodemailer");
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
const QUEUE_NAME = "booking_notifications";

// ✅ Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send an email
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// ✅ Retry wrapper for RabbitMQ connection
async function connectRabbitMQWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      console.log('✅ Connected to RabbitMQ');
      return connection;
    } catch (error) {
      console.error(`❌ RabbitMQ connection failed [${i + 1}/${retries}]: ${error.message}`);
      if (i < retries - 1) {
        console.log(`🔁 Retrying in ${delay / 1000}s...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('❌ Max retries reached. Exiting.');
        process.exit(1);
      }
    }
  }
}

// ✅ Fetch user email from User Service
async function getUserEmail(userId) {
  try {
    const response = await fetch(`http://user-service:5001/users/${userId}`);
    const userData = await response.json();
    return userData.email;
  } catch (error) {
    console.error("❌ Error fetching user email:", error);
    return null;
  }
}

// ✅ Main consumer function (uses retry-connection)
async function consumeMessages() {
  try {
    const connection = await connectRabbitMQWithRetry(); // ✅ uses retry logic
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log(`📥 Waiting for booking messages in queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const booking = JSON.parse(msg.content.toString());
        console.log("📩 New booking notification received:", booking);

        // Save to MongoDB
        await Notification.create({
          userId: booking.userId,
          eventId: booking.eventId,
          message: `Booking confirmed for event ${booking.eventId}`,
        });

        // Send Email
        const userEmail = await getUserEmail(booking.userId);
        if (userEmail) {
          await sendEmail(
            userEmail,
            "Booking Confirmation",
            `Hello! 🎉 Your booking for Event ID ${booking.eventId} has been confirmed!`
          );
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("❌ Error in consumeMessages():", error);
  }
}

module.exports = {
  connectRabbitMQWithRetry,
  consumeMessages,
};
