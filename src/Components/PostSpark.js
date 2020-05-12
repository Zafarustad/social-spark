import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postSparkDispatch } from "../Actions/dataActions";
import MyButton from "./MyButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from '@material-ui/core/Slide';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class PostSpark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      dialog: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "" });
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({ dialog: true });
  };

  handleClose = () => {
    const { errors } = this.state;
    this.setState({ dialog: false });

    if (errors.body) {
      this.setState({ body: "", errors: {} });
    }
  };

  handleChange = event => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { body, errors } = this.state;
    const { postSparkDispatch } = this.props;

    await postSparkDispatch(body);

    if (!body && errors.body) {
      this.handleClose();
    }
  };

  render() {
    const { errors, dialog, body } = this.state;
    return (
      <>
        <MyButton tip='add spark' onClick={() => this.handleOpen()}>
          <AddIcon color='secondary' />
        </MyButton>
        <Dialog
          open={dialog}
          onClose={() => this.handleClose()}
          TransitionComponent={transition}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Post a new Spark</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                variant='outlined'
                margin='normal'
                rows='3'
                fullWidth
                placeholder='Write something in 200 characters'
                error={errors.body ? true : false}
                helperText={errors.body}
                onChange={this.handleChange}
                value={body}
              />
              <DialogActions>
                <Button type='submit' variant='contained' color='secondary'>
                  Post
                </Button>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => this.handleClose()}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = ({ ui }) => ({ ui });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postSparkDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostSpark);
