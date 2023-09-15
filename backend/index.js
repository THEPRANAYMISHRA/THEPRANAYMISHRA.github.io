const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const { RateLimiterMemory } = require('rate-limiter-flexible');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const rateLimiter = new RateLimiterMemory({
    points: 1,
    duration: 60 * 60 * 24
});

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    rateLimiter.consume(email, 1)
        .then((rateLimiterRes) => {
            // 2 points consumed
            console.log(`Rate limit success for ${req.ip}`);
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: process.env.YOUR_EMAIL,
                subject: 'New Portfolio Connect',
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                res.status(200).send({ "Email sent": info.response });
            });
        })
        .catch((rateLimiterRes) => {
            res.status(429).send({ "mgs": 'Too many requests' });
        });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


