import React, { Component } from "react";
import MyButton from "./MyButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteSparkDispatch } from "../Actions/dataActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import Slide from '@material-ui/core/Slide';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class DeleteSpark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false
    };
  }

  handleDialog = () => {
    const { dialog } = this.state;

    this.setState({ dialog: !dialog ? true : false });
  };

  deleteSpark = async () => {
    const { sparkId, deleteSparkDispatch } = this.props;
    await deleteSparkDispatch(sparkId);
    this.handleDialog();
  };

  render() {
    const { sparkId } = this.props;
    return (
      <>
        <MyButton tip='delete spark' onClick={() => this.handleDialog()} btnClassName='delete-icon'>
          <DeleteIcon color='error' />
        </MyButton>
        <Dialog
          fullWidth
          maxWidth='sm'
          TransitionComponent={transition}
          open={this.state.dialog}
          onClose={this.handleDialog}
        >
          <DialogTitle>Are you sure you want to delete this spark?</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.deleteSpark(sparkId)}
              variant='contained'
              style={{ backgroundColor: "#E90C07", color: "#fff" }}
            >
              Delete
            </Button>
            <Button
              onClick={() => this.handleDialog()}
              variant='contained'
              color='secondary'
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteSparkDispatch
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(DeleteSpark);
