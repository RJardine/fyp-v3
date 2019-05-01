import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
  // hooks for state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
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
      console.log(formData);
    }
  };

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
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
            }}
          >
            <h2 className="card-title text-center pb-1 pt-2">
              Create an account{" "}
              <i className="fas fa-user-plus" style={{ margin: "5px" }} />
            </h2>
            <div className="card-body">
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
                <button className="btn btn-primary btn-block" type="submit">
                  Get Started
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
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Register);
