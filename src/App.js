import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Reducers/store';
import jwtDecode from 'jwt-decode';
import home from './Pages/home';
import login from './Pages/login';
import signup from './Pages/signup';
import ChatRoom from './Components/ChatRoom';
import User from './Components/User';
import FollowingUserSparks from './Components/FollowingUserSparks';
import AuthRoute from './Utils/AuthRoute';
import './App.css';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles/';
import {
  setAuthenticated,
  logoutUserDispatch,
  setUserDataDispatch,
} from './Actions/userActions';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#090909',
      main: '#151515',
      dark: '#3e3e3e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fcd738',
      main: '#FCCE07',
      dark: '#b09004',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const setAuthenticatedUser = async () => {
  await store.dispatch(setAuthenticated());
  await store.dispatch(setUserDataDispatch());
};

const token = localStorage.FBToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUserDispatch());
    window.location.href = '/login';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    setAuthenticatedUser();
  }
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
                <Route exact path='/user/:username' component={User} />
                <Route exact path='/users' component={FollowingUserSparks} />
                <Route
                  exact
                  path='/user/:username/spark/:sparkId'
                  component={User}
                />
                <Route exact path='/chats' component={ChatRoom} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
