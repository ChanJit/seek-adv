import logger from './logger';

const warn = (req, res, err, next) => {
  return next();
};

const error = (req, res, err, next) => {
  return next();
};

const uncaught = (req, res, route, err) => {
  err.originalUrl = req.originalUrl;

  if (req.jwt) {
    err.username = req.jwt.username;
  }

  logger.error('uncaught => ', err);
};

export default {
  warn,
  error,
  uncaught
};
