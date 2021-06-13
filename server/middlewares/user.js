module.exports = (req, res, next) => {
  if (req.headers['x-user-did']) {
    req.user = {
      did: req.headers['x-user-did'],
    };
  }
  next();
};
