import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { submitCommentDispatch } from "../Actions/dataActions";
import { Grid, TextField, Button } from "@material-ui/core";
import { isMobile } from "react-device-detect";

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }

    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ comment: "" });
    }
  }

  handleSubmit = event => {
    const { submitCommentDispatch, sparkId } = this.props;
    const { comment } = this.state;

    event.preventDefault();
    submitCommentDispatch(sparkId, comment);
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const {
      user: { authenticated }
    } = this.props;
    const { comment, errors } = this.state;
    return authenticated ? (
      <form onSubmit={this.handleSubmit} className='comment-form pb-5'>
          <Grid container alignItems='center'>
        <Grid item xs={isMobile ? 12 : 9}>
          <TextField
            name='comment'
            variant='outlined'
            type='text'
            label='Write a comment'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={comment}
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={isMobile ? 12 : 3} style={{textAlign: 'center'}} className='pt-3'>
          <Button variant='contained' color='secondary' type='submit'>
            Submit
          </Button>
        </Grid>
        </Grid>
      </form>
    ) : null;
  }
}

const mapStateToProps = ({ user, ui }) => ({ user, ui });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitCommentDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
