import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { loginUser } from "../../redux/actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Register = ({ loginUser, isAuthenticated }) => {
  // hooks for state
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  // Onchange event
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // onSubmit event
  const onSubmit = async e => {
    e.preventDefault();
    // success
    loginUser(email, password);
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // pull out state var
  const { email, password } = formData;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="mx-auto col-md-5">
            <div
              className=" card text-white bg-dark mb-3"
              style={{
                boxShadow:
                  "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                border: "solid 1px #1c1c1c"
              }}
            >
              <div className="card-body">
                <h2 className="text-center ">
                  {" "}
                  welcome back <i className="far fa-smile-beam" />
                </h2>
                <form onSubmit={e => onSubmit(e)}>
                  {/* email */}
                  <TextFieldGroup
                    label="Email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    // error={errors.email}
                    type="text"
                  />
                  {/* password */}
                  <TextFieldGroup
                    label="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    // error={errors.password}
                    type="password"
                  />
                  <hr />
                  <button className="btn btn-primary btn-block" type="submit">
                    Login
                  </button>
                  <small>
                    Need an Account? <Link to="/register">Register</Link>
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// proptypes
loginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// mapstatetoprops
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Register);
