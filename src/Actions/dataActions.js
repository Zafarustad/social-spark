import axios from 'axios';
import {
  LOADING_DATA,
  SET_SPARKS,
  LIKE_SPARK,
  UNLIKE_SPARK,
  DELETE_SPARK,
  POST_SPARK,
  SET_SPARK,
  ON_LOADED_DATA,
  SUBMIT_COMMENT,
} from '../Reducers/types';
import {
  triggerClearErrorAction,
  triggerErrorAction,
  loadingUserAction,
} from './userActions';

export const getSparksAction = (data) => ({
  type: SET_SPARKS,
  payload: data,
});

export const loadingDataAction = () => ({
  type: LOADING_DATA,
});

export const likeSparkAction = (data) => ({
  type: LIKE_SPARK,
  payload: data,
});

export const unlikeSparkAction = (data) => ({
  type: UNLIKE_SPARK,
  payload: data,
});

export const deleteSparkAction = (data) => ({
  type: DELETE_SPARK,
  payload: data,
});

export const postSparkAction = (data) => ({
  type: POST_SPARK,
  payload: data,
});

export const openSparkAction = (data) => ({
  type: SET_SPARK,
  payload: data,
});

export const submitCommentACtion = (data) => ({
  type: SUBMIT_COMMENT,
  payload: data,
});

export const getSparksDispatch = () => async (dispatch) => {
  try {
    dispatch(loadingDataAction());
    const res = await axios.get('/sparks');
    dispatch(getSparksAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getFollowingUserSparks = () => async (dispatch) => {
  try {
    dispatch(loadingDataAction());
    const res = await axios.get('/following/sparks');
    dispatch(getSparksAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const likeSparkDispatch = (sparkId) => async (dispatch) => {
  try {
    const res = await axios.get(`/spark/${sparkId}/like`);
    dispatch(likeSparkAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const unlikeSparkDispatch = (sparkId) => async (dispatch) => {
  try {
    const res = await axios.get(`/spark/${sparkId}/unlike`);
    dispatch(unlikeSparkAction(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteSparkDispatch = (sparkId) => async (dispatch) => {
  try {
    await axios.delete(`/spark/${sparkId}/delete`);
    dispatch(deleteSparkAction(sparkId));
  } catch (err) {
    console.log(err);
  }
};

export const postSparkDispatch = (data) => async (dispatch) => {
  try {
    const res = await axios.post('/spark', { body: data });
    dispatch(postSparkAction(res.data));
    dispatch(triggerClearErrorAction());
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const openSparkDispatch = (sparkId) => async (dispatch) => {
  try {
    dispatch(loadingUserAction());
    const res = await axios.get(`/spark/${sparkId}`);
    dispatch(openSparkAction(res.data));
    dispatch({ type: ON_LOADED_DATA });
  } catch (err) {
    console.log(err);
  }
};

export const submitCommentDispatch = (sparkId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`/spark/${sparkId}/comment`, {
      body: data,
    });
    dispatch(submitCommentACtion(res.data));
    dispatch(triggerClearErrorAction());
  } catch (err) {
    console.log(err);
    dispatch(triggerErrorAction(err.response.data));
  }
};
