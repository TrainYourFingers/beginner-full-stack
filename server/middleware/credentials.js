const allowedOrigins = ["http://localhost:3000", "https://localhost:5173"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
};

module.exports = credentials;
