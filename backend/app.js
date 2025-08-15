const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const appRouter = require('./routes/index');

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(cors());

app.use('/api', appRouter);

module.exports = app;
