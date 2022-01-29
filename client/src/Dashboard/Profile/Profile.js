import './Profile.css'
import { Avatar, Grid } from '@mui/material'
import BugReportIcon from '@mui/icons-material/BugReport';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Profile = ({ user }) => {
  const myTeams = [
    "Team Name",
    "Team Long Long Long Long Name",
    "Team Long Long Long Long Long Long Long Long Name",
    "Team 4",
  ];
  console.log(user)

  return (
    <div className="body">
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <ProfileDetails user={user} teams={myTeams} />
        </Grid>
        <Grid item xs={8}>
          <ProfileStats user={user} teams={myTeams} />
        </Grid>
      </Grid>
    </div>
  );
};

const ProfileDetails = (props) => {
  return (
    <div className="profileDetails">
      <Avatar
        sx={{ width: 160, height: 160 }}
        src={props.user.image}
      />
      <h3>{props.user.name}</h3>
      <p style={{ 'marginBottom': 0,'marginTop':0 }}>{props.user.email}</p>
      <div className="teamsBox">
        <div className='buttonRoute' style={{'paddingLeft':'20px','paddingRight':'20px'}}>
          {/* <BugReportIcon style={{ 'paddingRight': '6px', 'color': '#ff7043' }} /> */}
          <div className='buttonHeading'>
            <p style={{ 'marginBottom': 0, 'color': '#616161' }}>My Teams</p>
          </div>
          <ArrowForwardIosIcon style={{ 'height': '14px', 'width': '14px' }} />
        </div>
      </div>
    </div>
  );
};

const ProfileStats = (props) => {
  return <div className='profileStats'>
    {/* <h3>Stats</h3> */}
    <div className='statsBugs'>
      <div className='stat' style={{ 'border': '1px solid #ff7043' }}>
        <BugReportIcon style={{ 'paddingRight': '6px', 'color': '#ff7043' }} />
        <div className='heading'>
          <p style={{ 'marginBottom': 0, 'color': '#ff7043' }}>Pending Bugs: 4</p>
        </div>
      </div>
      <div className='stat' style={{ 'border': '1px solid green' }}>
        <BugReportIcon style={{ 'paddingRight': '6px', 'color': 'green' }} />
        <div className='heading'>
          <p style={{ 'marginBottom': 0, 'color': 'green' }}>Bugs Resolved: 16</p>
        </div>
      </div>
    </div>
    <div className='teamsBox'>
      {/* <div className='stat'>
                <BugReportIcon style={{ 'paddingRight': '6px', 'color': '#ff7043' }} />
                <div className='heading'>
                    <p style={{ 'marginBottom': 0, 'color': '#ff7043' }}>Bugs In Progress</p>
                </div>
            </div> */}
      {props.teams.map((team) => {
        return <div className='teamCard'>
          <p>{team}</p>
        </div>
      })}
    </div>
  </div>
};

export default Profile;
