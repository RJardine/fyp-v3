import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";

const Register = () => {
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
    console.log(formData);
  };
  // pull out state var
  const { email, password } = formData;
  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div
              className=" card text-white bg-dark mb-3"
              style={{
                boxShadow:
                  "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
              }}
            >
              <h1 className="card-title text-center pb-4 pt-3">
                {" "}
                welcome back <i className="fas fa-door-open" />
              </h1>
              <div className="card-body">
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

export default Register;
