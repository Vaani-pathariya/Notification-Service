const {Worker}=require('bullmq')
const nodemailer = require('nodemailer');
const REDIS_URL= 'redis://redis:6379';
require("dotenv").config();
const sendEmail=async(data)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailOptions = {
        from: "Notification-Service <vpathariya2111@gmail.com>",
        to: data.email,
        subject: data.subject,
        html: `${data.text} How are you ? ${data.name}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent: %s", info.messageId);
        }
      });
}
const worker = new Worker("email-queue",async(job)=>{
    console.log(`Message received id :${job.id}`);
    console.log('Processing message')
    await sendEmail(job.data);
    console.log("Email Sent");
},{
    connection: REDIS_URL,
});
 