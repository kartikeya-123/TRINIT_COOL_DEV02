const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../models/teamModel");
const Organisation = require("./../models/organisationModel");

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
      organisation: req.body.organisation,
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
  const orgId = req.body.organisationId;
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
          organisations: orgId,
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

exports.createOrganisation = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.name,
    creator: req.user.id,
  };
  const newOrg = await Organisation.create(data);
  await User.findByIdAndUpdate(req.user.id, {
    $push: { organisations: newOrg.id },
  });
  res.status(200).json({
    status: "sucess",
    organisation: newOrg,
  });
});

exports.getTeamsOfOrganisation = catchAsync(async (req, res, next) => {
  const orgId = req.body.organisationId;
  const teams = await Team.find({ organisation: orgId }).populate({
    path: "members.userId",
    model: "User",
    select: "name",
  });
  res.status(200).json({
    status: "sucess",
    teams: teams,
  });
});

exports.getAllOrganisations = catchAsync(async (req, res, next) => {
  const organisations = await Organisation.find().populate({
    path: "creator",
    model: "User",
    select: "name email",
  });

  res.status(200).json({
    status: "success",
    organisations: organisations,
  });
});
