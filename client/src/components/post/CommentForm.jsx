import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/postActions";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";

const CommentForm = ({ addComment, postId }) => {
  // state
  const [text, setText] = useState("");
  return (
    <div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* form */}
            <div className="mb-3">
              <div className="card card-dark">
                <div className="card-header bg-dark text-white">
                  reply to post
                </div>
                <div className="card-body bg-dark">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      addComment(postId, { text });
                      setText("");
                    }}
                  >
                    <div className="form-group">
                      <TextAreaFieldGroup
                        placeholder="comment here ..."
                        name="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows="3"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">
                      comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
