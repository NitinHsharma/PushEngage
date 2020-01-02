const mongo = require('../../mics/mongo');

const getViewCountByNotificationId = async (id) => {

    // converting string into mongo object
    const objectId = mongo.ObjectId(id);
    // getting aggergate data from DB
    const result = await mongo.notificationModel.aggregate([
        {
            $match: { notificationId: objectId, action: 'VIEW' }
        },
        {
            $group: { _id: null, count: { $sum: 1 } }
        },

    ]);
    // checking result
    if (result && result[0]) {
        return result[0].count;
    }
    return 0;
}

const getClickCountByNotificationId = async (id) => {

    // converting string into mongo object
    const objectId = mongo.ObjectId(id);
    // getting aggergate data from DB
    const result = await mongo.notificationModel.aggregate([
        {
            $match: { notificationId: objectId, action: 'CLICK' }
        },
        {
            $group: { _id: null, count: { $sum: 1 } }
        },

    ]);
    // checking result
    if (result && result[0]) {
        return result[0].count;
    }
    return 0;
}

const getViewCountBySiteId = async (params) => {
    // deconstruct
    const { siteId: id, from, to } = params;
    // converting string into mongo object
    const objectId = mongo.ObjectId(id);
    const match = {
        siteId: objectId,
        action: 'VIEW'
    };
    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        match.currentTimestamp = { "$gte": fromDate, "$lte": toDate };
    }

    // getting aggergate data from DB
    const result = await mongo.notificationModel.aggregate([
        {
            $match: match
        },
        {
            $group: { _id: null, count: { $sum: 1 } }
        }
    ]);
    // checking result
    if (result && result[0]) {
        return result[0].count;
    }
    return 0;
}

const getClickCountBySiteId = async (params) => {
    // deconstor
    const { siteId: id, from, to } = params;
    // converting string into mongo object
    const objectId = mongo.ObjectId(id);
    const match = {
        siteId: objectId,
        action: 'CLICK'
    };
    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        match.currentTimestamp = { "$gte": fromDate, "$lte": toDate };
    }

    // getting aggergate data from DB
    const result = await mongo.notificationModel.aggregate([
        {
            $match: match
        },
        {
            $group: { _id: null, count: { $sum: 1 } }
        }
    ]);

    // checking result 
    if (result && result[0]) {
        return result[0].count;
    }
    return 0;
}

module.exports = {
    getViewCountByNotificationId,
    getClickCountByNotificationId,
    getViewCountBySiteId,
    getClickCountBySiteId
}