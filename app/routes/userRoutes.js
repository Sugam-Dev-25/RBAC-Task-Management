const express = require("express");

const router = express.Router();

const auth = require(
"../middleware/authMiddleware"
);

const permission = require(
"../middleware/permissionMiddleware"
);

const userController = require(
"../controller/userController"
);

// Get All Users (Admin Only)
router.get(
"/",
auth,
permission("manage_users"),
userController.getUsers
);

// Logged In User Profile
router.get(
"/profile",
auth,
userController.getProfile
);

// Update User (Admin Only)
router.put(
"/",
auth,
permission("manage_users"),
userController.updateUser
);

// Assign Role (Admin Only)
router.put(
"/assign-role/",
auth,
permission("manage_users"),
userController.assignRole
);

// Deactivate User (Admin Only)
router.put(
"/deactivate/",
auth,
permission("manage_users"),
userController.deactivateUser
);

module.exports = router;