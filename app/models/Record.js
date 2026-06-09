const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    status: {
      type: String,
      default: "Pending"
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);