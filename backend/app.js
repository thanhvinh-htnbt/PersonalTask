const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();
const appRouter = require('./routes/index');

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(compression());
    app.use(helmet());
};

app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use('/api', appRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
