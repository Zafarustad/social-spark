import React, { Component } from 'react';
import { connect } from 'react-redux';
import LikeButton from './LikeButton';
import dayjs from 'dayjs';
import SparkDialog from './SparkDialog';
import DeleteSpark from './DeleteSpark';
import MyButton from './MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom/';
import relativeTime from 'dayjs/plugin/relativeTime';
import { isMobile } from 'react-device-detect';

const styles = {
  container: {
    margin: 14,
  },
  card: {
    display: 'flex',
    backgroundColor: '#151515',
    color: '#fff',
    width: !isMobile ? '350px' : 'auto',
    height: '140px',
  },
  image: {
    marginTop: '15px',
    marginLeft: '10px',
  },
  content: {
    marginLeft: '10px',
    objectFit: 'cover',
  },
};

class Spark extends Component {
  textTruncate = (str) => {
    if (str.length <= 20) return str;
    return str.slice(0, 20) + '....';
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      spark: {
        body,
        createdAt,
        username,
        userImage,
        sparkId,
        likeCount,
        commentCount,
        userProfile,
      },
      user,
    } = this.props;

    return (
      <div
        className={classes.container}
        style={{ width: isMobile ? '90%' : ''}}
      >
        <Grid container alignItems='center'>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Avatar
                className={classes.image}
                alt='profile image'
                src={userImage}
              />
              <CardContent className={classes.content}>
                <Typography
                  variant='h5'
                  color='secondary'
                  component={Link}
                  to={`/user/${username}`}
                >
                  {username}
                </Typography>
                <Typography variant='body1'>
                  {this.textTruncate(body)}
                </Typography>
                <Typography variant='body2'>
                  {dayjs(createdAt).fromNow()}
                </Typography>
                <LikeButton sparkId={sparkId} />
                <span>{likeCount}</span>
                <MyButton tip='comments'>
                  <ChatIcon color='secondary' />
                </MyButton>
                <span>{commentCount}</span>
                <SparkDialog
                  username={username}
                  sparkId={sparkId}
                  openDialog={this.props.openDialog}
                />
                {user.authenticated &&
                  user.credentials.username === username && (
                    <DeleteSpark sparkId={sparkId} />
                  )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(withStyles(styles)(Spark));
