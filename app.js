require('dotenv').config(); 
const express = require('express');
const expressSession = require('express-session');
// const bodyParser = require('body-parser')
const passport = require('./config/passport');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter')
const app = express();

// app.use(bodyParser.json())

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: 'Welcome to the App',
    });
});

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.listen(5000, () => console.log('App listening on localhost:5000'));