import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
//actions
import {
  addLike,
  removeLike,
  deletePost
} from "../../redux/actions/postActions";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <div>
      <div className="container">
        <div
          className="card card-body mb-3 bg-dark"
          style={{
            boxShadow:
              "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
            border: "solid 1px #1c1c1c"
          }}
        >
          <div className="row">
            <div className="col-md-2">
              <Link to={`/profile/${user}`}>
                <img
                  src={avatar}
                  className="d-none d-md-block"
                  alt=""
                  style={{ width: "10rem", height: "10rem" }}
                />
              </Link>
              <br />
            </div>
            <div className="col-md-10">
              <blockquote className="blockquote text-right">
                <p className="mb-0 text-white">{text}</p>
                <footer className="blockquote-footer">
                  by{" "}
                  <cite title="Source Title" style={{ color: "white" }}>
                    {name}
                  </cite>
                </footer>

                <small className="text-muted">
                  Posted on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
                  <i className="fas fa-calendar-check" />
                </small>

                <hr />

                <span>
                  {" "}
                  <button
                    onClick={e => addLike(_id)}
                    type="button"
                    className="btn-light btn mr-1"
                  >
                    <i className="fas fa-thumbs-up">
                      <span className="badge badge-light">
                        {likes.length > 0 && <em>{likes.length}</em>}
                      </span>
                    </i>
                  </button>
                  <button
                    onClick={e => removeLike(_id)}
                    type="button"
                    className="btn-light btn mr-1"
                  >
                    <i className="fas fa-thumbs-down text-dark">
                      <span className="badge badge-light" />
                    </i>
                  </button>
                  <Link to={`/post/${_id}`} className="btn btn-primary mr-1">
                    comments {comments.length > 0 && <em>{comments.length}</em>}
                  </Link>
                  {/* SHOW DELETE BUTTON IF AUTHORISED USER IS SIGNED IN */}
                  {!auth.loading && user === auth.user._id && (
                    <button
                      onClick={e => deletePost(_id)}
                      className="btn btn-danger mr-1"
                    >
                      {" "}
                      <i className="fas fa-times" />{" "}
                    </button>
                  )}
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

// mapstate
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
