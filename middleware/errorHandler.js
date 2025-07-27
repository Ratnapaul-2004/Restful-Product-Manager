module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', {
    message: err.message || 'Internal server error',
    status: err.status || 500
  });
};