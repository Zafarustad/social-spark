import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isMobile } from 'react-device-detect';
import Followers from './Followers';
import Following from './Following';
import {
  followUserDispatch,
  unFollowUserDispatch,
} from '../Actions/userActions';
import { uploadImageDispatch } from '../Actions/userActions';
import AddDetails from './AddDetails';
import MyButton from './MyButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import withStyles from '@material-ui/core/styles/withStyles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';

const styles = {
  image: {
    width: '100%',
    height: !isMobile ? 240 : 180,
  },
  imageInput: {
    position: 'relative',
    bottom: '25px',
    background: '#fff',
    left: '80%',
  },
  visibleSeparator: {
    width: '90%',
    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
  },
};

class StaticProfile extends Component {
  handleImageChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    await this.props.uploadImageDispatch(formData);
    this.props.getuserProfileInfo();
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('image-input');
    fileInput.click();
  };

  followUser = async (username) => {
    const { followUserDispatch, getuserProfileInfo } = this.props;
    await followUserDispatch(username);
    getuserProfileInfo();
  };

  unFollowUser = async (username) => {
    const { unFollowUserDispatch, getuserProfileInfo } = this.props;
    await unFollowUserDispatch(username);
    getuserProfileInfo();
  };

  render() {
    const {
      classes,
      user: { credentials },
      profile,
      getuserProfileInfo,
    } = this.props;

    const findUser = profile.followers.find(
      (user) => user.username === credentials.username
    );
    return (
      profile.username && (
        <div className='m-l-20 m-r-20'>
          <Paper elevation={8} className='paper profile'>
            <div className=''>
              <Avatar
                src={profile.imageUrl}
                className={classes.image}
                variant='rounded'
              />
              {credentials.username === profile.username && (
                <>
                  <MyButton
                    tip='Change Profile Pic'
                    onClick={this.handleEditPicture}
                    tipClassName={classes.imageInput}
                  >
                    <EditIcon color='primary' />
                  </MyButton>
                  <input
                    type='file'
                    id='image-input'
                    hidden='hidden'
                    onChange={this.handleImageChange}
                  />
                </>
              )}
              {credentials.username !== profile.username && (
                <div className='text-center m-t-20 m-b-10'>
                  {findUser ? (
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => this.unFollowUser(profile.username)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => this.followUser(profile.username)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              )}
              <div className='flex-row justify-content-center align-items-center'>
                <Followers followers={profile.followers} />
                <Following following={profile.following} />
              </div>
            </div>
            <hr className={classes.visibleSeparator} />
            <div className='flex-column align-items-center p-r-50 p-l-50 p-t-20 p-b-20'>
              <Typography color='secondary' variant='h5'>
                {profile.username}
              </Typography>
              {profile.bio && (
                <Typography className='m-t-10' variant='body2'>
                  {profile.bio}
                </Typography>
              )}
              {profile.location && (
                <div className='flex-row align-items-center m-t-10'>
                  <LocationOn color='primary' />
                  <span className='ml-3'>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className='flex-row align-items-center m-t-10'>
                  <LinkIcon color='primary' />
                  <a
                    className='ml-3'
                    href={profile.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              <div className='flex-row align-items-center m-t-10'>
                <CalendarToday color='primary' />{' '}
                <span className='ml-3'>
                  Joined {dayjs(profile.createdAt).format('DD MMM YYYY')}
                </span>
              </div>
              {credentials.username === profile.username && (
                <div className='ml-auto'>
                  <AddDetails getuserProfileInfo={getuserProfileInfo} />
                </div>
              )}
            </div>
          </Paper>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadImageDispatch,
      followUserDispatch,
      unFollowUserDispatch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StaticProfile));
