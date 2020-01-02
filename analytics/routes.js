const { getClickCountBySiteId, getViewCoutBySiteId, getClickCount, getViewCount } = require('./apis/notification/controller.js');


module.exports = (app) =>{

    /*
     * ping Routes
     */
    app.get('/ping', (req, res) => {
        return res.send('pong');
    })


    /*
     * get data Routes
     */
    app.get('/notification/:notificationId/views/count', getViewCount);
    app.get('/notification/:notificationId/clicks/count', getClickCount);
    app.get('/notification/views/site/:siteId/count', getViewCoutBySiteId);
    app.get('/notification/clicks/site/:siteId/count', getClickCountBySiteId);

}