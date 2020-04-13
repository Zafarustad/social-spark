import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import moment from 'moment';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { markNotificationReadDispatch } from '../Actions/userActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

class Notifications extends Component {
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

  setNotificationRead = async (
    notificationId,
    recipient,
    sender,
    sparkId,
    type
  ) => {
    const { history } = this.props;

    await this.props.markNotificationReadDispatch(notificationId);
    {
      type === 'following'
        ? history.push(`/user/${sender}`)
        : history.push(`/user/${recipient}/spark/${sparkId}`);
    }
    window.location.reload();
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      user: { notifications },
    } = this.props;
    const { anchorEl } = this.state;

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notification) => notification.read === false)
        .length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter(
                  (notification) => notification.read === false
                ).length
              }
              color='error'
            >
              <NotificationIcon color='secondary' />
            </Badge>
          ))
        : (notificationIcon = <NotificationIcon color='secondary' />);
    } else {
      notificationIcon = <NotificationIcon color='secondary' />;
    }

    let notificationMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const type =
            notification.type === 'like'
              ? 'liked'
              : notification.type === 'comment'
              ? 'commented on'
              : 'following';
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? 'primary' : 'secondary';
          const icon =
            notification.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : notification.type === 'comment' ? (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <PersonAddIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <div
                onClick={() =>
                  this.setNotificationRead(
                    notification.notificationId,
                    notification.recipient,
                    notification.sender,
                    notification.sparkId,
                    type
                  )
                }
              >
                {type === 'liked' || type === 'commented on' ? (
                  <Typography variant='body1'>
                    {notification.sender} {type} your spark {time}
                  </Typography>
                ) : (
                  <Typography variant='body1'>
                    {notification.sender} started {type} you
                  </Typography>
                )}
              </div>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications
        </MenuItem>
      );

    return (
      <>
        <Tooltip placement='bottom' title='Notifications'>
          <IconButton
            aria-controls={anchorEl ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          className='over-auto'
        >
          {notificationMarkup}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      markNotificationReadDispatch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Notifications));
