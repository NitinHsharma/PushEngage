const amqp = require('amqplib');
const config = require('../config.json');
const mongodb = require('./mongo');
const utils = require('./utils');

const { connectionString, queueName } = config.rabbitMQ;

(async () => {
    try {
        // connection to rabbitmq
        const conn = await amqp.connect(connectionString);
        const channel = await conn.createChannel();
        await channel.assertQueue(queueName);
        channel.consume(queueName, function (msg) {

            // checking the data
            if (!msg || !msg.content) {
                return;
            }

            const data = msg.content.toString();
            // calling async function without await (fire and forget)
            insertData(data);
            channel.ack(msg);
        });

    } catch (error) {
        console.error(error);
    }

})();


const insertData = async (data) => {
    // safely parse the json
    const JsonData = utils.jsonParse(data);
    if (!JsonData) {
        console.error('Failed to parse json data ', data);
        return;
    }

    const notification = new mongodb.notificationModel(JsonData);
    // storing the data into mongo
    notification.save();
}
