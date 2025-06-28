require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middleware/errorHandler');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

const app = express();

const cors = require('cors');
const clientUrl = process.env.CLIENT_URL;

app.use(cors({
  origin: clientUrl,
  credentials: true,
}));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on ${PORT}`));