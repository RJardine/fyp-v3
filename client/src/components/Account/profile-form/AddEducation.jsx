import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextAreaFieldGroup from "../../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../../common/TextFieldGroup";
import { addEducation } from "../../../redux/actions/profileAction";

const AddEducation = ({ addEducation, history }) => {
  // state using hooks
  const [formData, setFormData] = useState({
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    school: "",
    current: false,
    disabled: ""
  });

  // disabled to data tooggle
  const [toDatedisabled, toggleDisabled] = useState(false);

  // destructruring
  const {
    degree,
    fieldofstudy,
    from,
    to,
    school,
    current,
    description
  } = formData;

  // onChange
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="container">
        <form
          onSubmit={e => {
            e.preventDefault();
            addEducation(formData, history);
          }}
        >
          <div className="row">
            <div className="col-7">
              <div
                className="card card-body bg-dark mb-3 p-4"
                style={{
                  boxShadow:
                    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                  border: "solid 1px #1c1c1c",
                  color: "white"
                }}
              >
                <Link to="/dashboard" className="btn btn-primary btn-sm">
                  <i className="fas fa-arrow-left" /> Back to Profile
                </Link>
                <h1 className="display-5 text-center"> Education </h1>
                <p className="lead text-center">
                  Add any Education you have * = required fields
                </p>
                {/* fields */}
                {/* School*/}
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={e => onChange(e)}
                />
                {/* degree */}
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={degree}
                  onChange={e => onChange(e)}
                />
                {/* location */}
                {/* fieldofstudy */}
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={e => onChange(e)}
                />
                <h6>From date</h6>
                {/* date from */}
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            {/* part 2 */}
            <div className="col">
              <div
                className=" card text-white bg-dark mb-3 p-4"
                style={{
                  boxShadow:
                    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                  border: "solid 1px #1c1c1c"
                }}
              >
                {/* to date */}
                <h6>To date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={e => onChange(e)}
                  disabled={toDatedisabled ? "disabled" : ""}
                />
                {/* checkbox */}
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={e => {
                      setFormData({ ...formData, current: !current });
                      toggleDisabled(!toDatedisabled);
                    }}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School
                  </label>
                </div>
                {/* school description */}
                <TextAreaFieldGroup
                  placeholder="Descripton about your school life"
                  name="description"
                  value={description}
                  onChange={e => onChange(e)}
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
