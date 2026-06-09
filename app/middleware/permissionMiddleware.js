const roles = require("../config/roles.json");
const logger = require("../../utils/logger");

module.exports = (permission) => {
return (req, res, next) => {
const role = req.user.role;

const permissions = roles[role] || [];

if (!permissions.includes(permission)) {
  logger(
    `Unauthorized Access Attempt | User ID: ${req.user.id} | Role: ${role} | Permission Required: ${permission}`
  );

  return res.status(403).json({
    success: false,
    message:
      "You do not have permission to perform this action",
  });
}

next();

};
};