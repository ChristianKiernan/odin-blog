require('dotenv').config(); 
const express = require('express');
const passport = require('./config/passport');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter')
const app = express();
const { PrismaClient } = require('@prisma/client');

app.use(passport.initialize());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use((req, res, next) => {
	next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.listen(5000, () => console.log('App listening on localhost:5000'));