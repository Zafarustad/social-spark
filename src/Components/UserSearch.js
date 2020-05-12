import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { getAllUsersDispatch } from '../Actions/dataActions';
import MyButton from './MyButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {
  withStyles,
  DialogContent,
  Dialog,
  DialogTitle,
  Avatar,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core';

const styles = {
  closeButton: {
    position: 'absolute',
    left: isMobile ? ' 87%' : '90%',
    top: '1%',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
};

let filteredUsers = [];

class UserSearch extends Component {
  state = {
    dialog: false,
    searchField: '',
  };

  openDialog = () => {
    const { getAllUsersDispatch } = this.props;

    this.setState({ dialog: true });
    getAllUsersDispatch();
  };

  closeDialog = () => {
    this.setState({ dialog: false, searchField: '' });
    filteredUsers = [];
  };

  handleSearch = (event) => {
    const { searchField } = this.state;
    const {
      data: { users },
    } = this.props;
    this.setState({ searchField: event.target.value });
    filteredUsers = users.filter((user) =>
      user.username.toLowerCase().startsWith(searchField.toLowerCase())
    );
  };

  goToProfile = (username) => {
    const { history } = this.props;
    history.push(`/user/${username}`);
    window.location.reload();
  };

  render() {
    const {
      classes,
    } = this.props;
    const { dialog, searchField } = this.state;
    return (
      <>
        <MyButton tip='Search Users' onClick={this.openDialog}>
          <SearchIcon color='secondary' />
        </MyButton>
        <Dialog
          open={dialog}
          onClose={this.closeDialog}
          fullScreen={isMobile ? true : false}
          fullWidth={isMobile ? false : true}
          maxWidth='sm'
        >
          <DialogTitle>Seacrh Users</DialogTitle>
          <MyButton
            tip='close'
            onClick={this.closeDialog}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent>
            <div>
              <div className={classes.search}>
                <SearchIcon className={classes.searchIcon} />
                <TextField
                  value={searchField}
                  onChange={this.handleSearch}
                  placeholder='Type Username'
                  fullWidth
                />
              </div>
              <div className='over-auto'>
                {filteredUsers.length === 0 ? (
                  <div className='p-50 text-center'>No Users Found</div>
                ) : (
                  filteredUsers.map((user, index) => {
                    return (
                      <div key={user.userId}>
                        <div className='flex-row align-items-center p-10 m-10'>
                          <Avatar
                            src={user.userImage}
                            className={classes.avatar}
                          />
                          <a onClick={() => this.goToProfile(user.username)}>
                            <Typography color='secondary' variant='h5'>
                              {user.username}
                            </Typography>
                          </a>
                          <Divider />
                        </div>
                        {index !== filteredUsers.length - 1 && <hr />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsersDispatch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(UserSearch)));
