const express = require('express');
const cluster = require('cluster');
const logger = require('morgan');
const app = express();
const path = require('path');
const fs = require('fs')

// number of cpu
const numCPUs = process.env.NODE_ENV !== 'PRODUCTION' ? 1 : require('os').cpus().length;

// master cluster
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    });
} else {
    // You can set morgan to log differently depending on your environment
    if (process.env.NODE_ENV !== 'PRODUCTION') {
        app.use(logger('dev'));
    } else {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        app.use(logger('common', { skip: function (req, res) { return res.statusCode > 400 }, stream: accessLogStream }));
    }
    // app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // routing file
    require('./routes')(app);

    /*
     * Server Listing
     */
    app.listen(process.env.PORT || 5000, () => {
        console.log('app is started at ', process.env.PORT || 5000);
    });


    // catch 404 and forward to error handler
    app.use(function (req, res) {
        res.status(404);
        return res.send({ message: 'Not Found', count: null, data: [] });
    });

    // unhandeld exception 
    process.on('uncaughtException', (err) => {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        console.error(err.stack)
    });
}

module.exports = app;
