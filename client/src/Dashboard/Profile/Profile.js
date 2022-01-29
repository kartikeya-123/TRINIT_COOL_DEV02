import './Profile.css'
import { Avatar, Grid } from '@mui/material'
const Profile = () => {

    const myTeams = ['Team Name','Team Long Long Long Long Name', 'Team Long Long Long Long Long Long Long Long Name', 'Team 4']

    return <div className='body'>
        <Grid container className='container'>
            <Grid item xs={4}>
                <ProfileDetails teams={myTeams} />
            </Grid>
            <Grid item xs={8}>Profile Stats</Grid>
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
            <div style={{
                'fontSize': '18px',
                'fontStyle': 'normal',
                'fontWeight': '400',
                'marginBottom':'16px'
            }}>My Teams</div>
            {props.teams.map((team) => {
                return <div className='teamCard'>
                    <p>{team}</p>
                </div>
            })}
        </div>
    </div>)
}

export default Profile;
