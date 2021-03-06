const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../models/teamModel");
const Organisation = require("./../models/organisationModel");
const Bug = require("../models/bugModel");

exports.createTeam = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user.id;
    // const role = {
    //   name: "Lead",
    //   lead: true,
    // };
    // const roles = [];
    // if (req.body.roles) {
    //   roles = [role, req.body.roles];
    // } else roles = [role];
    // if(!req.body.name || !req.body.description){
    //     return next(new AppError('No body or description',404));
    // }
    const teamData = {
      name: req.body.name,
      description: req.body.description,
      creator: userId,
      organisation: req.params.orgId,
      roles: req.body.roles,
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

    await Organisation.findByIdAndUpdate(req.params.orgId, {
      $push: { teams: newTeam.id },
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
    path: "teams",
    model: "Team",
    select: "members",
  });

  res.status(200).json({
    status: "success",
    organisations,
  });
});

exports.getOrganisation = catchAsync(async (req, res, next) => {
  const organisation = await Organisation.findById(req.params.id).populate({
    path: "teams",
    model: "Team",
    select: "name members description",
  });

  res.status(200).json({
    status: "success",
    organisation,
  });
});

exports.getTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamId;
  const team = await Team.findById(teamId);
  if (team) {
    if (team.creator.toString() === req.user.id) {
      const bugs = await Bug.find({ team: teamId });
      //   const resolvedBugs = await Bug.find({ team: teamId, status: "resolved" });
      //   const userBugs = await Bug.find({ created: { created_by: req.user.id } });
      res.status(200).json({
        team,
        bugs,
      });
    } else {
      const ind = team.members.findIndex((member) => {
        return member.userId.toString() === req.user.id;
      });
      if (ind === -1) {
        //Not a member of team
        const resolvedBugs = await Bug.find({
          team: teamId,
          status: "resolved",
        });
        const userBugs = await Bug.find({
          created: { created_by: req.user.id },
        });

        const bugs = [...resolvedBugs, ...userBugs];

        res.status(200).json({
          team,
          bugs,
        });
      } else {
        // Member of a team
        console.log(ind);
        const role = team.members[ind].role;
        const id = team.roles.findIndex((r) => r.name === role);
        console.log(team.roles[id]);
        if (team.roles[id].lead) {
          const bugs = await Bug.find({ team: teamId });
          //   const resolvedBugs = await Bug.find({ team: teamId, status: "resolved" });
          //   const userBugs = await Bug.find({ created: { created_by: req.user.id } });
          res.status(200).json({
            team,
            bugs,
          });
        } else {
          const severeBugs = await Bug.find({ team: teamId, priority: "low" });
          const assignedBugs = await Bug.find({
            team: teamId,
            assigned: { assigned_To: req.user.id },
          });
          const bugs = severeBugs.concat(assignedBugs);

          res.status(200).json({
            status: "sucess",
            team,
            bugs,
          });
        }
      }
    }
  }
});
