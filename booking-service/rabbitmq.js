const amqp = require("amqplib");

async function publishBookingEvent(booking) {
    try {
        const connection = await amqp.connect("amqp://rabbitmq");
        const channel = await connection.createChannel();
        const queue = "booking_notifications";

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(booking)));

        console.log("📢 Booking event published:", booking);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("❌ RabbitMQ Error:", error);
    }
}

module.exports = { publishBookingEvent };
