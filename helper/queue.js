const Queue = require('bull');
const redis = require('ioredis');

const redisOptions = {
    host: '127.0.0.1', // replace with your Redis server's host
    port: 6379, // replace with your Redis server's port
};

// Initialize Bull Queue
const jobQueue = new Queue('jobQueue', { redis: redisOptions });

// Process jobs in the queue
jobQueue.process(async (job) => {
    console.log('Processing job:', job.id);
    // Simulate job processing (e.g., sending email, data processing, etc.)
    return Promise.resolve();
});

// Handle job completion
jobQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed!`);
});

// Handle job failure
jobQueue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with error ${err.message}`);
});

module.exports = jobQueue;
