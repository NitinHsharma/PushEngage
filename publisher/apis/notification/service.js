const rabbitMq = require('../../misc/rabbitMQ');

const pushQueue = async (params) => {
    // making call to lib for sending msg into q
    await rabbitMq.pushMessage(params);
};

module.exports = {
    pushQueue
};
