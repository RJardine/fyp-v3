import {
  POST_ERROR,
  GET_POSTS,
  ADD_POST,
  UPDATE_LIKES,
  DELETE_POST
} from "../types";

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
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    // WE WANT TO MAKE SURE THE POST WE ARE LIKES ARE ON THE RIGHT POST UPDATING
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    // WE WANT TO RETURN THE POSTS AND REMOVE THE DELETED ONE
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
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
