const User = require("../models/User");
const logger = require("../../utils/logger");

class UserController {
// Get All Users
async getUsers(req, res) {
try {
const users = await User.find().select(
"-password"
);

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Get Logged In User Profile
async getProfile(req, res) {
try {
const user = await User.findById(
req.user.id
).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Update User
async updateUser(req, res) {
try {
const user = await User.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true,
}
).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  logger(
    `User Updated : ${user.email}`
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Assign Role
async assignRole(req, res) {
try {
const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  logger(
    `Role Changed : ${user.email} => ${role}`
  );

  res.status(200).json({
    success: true,
    message: "Role assigned successfully",
    user,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Deactivate User
async deactivateUser(req, res) {
try {
const user = await User.findByIdAndUpdate(
req.params.id,
{
isActive: false,
},
{
new: true,
}
).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  logger(
    `User Deactivated : ${user.email}`
  );

  res.status(200).json({
    success: true,
    message:
      "User deactivated successfully",
    user,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}
}

module.exports = new UserController();