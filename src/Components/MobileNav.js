import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications from './Notifications';
import UserSearch from './UserSearch';
import PostSpark from './PostSpark';
import {
  AppBar,
  Toolbar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  IconButton
} from '@material-ui/core';
import { logoutUserDispatch } from '../Actions/userActions';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ProfileIcon from '@material-ui/icons/Person';
import SignUpIcon from '@material-ui/icons/VpnKey';
import LoginIcon from '@material-ui/icons/Lock';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MenuIcon from '@material-ui/icons/Menu';
import ChatRoomIcon from '@material-ui/icons/Forum';
import { isMobile } from 'react-device-detect';

const styles = {
  list: {
    width: !isMobile ? 350 : 280,
    marginTop: 5,
  },
  fullList: {
    width: 'auto',
  },
  closeIcon: {
    cursor: 'pointer',
    width: 60,
    marginTop: 10,
  },
  itemText: {
    color: '#151515',
  },
};

class MobileNav extends Component {
  state = {
    left: false,
    open: false,
  };
  toggleDrawer = () => {
    const { open } = this.state;
    this.setState({ open: !open ? true : false });
  };

  logoutUser = async () => {
    const { logoutUserDispatch, history } = this.props;
    await logoutUserDispatch();
    history.push('/login');
  };

  goToProfile = () => {
    const {
      history,
      user: {
        credentials: { username },
      },
    } = this.props;
    history.push(`/user/${username}`);
    window.location.reload();
  };

  render() {
    const {
      classes,
      user: { authenticated },
    } = this.props;
    const list = (
      <>
        <ListItem onClick={this.toggleDrawer} className={classes.closeIcon}>
          <ListItemIcon>
            <CloseIcon color='secondary' />
          </ListItemIcon>
        </ListItem>
        <div className={classes.list} onClick={this.toggleDrawer}>
          <List>
            <ListItem component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon color='secondary' />
              </ListItemIcon>
              <ListItemText className={classes.itemText}>Home</ListItemText>
            </ListItem>
            {authenticated ? (
              <>
                <ListItem component={Link} onClick={this.goToProfile}>
                  <ListItemIcon>
                    <ProfileIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Profile
                  </ListItemText>
                </ListItem>
                <ListItem component={Link} to='/users'>
                  <ListItemIcon>
                    <PeopleAltIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Following
                  </ListItemText>
                </ListItem>
                {/* <ListItem component={Link} to='/chats'>
                  <ListItemIcon>
                    <ChatRoomIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Chat Room
                  </ListItemText>
                </ListItem> */}
                <ListItem component={Link} onClick={this.logoutUser}>
                  <ListItemIcon>
                    <LogoutIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Logout
                  </ListItemText>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem component={Link} to='/login'>
                  <ListItemIcon>
                    <LoginIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Login
                  </ListItemText>
                </ListItem>
                <ListItem component={Link} to='/signup'>
                  <ListItemIcon>
                    <SignUpIcon color='secondary' />
                  </ListItemIcon>
                  <ListItemText className={classes.itemText}>
                    Signup
                  </ListItemText>
                </ListItem>
              </>
            )}
          </List>
        </div>
      </>
    );
    return (
      <>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer}>
              <MenuIcon color='secondary' />
            </IconButton>
            <SwipeableDrawer
              open={this.state.open}
              onOpen={this.toggleDrawer}
              onClose={this.toggleDrawer}
              style={{ color: '#151515' }}
            >
              {list}
            </SwipeableDrawer>
            <div className='ml-auto'>
              <UserSearch />
              {authenticated && (
                <>
                  <PostSpark />
                  <Notifications />
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutUserDispatch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(MobileNav)));
