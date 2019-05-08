import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "../types";

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
