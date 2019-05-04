import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../../common/TextAreaFieldGroup";
import InputGroup from "../../../common/InputGroup";
import {
  createProfile,
  getCurrentProfle
} from "../../../redux/actions/profileAction";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfle,
  history
}) => {
  // using hooks form state
  const [formData, setFormData] = useState({
    // default values and fields
    skills: "",
    bio: "",
    website: "",
    location: "",
    status: "",
    company: "",
    githubusername: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });
  //   toggle display Social links
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  //   useeffect = set form data
  useEffect(() => {
    getCurrentProfle();

    setFormData({
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      status: loading || !profile.status ? "" : profile.status,
      company: loading || !profile.company ? "" : profile.company,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      twitter: loading || !profile.twitter ? "" : profile.twitter,
      facebook: loading || !profile.facebook ? "" : profile.facebook,
      linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
      youtube: loading || !profile.youtube ? "" : profile.youtube,
      instagram: loading || !profile.instagram ? "" : profile.instagram
    });
  }, [loading]);

  // destructure formDATA
  const {
    skills,
    bio,
    website,
    location,
    status,
    company,
    githubusername,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  //   Onchnage
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // onSubmit
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={e => onSubmit(e)} noValidate>
          <div className="row">
            {/* <div className="col-sm"> */}
            <div className="col">
              <div
                className=" card text-white bg-dark mb-3 p-4"
                style={{
                  boxShadow:
                    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                  border: "solid 1px #1c1c1c"
                }}
              >
                <Link to="/dashboard" className="btn btn-primary btn-sm">
                  <i className="fas fa-arrow-left" /> Back to Profile
                </Link>
                <h2 className="diplay-4 text-center mt-3">Edit Profile</h2>
                {/* status selectorvalue={status} onChange={e => onChange(e)} */}
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={e => onChange(e)}
                  style={{ background: "#2e2f34", color: "white" }}
                >
                  <option value="0">*Select your Status</option>
                  <option value="Manager">Manager</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
                {/* skills */}
                <TextFieldGroup
                  info="This is where you highlight your what your good at"
                  placeholder="format example: HTML,CSS,JavaScript"
                  name="skills"
                  value={skills}
                  onChange={e => onChange(e)}
                />
                {/* website */}
                <TextFieldGroup
                  info="This is optional, your website"
                  placeholder="https://duckduckgo.com/"
                  name="website"
                  value={website}
                  onChange={e => onChange(e)}
                />
                {/* location */}
                <TextFieldGroup
                  info="This is optional, your location"
                  placeholder="London, UK"
                  name="location"
                  value={location}
                  onChange={e => onChange(e)}
                />
                {/* Company */}
                <TextFieldGroup
                  info="This is optional, your workplace"
                  placeholder="e.g: Microsoft"
                  name="company"
                  value={company}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            {/* part 2 */}
            <div className="row">
              <div className="col">
                <div
                  className=" card text-white bg-dark mb-3 p-4"
                  style={{
                    boxShadow:
                      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                    border: "solid 1px #1c1c1c"
                  }}
                >
                  {/* github repo */}
                  <TextFieldGroup
                    info="This is optional, your latest github repos will be displayed on your profile"
                    placeholder="example johndoe2"
                    name="githubusername"
                    value={githubusername}
                    onChange={e => onChange(e)}
                  />
                  {/* bio */}
                  <TextAreaFieldGroup
                    name="bio"
                    placeholder="Write something about yourself"
                    value={bio}
                    onChange={e => onChange(e)}
                    rows="3"
                  />
                  {/* social links */}
                  <div className="mb-3">
                    <small className="mr-5">
                      Optional - Click button to add social links{" "}
                    </small>
                    <button
                      type="button"
                      onClick={() =>
                        // toggle button
                        toggleSocialInputs(!displaySocialInputs)
                      }
                      className=" btn btn-primary"
                    >
                      social Links{" "}
                    </button>
                  </div>
                  {displaySocialInputs && (
                    <Fragment>
                      <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={twitter}
                        onChange={e => onChange(e)}
                      />

                      <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={facebook}
                        onChange={e => onChange(e)}
                      />

                      <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={linkedin}
                        onChange={e => onChange(e)}
                      />

                      <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={youtube}
                        onChange={e => onChange(e)}
                      />

                      <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={instagram}
                        onChange={e => onChange(e)}
                      />
                    </Fragment>
                  )}
                  {/* submit button */}
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfle }
)(withRouter(EditProfile));
