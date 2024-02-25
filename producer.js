const {Queue} = require('bullmq')
const REDIS_URL= 'redis://localhost:6379';
const notificationQueue=new Queue('email-queue',{
    connection:REDIS_URL
});
module.exports={notificationQueue}