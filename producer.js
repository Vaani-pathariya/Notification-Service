const {Queue} = require('bullmq')
const notificationQueue=new Queue('email-queue',{
    connection:{
        host:'redis',
        port:6379
    }
});

module.exports={notificationQueue}