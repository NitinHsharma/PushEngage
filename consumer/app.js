
const cluster = require('cluster');

const numCPUs = process.env.NODE_ENV !== 'PRODUCTION' ? 1 : require('os').cpus().length;

// master cluster
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    require('./misc/consumer');
    
    // unhandeld exception 
    process.on('uncaughtException', (err) => {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        console.error(err.stack)
    });
}
