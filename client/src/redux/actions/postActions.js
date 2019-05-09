import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../types";

// GET POSTS ACTION
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
    // an alert will pop up
    dispatch(setAlert("You have already liked the Post", "danger"));
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
    // an alert will pop up
    dispatch(setAlert("You need to like the post first", "danger"));
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE POST ACTION
export const deletePost = id => async dispatch => {
  try {
    // response
    await axios.delete(`/api/posts/${id}`);
    //when we get the response back
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    // an alert will pop up
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD POST ACTION
export const addPost = formData => async dispatch => {
  // config for sending data (formData)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    // response
    const res = await axios.post("/api/posts", formData, config);
    //when we get the response back
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    // an alert will pop up
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    // an alert will pop up
    dispatch(setAlert("Text is Required", "danger"));
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET POST ACTION
export const getPost = id => async dispatch => {
  try {
    // response
    const res = await axios.get(`/api/posts/${id}`);
    //
    dispatch({
      type: GET_POST,
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

// ADD COMMENT ACTION
export const addComment = (postId, formData) => async dispatch => {
  // config for sending data (formData)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    // response
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    //when we get the response back
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    // an alert will pop up
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE COMMENT ACTION
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    // response
    axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    //when we get the response back
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    // an alert will pop up
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    // post error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
