import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteMessageDispatch } from '../Actions/dataActions';
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  withStyles,
} from '@material-ui/core';
import OptionIcon from '@material-ui/icons/MoreVert';

const styles = {
  icon: {
    padding: 0,
  },
};

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  deleteMessage = async (id) => {
    const { deleteMessageDispatch } = this.props;
    await deleteMessageDispatch(id);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, messageId } = this.props;

    return (
      <>
        <IconButton
          aria-controls={anchorEl ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={this.handleOpen}
          className={classes.icon}
        >
          <OptionIcon fontSize='small' color='secondary' />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          className='over-auto'
        >
          <MenuItem>
            <div onClick={() => this.deleteMessage(messageId)}>
              <Typography variant='body1'>Delete</Typography>
            </div>
          </MenuItem>
        </Menu>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteMessageDispatch,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(withStyles(styles)(Options));
