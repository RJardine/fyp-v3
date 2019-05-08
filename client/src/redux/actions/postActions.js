import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../types";

// GET POST ACTION
export const getPosts = () => async dispatch => {
  try {
    // response
    const res = await axios.get("/api/posts");
    //
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD LIKE ACTION
export const addLike = id => async dispatch => {
  try {
    // response
    const res = await axios.put(`/api/posts/like/${id}`);
    //when we get the response back
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// REMOVE LIKE ACTION
export const removeLike = id => async dispatch => {
  try {
    // response
    const res = await axios.put(`/api/posts/unlike/${id}`);
    //when we get the response back
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
