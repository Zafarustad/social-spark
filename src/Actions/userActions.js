import axios from "axios";
import {
  LOADING_UI,
  SET_ERRORS,
  SET_USER,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  SET_SPARKS,
  ON_LOADED_DATA,
  GET_USER_PROFILE, 
  MARK_NOTIFICATION_READ,
} from "../Reducers/types";

import { loadingDataAction } from "./dataActions";

export const loadingUserAction = () => ({
  type: LOADING_UI
});

export const setUserDataAction = data => ({
  type: SET_USER,
  payload: data
});

export const triggerErrorAction = data => ({
  type: SET_ERRORS,
  payload: data
});

export const triggerClearErrorAction = () => ({
  type: CLEAR_ERRORS
});

export const unauthenticateUserAction = () => ({
  type: SET_UNAUTHENTICATED
});

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED
});

export const laodingUserAction = () => ({
  type: LOADING_USER
});

export const getUserProfileAction = data => ({
  type: GET_USER_PROFILE,
  payload: data
});

export const markNotificationReadAction = (data) => ({
  type: MARK_NOTIFICATION_READ,
  payload: data
});

export const setAuthorizationHeader = token => {
  const FBToken = `Bearer ${token}`;
  localStorage.setItem("FBToken", FBToken);
  axios.defaults.headers.common["Authorization"] = FBToken;
};

export const loginUserDispatch = (data, history) => async dispatch => {
  try {
    const res = await axios.post("/login", data);
    setAuthorizationHeader(res.data.token);
    dispatch(setUserDataDispatch());
    history.push("/");
    dispatch(loadingUserAction());
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const signinUserDispatch = (data, history) => async dispatch => {
  try {
    const res = await axios.post("/signup", data);
    setAuthorizationHeader(res.data.accessToken);
    dispatch(setUserDataDispatch());
    dispatch(triggerClearErrorAction());
    history.push("/");
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const setUserDataDispatch = () => async dispatch => {
  try {
    dispatch(laodingUserAction());
    const res = await axios.get("/user");
    dispatch(setUserDataAction(res.data));
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const logoutUserDispatch = () => dispatch => {
  localStorage.removeItem("FBToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(unauthenticateUserAction());
};

export const uploadImageDispatch = data => async dispatch => {
  try {
    dispatch(laodingUserAction());
    await axios.post("/user/image", data);
    dispatch(setUserDataDispatch());
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const updateDetailsDispatch = data => async dispatch => {
  try {
    dispatch(laodingUserAction());
    await axios.post("/user", data);
    // dispatch(getUserDispatch());
  } catch (err) {
    console.log(err);
    console.log(triggerErrorAction(err.response.data));
  }
};

export const getUserDispatch = username => async dispatch => {
  try {
    dispatch(loadingDataAction());
    const res = await axios.get(`/user/${username}`);
    dispatch({
      type: SET_SPARKS,
      payload: res.data.sparks
    });
    dispatch({
      type: ON_LOADED_DATA
    });
  } catch (err) {
    console.log(err);
  }
};

export const markNotificationReadDispatch = (notificationId) => async dispatch => {
  try {
    await axios.post(`/notifications`, [notificationId]);
    dispatch(markNotificationReadAction(notificationId));
  } catch (err) {
    console.log(err);
  }
};

export const followUserDispatch = (username) => async (dispatch) => {
  try {
    await axios.get(`user/${username}/follow`)
  }
  catch(err) {
    console.log(err)
  }
}

export const unFollowUserDispatch = (username) => async (dispatch) => {
  try {
    await axios.get(`user/${username}/unfollow`)
  }
  catch(err) {
    console.log(err)
  }
}
