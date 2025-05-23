require('dotenv').config(); //Needs to come before local imports
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const app = express();

//If using MVC setup
// const path = require('node:path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//If using Prisma ORM for database (if not, delete dev dependencies)
// const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
// const { PrismaClient } = require('@prisma/client');
// app.use(
// 	expressSession({
// 		cookie: {
// 			maxAge: 7 * 24 * 60 * 60 * 1000,
// 		},
// 		secret: 'a santa at nasa',
// 		resave: true,
// 		saveUninitialized: true,
// 		store: new PrismaSessionStore(new PrismaClient(), {
// 			checkPeriod: 2 * 60 * 1000,
// 			dbRecordIdIsSessionId: true,
// 			dbRecordIdFunction: undefined,
// 		}),
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

console.log("Nodemon is working");
app.get("/", (req, res) => res.send('Hello, World'));
app.listen(3000, () => console.log('App listening on localhost:3000'));