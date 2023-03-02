const { Worker } = require('worker_threads');

const n = 10_000_000_000;

const ping = (request, response, next) => {
    response.status(200).json({ message: 'pong' });
    return;
};

const blocking = (request, response, next) => {
    let sum = 0;

    for (let i = 0; i < n; i++) sum += i;

    response.status(200).json({ success: true, data: sum, error: null });
    return;
};

const nonBlocking = (request, response, next) => {
    try {
        const workerData = { n };
        const worker = new Worker('./src/worker.js', { workerData });

        worker.on('message', (sum) => {
            response.status(200).json({ success: true, data: sum, error: null });
            return;
        });

        worker.on('error', (error) => {
            response.status(500).json({ success: false, data: null, error: error.message });
            return;
        });
    } catch (error) {
        response.status(500).json({ success: false, data: null, error: error.message });
        return;
    }
};

module.exports = { ping, blocking, nonBlocking };
