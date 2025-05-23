require('dotenv').config(); 
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser')
const passport = require('passport');
const app = express();

app.use(bodyParser.json())

const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
app.use(
	expressSession({
		cookie: {
			maxAge: 10 * 60 * 1000, // 10 minutes
		},
		secret: 'a santa at nasa',
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

console.log("Nodemon is working");
app.get("/", (req, res) => {
    res.json({
        message: 'Welcome to the App',
    });
});

app.listen(5000, () => console.log('App listening on localhost:5000'));