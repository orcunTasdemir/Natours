//all imports here ...
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
//import routers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES to use
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello from the middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

//for ROUTE HANDLERS use the middleware from our router files
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// if we are able to reach here it means that nothing have matches up until here which means we do not know or support whatever request is coming in from the user.

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
