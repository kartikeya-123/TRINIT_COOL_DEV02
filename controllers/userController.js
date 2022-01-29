const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
// const { sendEmail } = require("../utils/sendEmail");
const ObjectId = require("mongoose").Types.ObjectId;

exports.aboutMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("This user is not present", 401));
  }
  res.status(200).json({
    status: "suceess",
    data: {
      user: req.user,
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
