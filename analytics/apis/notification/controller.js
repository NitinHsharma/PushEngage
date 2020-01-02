const service = require('./service');

const getViewCount = async (req, res) => {

    try {
        // validation of input
        const notificationId = req.params.notificationId;
        if (!notificationId) {
            res.status(422);
            return res.send({ message: 'notificationId is missing', count: null, data: [] });
        }

        // calling service for main work
        const count = await service.getViewCountByNotificationId(notificationId);
        return res.send({ message: 'Successfully executed', count, data: [] });

    } catch (error) {
        res.status(500);
        return res.send({ message: 'Something went wrong', count: null, data: [] });
    }
}

const getClickCount = async (req, res) => {

    try {
        // validation of input
        const notificationId = req.params.notificationId;
        if (!notificationId) {
            res.status(422);
            return res.send({ message: 'notificationId is missing', count: null, data: [] });
        }

        // calling service for main work
        const count = await service.getClickCountByNotificationId(notificationId);
        return res.send({ message: 'Successfully executed', count, data: [] });

    } catch (error) {
        res.status(500);
        return res.send({ message: 'Something went wrong', count: null, data: [] });
    }
}

const getViewCoutBySiteId = async (req, res) => {

    try {
        // validation of input
        const params = {
            siteId: req.params.siteId
        };

        if (!params.siteId) {
            res.status(422);
            return res.send({ message: 'siteId is missing', count: null, data: [] });
        }
        // checking from and to date
        if (req.query.from && req.query.to) {
            params.from = req.query.from;
            params.to = req.query.to;
        }

        // calling service for main work
        const count = await service.getViewCountBySiteId(params);
        console.log(count);
        return res.send({ message: 'Successfully executed', count, data: [] });

    } catch (error) {
        res.status(500);
        return res.send({ message: 'Something went wrong', count: null, data: [] });
    }
}

const getClickCountBySiteId = async (req, res) => {

    try {
        // validation of input
        const params = {
            siteId: req.params.siteId
        };

        if (!params.siteId) {
            res.status(422);
            return res.send({ message: 'siteId is missing',  count: null, data: []  });
        }

        // checking from date and to date
        if (req.query.from && req.query.to) {
            params.from = req.query.from;
            params.to = req.query.to;
        }

        // calling service for main work
        const count = await service.getClickCountBySiteId(params);
        return res.send({ message: 'Successfully executed', count, data: [] });

    } catch (error) {
        res.status(500);
        return res.send({ message: 'Something went wrong', count: null, data: []});
    }
}

module.exports = {
    getClickCountBySiteId,
    getViewCoutBySiteId,
    getClickCount,
    getViewCount
}