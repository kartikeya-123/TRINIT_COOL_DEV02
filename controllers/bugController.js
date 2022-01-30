const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../models/teamModel");
const Bug = require("./../models/bugModel");

exports.createBug = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    team: req.params.teamId,
    status: "raised",
    created: {
      created_by: req.user.id,
    },
  };

  const bug = await Bug.create(data);
  await Team.findByIdAndUpdate(req.params.teamId, { $push: { bugs: bug.id } });
  res.status(200).json({
    status: "success",
    bug: bug,
  });
});

exports.resolveBug = catchAsync(async (req, res, next) => {
  const bugId = req.body.bugId;
  const resolvedBy = req.body.resolvedBy;
  const bug = await Bug.findByIdAndUpdate(bugId, {
    status: "resolved",
    resolved: { resolved_by: resolvedBy },
  });
  res.status(200).json({ status: "success", bug });
});

exports.getBug = catchAsync(async (req, res, next) => {
  const bug = await Bug.findById(req.params.bugId).populate({
    path: "created.created_by",
    ref: "User",
  });

  res.status(200).json({ status: "success", bug });
});

exports.assignBug = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const bug = await Bug.findByIdAndUpdate(req.params.bugId, {
    assigned: { assigned_to: user.id },
    priority: req.body.priority,
    status: "assigned",
  });
  res.status(200).json({
    status: "successs",
    bug,
  });
});
