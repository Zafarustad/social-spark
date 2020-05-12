import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../Utils/firebaseService';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import Options from './Options';
import {
  getAllMessagesDispatch,
  postNewMessageDispatch,
} from '../Actions/dataActions';
import {
  withStyles,
  TextField,
  IconButton,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const styles = {
  chatLeft: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  chatRight: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  createdAt: {
    fontSize: 10,
    color: 'grey',
  },
  spinner: {
    textAlign: 'center',
    marginTop: isMobile ? '80%' : '20%',
    marginBottom: isMobile ? '50%' : 50,
  },
};

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      input: '',
    };
  }

  async componentDidMount() {
    await this.getAllChats();
    this.listenToNewMessages();
  }

  listenToNewMessages = () => {
    db.collection('messages').onSnapshot(() => {
      this.getUpdatedMessages();
    });
  };

  getAllChats = async () => {
    this.setState({ loading: true });
    await this.props.getAllMessagesDispatch();
    this.setState({ loading: false });
    this.scrollToBottom();
  };

  getUpdatedMessages = async () => {
    const { getAllMessagesDispatch } = this.props;
    await getAllMessagesDispatch();
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.el.scrollIntoView(false, { behavior: 'smooth' });
  };

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = async (e) => {
    const { input } = this.state;
    const { postNewMessageDispatch } = this.props;
    e.preventDefault();

    this.setState({ input: '' });
    await postNewMessageDispatch(input);
    this.listenToNewMessages();
    this.scrollToBottom();
  };

  render() {
    dayjs.extend(relativeTime);
    const { input, loading } = this.state;

    const {
      user: {
        credentials: { username },
      },
      data,
      classes,
    } = this.props;
    return (
      <>
        <div
          className='chat-container'
          ref={(el) => {
            this.el = el;
          }}
        >
          {loading ? (
            <div className={classes.spinner}>
              <CircularProgress color='secondary' size={isMobile ? 40 : 50} />
            </div>
          ) : (
            data.messages &&
            data.messages.map((message) => {
              return (
                <div
                  className={
                    username === message.username
                      ? classes.chatRight
                      : classes.chatLeft
                  }
                  key={message.messageId}
                >
                  <div className='flex-row align-items-center'>
                    <Typography variant='body1' color='secondary'>
                      {message.username}
                    </Typography>
                    <Avatar
                      src={message.userImage}
                      className={classes.avatar}
                    />
                    {username === message.username && (
                      <Options messageId={message.messageId} />
                    )}
                  </div>
                  <div className={classes.messageBody}>
                    <Typography variant='body1'>{message.body}</Typography>
                  </div>
                  <Typography variant='body2' className={classes.createdAt}>
                    {dayjs(message.createdAt).fromNow()}
                  </Typography>
                </div>
              );
            })
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='chat-form-contain'>
            <div className='flex-row align-items-center chat-form'>
              <TextField
                onChange={this.handleInput}
                value={input}
                placeholder='Type Message'
                fullWidth
              />
              <IconButton type='submit'>
                <SendIcon color='secondary' />
              </IconButton>
            </div>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ data, user }) => ({ data, user });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllMessagesDispatch,
      postNewMessageDispatch,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChatRoom));
