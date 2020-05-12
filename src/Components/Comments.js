import React, { Component, Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography, Avatar } from "@material-ui/core";
import dayjs from "dayjs";

const styles = {
  container: {
    marginTop: 20
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  },

  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  image: {
    width: isMobile ? 70 : 80,
    height: isMobile ? 70 : 80
  }
};

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container className={classes.container}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, username } = comment;
          return (
            <Fragment key={createdAt} className='m-t-40'>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <Avatar
                      className={classes.image}
                      alt='profile image'
                      src={userImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`user/${username}`}
                        color='secondary'
                      >
                        {username}
                      </Typography>
                      <Typography variant='body1'>{body}</Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant='body2'>
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(Comments);
