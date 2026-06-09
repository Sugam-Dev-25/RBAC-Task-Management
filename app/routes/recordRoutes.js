const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const permission = require("../middleware/permissionMiddleware");

const recordController = require("../controller/recordController");

// Create Record
router.post(
  "/",
  auth,
  permission("create_record"),
  recordController.createRecord
);

// Get All Records
router.get(
  "/",
  auth,
  permission("read_record"),
  recordController.getRecords
);

// Get Single Record
router.get(
  "/:id",
  auth,
  permission("read_record"),
  recordController.getSingleRecord
);

// Update Record
router.put(
  "/:id",
  auth,
  permission("update_record"),
  recordController.updateRecord
);

// Delete Record
router.delete(
  "/:id",
  auth,
  permission("delete_record"),
  recordController.deleteRecord
);

module.exports = router;