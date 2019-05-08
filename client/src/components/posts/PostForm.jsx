import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";

const PostForm = ({ addPost }) => {
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
              <div
                className="card card-dark"
                style={{
                  boxShadow:
                    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                  border: "solid 1px #1c1c1c"
                }}
              >
                <div className="card-header bg-dark text-white">
                  post something
                </div>
                <div className="card-body bg-dark">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      addPost({ text });
                      setText("");
                    }}
                  >
                    <div className="form-group">
                      <TextAreaFieldGroup
                        placeholder="type here ..."
                        name="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows="4"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-lg"
                    >
                      Post
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
