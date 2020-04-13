import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openSparkDispatch } from "../Actions/dataActions";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import MyButton from "./MyButton";
import dayjs from "dayjs";
import CloseIcon from "@material-ui/icons/Close";
import ExpandIcon from "@material-ui/icons/UnfoldMore";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress, Grid, Typography, Avatar } from "@material-ui/core";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 130,
    height: 130,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerContain: {
    textAlign: "center",
    marginTop: isMobile ? "80%" : 50,
    marginBottom: isMobile ? "50%" : 50
  },
  likeBtn: {
    position: "relative",
    right: "5%",
    display: "flex",
    alignItems: "center"
  },
  image: {
    width: 120,
    height: 120
  }
};

class SparkDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      newPath: "",
      oldPath: ""
    };
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    const { openSparkDispatch, sparkId, username } = this.props;

    let oldPath = window.location.pathname;
    const newPath = `/user/${username}/spark/${sparkId}`;
    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) oldPath = `/user/${username}`;

    this.setState({ dialog: true, oldPath, newPath });
    openSparkDispatch(sparkId);
  };

  handleClose = () => {
    this.setState({ dialog: false });
    window.history.pushState(null, null, this.state.oldPath);
  };

  render() {
    const {
      classes,
      data,
      ui: { loading }
    } = this.props;

    return (
      <>
        <MyButton
          tip='open Spark'
          onClick={this.handleOpen}
          tipClassName={classes.expandIcon}
        >
          <ExpandIcon color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          fullScreen={isMobile ? true : false}
          fullWidth={isMobile ? false : true}
          maxWidth='sm'
        >
          <MyButton
            tip='close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {loading ? (
              <div className={classes.spinnerContain}>
                <CircularProgress color='secondary' />
              </div>
            ) : data.spark ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={isMobile ? 6 : 3}>
                    <Avatar
                      className={classes.image}
                      alt='profile image'
                      src={data.spark.userImage}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      component={Link}
                      color='secondary'
                      variant='h5'
                      to={`user/${data.spark.username}`}
                    >
                      @{data.spark.username}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant='body1'>{data.spark.body}</Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(data.spark.createdAt).format(
                        "h:mm a, MMMM DD YYYY"
                      )}
                    </Typography>
                    <div className={classes.likeBtn}>
                      <LikeButton sparkId={data.spark.sparkId} />
                      <span className='pb-1'>{data.spark.likeCount}</span>
                    </div>
                  </Grid>
                </Grid>
                <CommentForm sparkId={data.spark.sparkId} />
                <Comments comments={data.spark.comments} />
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = ({ data, ui }) => ({ data, ui });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openSparkDispatch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SparkDialog));
