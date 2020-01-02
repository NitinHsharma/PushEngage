const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Config = require('../config.json');

// ConnectionString
const dbHost = Config.dbConfig.host;

// for taking username and password from env constiables
//let dbHost = dbHost.replace('{{username}}', process.env.DBUSER).replace("password", process.env.DBPASSWORD);

mongoose.Promise = global.Promise;

// Connection function
const connectWithRetry = () => {
    mongoose.connect(dbHost, { auto_reconnect: true, useNewUrlParser: true, useUnifiedTopology: true  }, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

// calling connection
connectWithRetry();

// connection success event
mongoose.connection.on('connected', () => {
    console.log("Connected");
})

// connection error event
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

// connection disconnected event
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');

});


const ObjectId = (id) => {
    return mongoose.Types.ObjectId(id);
}

const notification = new Schema({
    notificationId: { type: Schema.ObjectId },
    siteId: { type: String },
    action: { type: String, enum: ['VIEW', 'CLICK'] },
    CurrentTimestamp: { type: Date }
});


// export schema
module.exports = {
    notificationModel: mongoose.model('notificationSchema', notification, 'notification'),
    ObjectId
};