import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Spinner from "../../common/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  // useEffect - fetch the component from api and put it into the state
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="display-4 text-center">
              {" "}
              Feed <i className="fas fa-comment-dots" />
            </h3>
            <p>feel free to ask anything, discuss, debate, etc</p>
            <PostForm />
            <hr />
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// mapstate for post
const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
