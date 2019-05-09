import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { getPost } from "../../redux/actions/postActions";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Post = ({ getPost, post: { post, loading }, match }) => {
  // useEffect
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <hr />
        <h3 className="display-5 text-center ">comments</h3>
        <hr />
        <div className="row">
          <div className="col-md-2">
            <Link to="/posts" className="btn btn-primary mb-3 btn-block">
              <i className="fas fa-arrow-left">Back</i>
            </Link>
          </div>
          <div className="col-md-10">
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            {post.comments.map(comment => (
              <CommentFeed
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
