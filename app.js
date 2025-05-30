require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middleware/errorHandler');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const app = express();

// Mddlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

//Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(5000, () => console.log(`App listening on http://localhost:5000`));