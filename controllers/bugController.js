const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../models/teamModel");
const Bug = require("./../models/bugModel");

exports.createBug = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    team: req.body.teamId,
    priority: req.body.priority,
    status: "assigned",
    created: {
      created_by: req.user.id,
    },
  };

  const bug = await Bug.create(data);
  await Team.findByIdAndUpdate(req.body.teamId, { $push: { bugs: bug.id } });
  res.status(bug).json({
    status: "success",
    bug: bug,
  });
});

const resolveBug = catchAsync(async (req, res, next) => {
  const bugId = req.body.bugId;
  const resolvedBy = req.body.resolvedBy;
  const bug = await Bug.findByIdAndUpdate(bugId, {
    status: "resolved",
    resolved: { resolved_by: resolvedBy },
  });
  res.status(200).json({
    status: "success",
    bug: bug,
  });
});
