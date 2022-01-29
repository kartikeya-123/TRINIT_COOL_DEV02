const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../models/teamModel");

exports.createTeam = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user.id;

    // if(!req.body.name || !req.body.description){
    //     return next(new AppError('No body or description',404));
    // }
    const teamData = {
      name: req.body.name,
      description: req.body.description,
      creator: userId,
      members: [
        {
          userId: userId,
          role: "Lead",
        },
      ],
    };

    const newTeam = await Team.create(teamData);
    const tData = {
      teamId: newTeam.id,
      role: "Lead",
    };

    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      $push: { teams: tData },
    });

    res.status(200).json({
      status: "success",
      team: newTeam,
    });
  } catch (err) {
    console.err(err);
    res.status(400).json({
      error: err,
    });
  }
});

exports.addMembersToTeam = catchAsync(async (req, res, next) => {
  const teamId = req.body.teamId;
  const users = req.body.users;

  const team = await Team.findById(teamId);

  for (let user of users) {
    const userData = await User.findOneAndUpdate(
      { email: user.email },
      {
        $push: {
          teams: {
            teamId: team.id,
            role: user.role,
          },
        },
      }
    );

    if (userData) {
      team.members.push({
        userId: userData.id,
        role: user.role,
      });
    }
  }

  await team.save();

  res.status(200).json({
    status: "success",
    team: team,
  });
});
