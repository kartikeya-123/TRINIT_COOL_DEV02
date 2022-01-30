const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "bug should have name"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: ["raised", "assigned", "resolved"],
      required: [true, "Bug status"],
    },
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      required: [true, "A bug should have team"],
    },
    created: {
      created_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
    assigned: {
      assigned_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      assigned_at: {
        type: Date,
        default: Date.now(),
      },
    },
    resolved: {
      resolved_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      resolved_at: {
        type: Date,
        default: Date.now(),
      },
    },
    tags: {
      type: String,
    },
    //    comments : [
    //        {
    //            type : String,
    //            user : {
    //                name : {
    //                    type : String
    //                },
    //                image : {
    //                    type : String
    //                },
    //                email:{
    //                    type : String
    //                }
    //            }
    //        }
    //    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Bug = mongoose.model("Bug", bugSchema);
module.exports = Bug;
