import {
  LOADING_DATA,
  SET_SPARKS,
  LIKE_SPARK,
  UNLIKE_SPARK,
  DELETE_SPARK,
  POST_SPARK,
  SET_SPARK,
  SUBMIT_COMMENT,
  GET_ALL_USERS,
} from '../Reducers/types';

const initialState = {
  spark: {},
  sparks: [],
  loading: false,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SPARKS:
      return {
        sparks: action.payload,
        loading: false,
      };
    case LIKE_SPARK:
    case UNLIKE_SPARK: {
      let index = state.sparks.findIndex(
        (spark) => spark.sparkId === action.payload.sparkId
      );

      if (state.spark && state.spark.sparkId === action.payload.sparkId) {
        state.spark.likeCount = action.payload.likeCount;
      }
      state.sparks[index] = action.payload;

      return {
        ...state,
      };
    }

    case DELETE_SPARK: {
      let index = state.sparks.findIndex(
        (spark) => spark.sparkId === action.payload
      );
      state.sparks.splice(index, 1);
      return {
        ...state,
      };
    }

    case POST_SPARK:
      return {
        ...state,
        sparks: [action.payload, ...state.sparks],
      };
    case SET_SPARK:
      return {
        ...state,
        spark: action.payload,
      };

    case SUBMIT_COMMENT:
      let index = state.sparks.findIndex(
        (spark) => spark.sparkId === action.payload.sparkId
      );
      // let spark = state.sparks[index]
      // if(state.spark.sparkId === action.payload.sparkId) {
      // spark.commentCount += 1;
      // }
      return {
        ...state,
        spark: {
          ...state.spark,
          comments: [action.payload, ...state.spark.comments],
        },
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
}
