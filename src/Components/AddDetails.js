import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDetailsDispatch } from "../Actions/userActions";
import MyButton from "./MyButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class AddDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      website: "",
      location: "",
      dialog: false
    };
  }

  componentDidMount() {
    const {
      user: { credentials }
    } = this.props;

    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }

  handleDialog = () => {
    const { dialog } = this.state;
    this.setState({ dialog: !dialog ? true : false });
  };

  handleChange = event => {
    event.target.name === "bio"
      ? this.setState({ bio: event.target.value })
      : event.target.name === "location"
      ? this.setState({ location: event.target.value })
      : this.setState({ website: event.target.value });
  };

  submitDetails = async () => {
    const { bio, location, website } = this.state;
    const { updateDetailsDispatch } = this.props;

    let details = {
      bio,
      location,
      website
    };

    await updateDetailsDispatch(details);
    this.props.getuserProfileInfo();
    this.handleDialog();
  };

  render() {
    const { bio, website, location, dialog } = this.state;
    return (
      <>
        <MyButton tip='Edit/Add Details' onClick={this.handleDialog}>
          <EditIcon color='primary' />
        </MyButton>
        <Dialog
          open={dialog}
          onClose={this.handleDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Add Personal Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              variant='outlined'
              margin='normal'
              id='bio'
              label='bio'
              name='bio'
              type='text'
              fullWidth
              onChange={this.handleChange}
              value={bio}
            />
            <TextField
              autoFocus
              variant='outlined'
              margin='normal'
              id='location'
              name='location'
              label='location'
              type='text'
              fullWidth
              onChange={this.handleChange}
              value={location}
            />
            <TextField
              autoFocus
              variant='outlined'
              margin='normal'
              id='website'
              name='website'
              label='website'
              type='text'
              onChange={this.handleChange}
              fullWidth
              value={website}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={this.submitDetails}
              color='secondary'
            >
              Update
            </Button>
            <Button
              variant='outlined'
              onClick={this.handleDialog}
              color='primary'
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateDetailsDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddDetails);
