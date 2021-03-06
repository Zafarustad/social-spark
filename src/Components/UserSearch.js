import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {
  getAllUsersDispatch,
  openSearchDialog,
  closeSearchDialog
} from '../Actions/dataActions';
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
    cursor: 'pointer',
  },
  username: {
    cursor: 'pointer',
  },
};

let filteredUsers = [];

class UserSearch extends Component {
  state = {
    searchField: '',
  };

  openDialog = () => {
    filteredUsers = [];
    const { getAllUsersDispatch, openSearchDialog } = this.props;

    openSearchDialog();
    getAllUsersDispatch();
  };

  closeDialog = () => {
    filteredUsers = [];
    this.setState({ dialog: false, searchField: '' });
  };

  handleSearch = (event) => {
    const { searchField } = this.state;
    const {
      data: { users },
    } = this.props;
    this.setState({ searchField: event.target.value });
    filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchField.toLowerCase())
    );
  };

  render() {
    const {
      classes,
      data: { searchDialog },
      closeSearchDialog
    } = this.props;
    const { searchField } = this.state;

    return (
      <>
        <MyButton tip='Search Users' onClick={() => this.openDialog()}>
          <SearchIcon color='secondary' />
        </MyButton>
        <Dialog
          open={searchDialog}
          onClose={() => closeSearchDialog()}
          fullScreen={isMobile ? true : false}
          fullWidth={isMobile ? false : true}
          maxWidth='sm'
        >
          <DialogTitle>Seacrh Users</DialogTitle>
          <MyButton
            tip='close'
            onClick={() => closeSearchDialog()}
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
                          <Link
                            to={`/user/${user.username}`}
                            className={classes.username}
                          >
                            <Typography color='secondary' variant='h5'>
                              {user.username}
                            </Typography>
                          </Link>
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
      openSearchDialog,
      closeSearchDialog
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(UserSearch)));
