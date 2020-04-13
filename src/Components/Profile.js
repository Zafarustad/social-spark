import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import AddDetails from "./AddDetails";
import MuiLink from "@material-ui/core/Link";
import MyButton from "./MyButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import CalendarToday from "@material-ui/icons/CalendarToday";
import noProfile from "../assets/no-profile.png";
import dayjs from "dayjs";
import { uploadImageDispatch } from "../Actions/userActions";

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImageDispatch(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };

  render() {
    const {
      user: {
        credentials: { username, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className='paper'>
          <div className='profile'>
            <img src={imageUrl} className='profile-image' alt='profile image' />
            <input
              type='file'
              id='image-input'
              hidden='hidden'
              onChange={this.handleImageChange}
            />
            <div>
              <MyButton
                tip='Change Profile Pic'
                onClick={this.handleEditPicture}
              >
                <EditIcon color='primary' />
              </MyButton>
            </div>
            <div className='flex-column align-items-center'>
              <MuiLink
                component={Link}
                to={`user/${username}`}
                color='primary'
                variant='h5'
              >
                @{username}
              </MuiLink>
              {bio && (
                <Typography className='m-t-10' variant='body2'>
                  {bio}
                </Typography>
              )}
              {location && (
                <div className='flex-row align-items-center m-t-10'>
                  <LocationOn color='primary' />
                  <span className='ml-3'>{location}</span>
                </div>
              )}
              {website && (
                <div className='flex-row align-items-center m-t-10'>
                  <LinkIcon color='primary' />
                  <a
                    className='ml-3'
                    href={website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {website}
                  </a>
                </div>
              )}
              <div className='flex-row align-items-center m-t-10'>
                <CalendarToday color='primary' />{" "}
                <span className='ml-3'>
                  Joined {dayjs(createdAt).format("DD MMM YYYY")}
                </span>
              </div>
              <div className='ml-auto'>
                <AddDetails />
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className='flex-column p-10'>
          <img src={noProfile} className='profile-image' alt='profile image' />
          <Typography variant='body' align='center'>
            No Profile Found
          </Typography>
          <div className='button m-t-10 flex-row align-items-center'>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
              style={{ marginLeft: "10px" }}
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      uploadImageDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
