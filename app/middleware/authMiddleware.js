const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    logger(
      "Unauthorized Request: No Valid Bearer Token"
    );

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    logger(
      `Invalid Token Attempt: ${authHeader}`
    );

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};