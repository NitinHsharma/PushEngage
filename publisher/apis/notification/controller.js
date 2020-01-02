const service = require('./service.js');
const Joi = require('joi');
const { notificationSchema } = require('./schema.js');

const pushView = async (req, res) => {
    try {
        // validation of input
        const { error } = Joi.validate(req.body, notificationSchema);
        if (error) {
            res.status(422);
            return res.send(error);
        }

        // make the object
        const data = JSON.stringify({
            notificationId: req.body.notificationId,
            siteId: req.body.siteId,
            action: 'VIEW',
            currentTimestamp: new Date().toISOString()
        });

        // calling service for the main work (without await like fire and forget)
        service.pushQueue(data);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500);
        return res.send({ message: 'Something went wrong', data: [] });
    }
}

const pushClick = async (req, res) => {
    try {
        // input validation
        const { error } = Joi.validate(req.body, notificationSchema);
        if (error) {
            res.status(422);
            return res.send(error);
        }

        // make the object
        const data = JSON.stringify({
            notificationId: req.body.notificationId,
            siteId: req.body.siteId,
            action: 'CLICK',
            currentTimestamp: Date()
        });

        // calling service for the main work (without await like fire and forget)
        service.pushQueue(data);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500);
        return res.send({ message: 'Something went wrong', data: [] });
    }
}


// const commonFunctionality = async (req, res, action) => {
//     const { error } = Joi.validate(req.body, notificationSchema);
//     if (error) {
//         res.status(422);
//         return res.send(error);
//     }

//     // make the object
//     const data = JSON.stringify({
//         notificationId: req.body.notificationId,
//         siteId: req.body.siteId,
//         action,
//         currentTimestamp: Date.now()
//     });

//     // calling service for the main work
//     service.pushQueue(data);
//     return res.sendStatus(200);

// }

module.exports = {
    pushView,
    pushClick
};