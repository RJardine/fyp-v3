import { POST_ERROR, GET_POSTS } from "../types";

// initial state
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

// function
export default function(state = initialState, action) {
  // destructure action
  const { type, payload } = action;
  // switch
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
