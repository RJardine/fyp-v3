import { POST_ERROR, GET_POSTS, UPDATE_LIKES } from "../types";

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
    // WE WANT TO MAKE SURE THE POST WE ARE LIKES ARE ON THE RIGHT POST UPDATING
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
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
