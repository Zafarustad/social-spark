import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, ON_LOADED_DATA } from "./types";

const initialState = {
  loading: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
       case ON_LOADED_DATA:
       return {
         ...state,
         loading: false
       }
    default:
      return state;
  }
};
