import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../redux/actions/postActions";

const CommentFeed = ({
  postId,
  auth,
  comment: { _id, text, name, avatar, user, date },
  deleteComment
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
              <Link to={`/profile/${user}`} className="d-none d-md-block">
                <img
                  src={avatar}
                  alt=""
                  style={{ width: "7rem", height: "7rem" }}
                />
              </Link>
              <br />
            </div>
            <div className="col-md-10">
              <blockquote className="blockquote text-right">
                <p className="mb-0 text-white">{text}</p>
                <footer className="blockquote-footer">
                  comment by{" "}
                  <cite title="Source Title" style={{ color: "white" }}>
                    {name}
                  </cite>
                </footer>
                <small className="text-muted">
                  commented on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
                  <i className="fas fa-calendar-check" />
                </small>
                <br />
                {!auth.loading && user === auth.user._id && (
                  <Fragment>
                    {" "}
                    <button
                      onClick={e => deleteComment(postId, _id)}
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-trash-alt" />
                    </button>{" "}
                  </Fragment>
                )}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentFeed.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProp,
  { deleteComment }
)(CommentFeed);
