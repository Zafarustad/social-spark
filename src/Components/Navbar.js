import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PostSpark from "./PostSpark";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { logoutUserDispatch } from "../Actions/userActions";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MyButton from "./MyButton";
import Notifications from "./Notifications";

class Navbar extends Component {
  logoutUser = async () => {
    const { logoutUserDispatch, history } = this.props;
    await logoutUserDispatch();
    history.push("/login");
  };

  goToProfile = () => {
    const {
      history,
      user: {
        credentials: { username }
      }
    } = this.props;
    history.push(`/user/${username}`);
    window.location.reload();
  };

  render() {
    const {
      user: { authenticated }
    } = this.props;
    return (
      <AppBar>
        <Toolbar className='ml-auto'>
          {!authenticated ? (
            <>
              <Button
                color='secondary'
                variant='outlined'
                component={Link}
                to='/'
                style={{ marginRight: 13 }}
              >
                Home
              </Button>
              <Button
                color='secondary'
                variant='outlined'
                component={Link}
                to='/login'
                style={{ marginRight: 13 }}
              >
                Login
              </Button>
              <Button
                color='secondary'
                variant='outlined'
                component={Link}
                to='/signup'
                style={{ marginRight: 13 }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <a onClick={() => this.goToProfile()}>
                <MyButton tip='Profile'>
                  <ProfileIcon color='secondary' />
                </MyButton>
              </a>
              <Link to='/users'>
                <MyButton tip='Users'>
                  <PeopleAltIcon color='secondary' />
                </MyButton>
              </Link>
              <PostSpark />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon color='secondary' />
                </MyButton>
              </Link>
              <Notifications />
              <MyButton onClick={this.logoutUser} tip='Logout'>
                <LogoutIcon color='secondary' />
              </MyButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutUserDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
