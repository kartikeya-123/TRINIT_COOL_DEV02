import './Profile.css'
import { Avatar, Grid } from '@mui/material'
import BugReportIcon from '@mui/icons-material/BugReport';
const Profile = () => {

    const myTeams = ['Team Name', 'Team Long Long Long Long Name', 'Team Long Long Long Long Long Long Long Long Name', 'Team 4']

    return <div className='body'>
        <Grid container className='container' spacing={4}>
            <Grid item xs={4}>
                <ProfileDetails teams={myTeams} />
            </Grid>
            <Grid item xs={8}>
                <ProfileStats teams={myTeams} />
            </Grid>
        </Grid>
    </div>
}

const ProfileDetails = (props) => {
    return (<div className='profileDetails'>
        <Avatar
            sx={{ width: 160, height: 160 }}
            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        />
        <h3>Your Name Name</h3>
        <div className='teamsBox'>
            <div className='heading'>My Teams</div>
            {props.teams.map((team) => {
                return <div className='teamCard'>
                    <p>{team}</p>
                </div>
            })}
        </div>
    </div>)
}

const ProfileStats = (props) => {
    return <div className='profileStats'>
        {/* <h3>Stats</h3> */}
        <div className='statsBugs'>
            <div className='stat' style={{  'border': '1px solid #ff7043'}}>
                <BugReportIcon style={{ 'paddingRight': '6px' ,'color': '#ff7043'}} />
                <div className='heading'>
                    <p style={{ 'marginBottom': 0,'color': '#ff7043' }}>Pending Bugs: 4</p>
                </div>
            </div>
            <div className='stat' style={{  'border': '1px solid green'}}>
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
}

export default Profile;
