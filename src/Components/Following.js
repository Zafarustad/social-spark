import React, { Component } from 'react';
import MyButton from './MyButton';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
  closeButton: {
    position: 'absolute',
    left: isMobile ? ' 87%' : '90%',
    top: '1%',
  },
  username: {
    marginLeft: 15,
    cursor: 'pointer',
  },
};

class Following extends Component {
  state = {
    dialog: false,
  };

  handleDialog = () => {
    const { dialog } = this.state;

    this.setState({ dialog: !dialog ? true : false });
  };

  goToUser = (username) => {
    const { history } = this.props;

    history.push(`/user/${username}`);
    window.location.reload();
  };

  render() {
    const { following, classes } = this.props;
    return (
      <>
        <span
          className='mr-5 flex-row align-items-center'
          onClick={this.handleDialog}
          style={{ cursor: 'pointer' }}
        >
          <Typography color='primary' variant='h6'>
            Following: {following.length}
          </Typography>
        </span>
        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          fullScreen={isMobile ? true : false}
          fullWidth={isMobile ? false : true}
          maxWidth='sm'
        >
          <DialogTitle>Following</DialogTitle>
          <MyButton
            tip='close'
            onClick={this.handleDialog}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent>
            {following.length === 0 ? (
              <div className='text-center p-50'>No users found</div>
            ) : (
              following.map((user, index) => {
                return (
                  <div key={user.username}>
                    <div className='flex-row align-items-center'>
                      <Avatar src={user.userImage} className={classes.image} />
                      <a onClick={() => this.goToUser(user.username)}>
                        <Typography
                          color='secondary'
                          variant='h5'
                          className={classes.username}
                        >
                          {user.username}
                        </Typography>
                      </a>
                    </div>
                    {index !== following.length - 1 && <hr />}
                  </div>
                );
              })
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(Following));
