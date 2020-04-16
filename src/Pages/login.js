import React from 'react';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import loginImg from '../assets/login2.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { loginUserDispatch } from '../Actions/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      : this.setState({ password: event.target.value });
  };

  handleSubmit = async (event) => {
    const { email, password } = this.state;
    const { loginUserDispatch, history } = this.props;

    event.preventDefault();
    this.setState({ loading: true });

    const userData = {
      email: email,
      password: password,
    };

    await loginUserDispatch(userData, history);

    this.setState({ loading: false });
  };

  render() {
    const { email, password, loading, errors } = this.state;
    return (
      <Grid
        container
        className='form-contain'
        style={
          !isMobile
            ? { backgroundImage: `url(${loginImg})`, padding: '50px' }
            : { backgroundImage: '' }
        }
      >
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className='form'>
            <Typography variant='h5'>Welcome to Social Spark</Typography>

            <Avatar>
              <LockIcon color='primary' />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                onChange={this.handleInput}
                value={email}
                className='text-feild'
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
              {errors.general && (
                <Typography className='form-error m-t-10 m-b-10'>
                  {errors.general}
                </Typography>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                margin='normal'
                color='primary'
                disabled={loading}
              >
                Login
              </Button>
              {loading && (
                <LinearProgress
                  className='m-t-10'
                  variant='query'
                  color='primary'
                />
              )}
            </form>
            <Link className='mt-4 mr-auto' to='/signup'>
              {"Don't have an account? Sign Up"}
            </Link>
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
      loginUserDispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
