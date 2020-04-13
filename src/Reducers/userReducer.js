import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SPARK,
  UNLIKE_SPARK,
  GET_USER_PROFILE,
  MARK_NOTIFICATION_READ,
} from './types';

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SPARK:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            sparkId: action.payload.sparkId,
            username: state.credentials.username,
          },
        ],
      };
    case UNLIKE_SPARK:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.sparkId !== action.payload.sparkId
        ),
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case MARK_NOTIFICATION_READ:
      let index = state.notifications.findIndex(
        (notification) => notification.notificationId === action.payload
      );
      state.notifications[index].read = true;
      return {
        ...state,
      };

    default:
      return state;
  }
};
