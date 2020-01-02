const notificationController = require('./apis/notification/controller.js');


module.exports = function (app) {

    /*
     * ping Routes
     */
    app.get('/ping', (req, res) => {
        return res.send('pong');
    })


    /*
     * publisher Routes
     */
    app.post('/view', notificationController.pushView);
    app.post('/click', notificationController.pushClick);

}