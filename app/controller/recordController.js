const Record = require("../models/Record");
const logger = require("../../utils/logger");

class RecordController {
// Create Record
async createRecord(req, res) {
try {
const record = await Record.create({
...req.body,
created_by: req.user.id,
});

  logger(
    `Record Created : ${record.title} by User ${req.user.id}`
  );

  res.status(201).json({
    success: true,
    message: "Record created successfully",
    record,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Get All Records
async getRecords(req, res) {
try {
const records = await Record.find().populate(
"created_by",
"name email role"
);

  res.status(200).json({
    success: true,
    count: records.length,
    records,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Get Single Record
async getSingleRecord(req, res) {
try {
const record = await Record.findById(
req.params.id
).populate(
"created_by",
"name email role"
);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  res.status(200).json({
    success: true,
    record,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Update Record
async updateRecord(req, res) {
try {
const record = await Record.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true,
}
);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  logger(
    `Record Updated : ${record._id} by User ${req.user.id}`
  );

  res.status(200).json({
    success: true,
    message: "Record updated successfully",
    record,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

// Delete Record
async deleteRecord(req, res) {
try {
const record = await Record.findById(
req.params.id
);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  await Record.findByIdAndDelete(
    req.params.id
  );

  logger(
    `Record Deleted : ${req.params.id} by User ${req.user.id}`
  );

  res.status(200).json({
    success: true,
    message: "Record deleted successfully",
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}


}
}

module.exports = new RecordController();
