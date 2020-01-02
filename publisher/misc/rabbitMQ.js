const amqp = require('amqplib');
const config = require('./../config.json');

let channel = null;
// getting configuration from config file
const { connectionString, queueName, stringFormat } = config.rabbitMQ;


const connection = async () => {
    const conn = await amqp.connect(connectionString);
    return conn.createChannel();
}

const pushMessage = async (data) => {
    if (!channel) {
        channel = await connection();
    }

    await channel.assertQueue(queueName, { durable: true });
    // Publish
    await channel.sendToQueue(queueName, Buffer.from(data, stringFormat));
    console.log('[x] Sent %s', data)
}

module.exports = {
    pushMessage
}