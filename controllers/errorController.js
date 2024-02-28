const AppError = require('../utils/appError');

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again!', 401);
}

function handleJWTExpiredError() {
  return new AppError('Token already expired. Please log in again', 401);
}

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // RENDERED WEBSITE
  
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // OPERATIONAL TRUSTED ERROR: SEND MESSAGE TO THE CLIENT
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // PROGRAMING OR OTHER UNKNOWN ERROR: DON'T LEAK ERROR DETAILS
    // 1) LOG ERROR
    console.error('ERROR!!!!', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // RENDERED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // PROGRAMING OR OTHER UNKNOWN ERROR: DON'T LEAK ERROR DETAILS
  // 1) LOG ERROR
  console.error('ERROR!!!!', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'errorr';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
}

module.exports = globalErrorHandler;
