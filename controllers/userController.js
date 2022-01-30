const User = require("./../models/userModel");
const Organisation = require("./../models/organisationModel");
const Bug = require("./../models/bugModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
// const { sendEmail } = require("../utils/sendEmail");
const ObjectId = require("mongoose").Types.ObjectId;

exports.aboutMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("This user is not present", 401));
  }
  const user = await User.findById(req.user.id).populate({
    path: "organisations",
    model: "Organisation",
  });

  const assigned = await Bug.find({ assigned: { assigned_by: req.user.id } });
  const resolved = await Bug.find({ resolved: { resolved_by: req.user.id } });

  res.status(200).json({
    status: "suceess",
    user: user,
    stats: {
      assigned: assigned,
      resolved: resolved,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ _id: req.query.id })
    .populate({
      path: "teamsEnrolled",
      model: "Team",
    })
    .lean();

  if (!user) {
    return next(new AppError("This user is not present", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
