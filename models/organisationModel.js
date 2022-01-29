const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "org should have name"],
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    teams: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Organisation = mongoose.model("Organisation", organisationSchema);
module.exports = Organisation;
