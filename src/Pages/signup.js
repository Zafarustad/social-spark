import React from 'react';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SigninIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import signupImg from '../assets/signup.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { signinUserDispatch } from '../Actions/userActions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      loading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

  handleInput = (event) => {
    event.target.name === 'email'
      ? this.setState({ email: event.target.value })
      : event.target.name === 'password'
      ? this.setState({ password: event.target.value })
      : event.target.name === 'confirmPassword'
      ? this.setState({ confirmPassword: event.target.value })
      : this.setState({ username: event.target.value });
  };

  handleSubmit = async (event) => {
    const { email, password, confirmPassword, username } = this.state;
    const { signinUserDispatch, history } = this.props;
    event.preventDefault();
    this.setState({ loading: true });
    const newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      username: username,
    };
    await signinUserDispatch(newUser, history);
    this.setState({ loading: false });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      username,
      loading,
      errors,
    } = this.state;
    return (
      <Grid
        container
        className='form-contain'
        style={
          !isMobile
            ? { backgroundImage: `url(${signupImg})`, padding: '50px' }
            : { backgroundImage: '' }
        }
      >
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className='form'>
            <Typography variant='h5'>Welcome to Social Spark</Typography>

            <Avatar>
              <SigninIcon color='primary' />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                onChange={this.handleInput}
                value={email}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
                id='email'
                label='Email'
                name='email'
              />
              <TextField
                variant='outlined'
                onChange={this.handleInput}
                value={password}
                helperText={errors.password}
                error={errors.password ? true : false}
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
              <TextField
                variant='outlined'
                margin='normal'
                onChange={this.handleInput}
                value={confirmPassword}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                fullWidth
                id='confirmPassword'
                type='password'
                label='Confirm Password'
                name='confirmPassword'
              />
              <TextField
                variant='outlined'
                margin='normal'
                onChange={this.handleInput}
                value={username}
                helperText={errors.username}
                error={errors.username ? true : false}
                fullWidth
                id='username'
                label='Username'
                name='username'
              />
              {errors.general && (
                <Typography variant='body2' className='form-error m-t-10'>
                  {errors.general}
                </Typography>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={loading}
              >
                Log In
              </Button>
              {loading && (
                <LinearProgress
                  className='m-t-10'
                  variant='query'
                  color='primary'
                />
              )}
              <Link className='m-t-10' to='/login'>
                {'Have an account? Log In'}
              </Link>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signinUserDispatch,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
