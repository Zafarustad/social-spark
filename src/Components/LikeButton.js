import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom/";
import MyButton from "./MyButton";
import { likeSparkDispatch, unlikeSparkDispatch } from "../Actions/dataActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class LikeButton extends Component {
  likedSpark = () => {
    const { user, sparkId } = this.props;

    if (user.likes && user.likes.find(like => like.sparkId === sparkId))
      return true;
    else return false;
  };

  likeSpark = () => {
    const { likeSparkDispatch, sparkId } = this.props;
    likeSparkDispatch(sparkId);
  };

  unlikeSpark = () => {
    const { unlikeSparkDispatch, sparkId } = this.props;
    unlikeSparkDispatch(sparkId);
  };

  render() {
    const { user, data } = this.props;

    return !user.authenticated ? (
      <Link to='/login'>
        <MyButton tip='like'>
          <FavoriteBorder color='secondary' />
        </MyButton>
      </Link>
    ) : this.likedSpark() ? (
      <MyButton tip='unlike' onClick={() => this.unlikeSpark()}>
        <FavoriteIcon color='secondary' />
      </MyButton>
    ) : (
      <MyButton tip='like' onClick={() => this.likeSpark()}>
        <FavoriteBorder color='secondary' />
      </MyButton>
    );
  }
}

const mapStateToProps = ({ user, data }) => ({ user });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      likeSparkDispatch,
      unlikeSparkDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
