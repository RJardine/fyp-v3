import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/authAction";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  // hooks for state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  //   toggle display Social
  const [disabled, toggle] = useState(true);
  // Onclick agree button
  // const onClick = e => {
  //   setFormData({
  //     disabled: !disabled
  //   });
  // };

  // Onchange event
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // onSubmit event
  const onSubmit = async e => {
    e.preventDefault();
    // password match
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      // call register
      register({ name, email, password });
    }
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // pull out state var
  const { name, email, password, password2 } = formData;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div
            className=" card text-white bg-dark mb-3"
            style={{
              boxShadow:
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
              border: "solid 1px #1c1c1c"
            }}
          >
            <div className="card-body">
              <h3 className="text-center ">
                Create Account <i className="fas fa-user-plus" />
              </h3>
              <form onSubmit={e => onSubmit(e)}>
                {/* name */}
                <TextFieldGroup
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                  type="text"
                />
                {/* email */}
                <TextFieldGroup
                  label="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  type="text"
                />
                {/* password */}
                <TextFieldGroup
                  label="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  type="password"
                />
                {/* confirm password */}
                <TextFieldGroup
                  label="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={e => onChange(e)}
                  type="password"
                />
                {/* checkbox */}
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() =>
                        // toggle button
                        toggle(!disabled)
                      }
                    />
                    <label className="form-check-label">
                      By Signing up you agree for us to store your information
                    </label>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={disabled}
                >
                  {" "}
                  Get Started <i className="fas fa-user-plus" />
                </button>

                <small>
                  Already a member? <Link to="/login">Login</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//proptypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// mapstatetoprops
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
