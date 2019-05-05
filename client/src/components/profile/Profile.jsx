import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { getProfileById } from "../../redux/actions/profileAction";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth
}) => {
  // useeffect
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="container">
            <hr />
            <div className="row">
              <div className="col-md-12">
                <Link
                  to="/profiles"
                  className="btn btn-primary btn block float-left mb-3"
                >
                  <i className="fas fa-arrow-left">Profiles</i>
                </Link>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <div className="col-md-12">
                      <Link
                        className="btn btn-primary btn block float-right mb-3"
                        to="/edit-profile"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mx-auto">
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="text-center">
                      <i className="fas fa-user-graduate">education </i>
                    </h4>
                    {profile.education.length > 0 ? (
                      <Fragment>
                        {profile.education.map(education => (
                          <ProfileEducation
                            key={education._id}
                            education={education}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h3>No education listed</h3>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-center">
                      <i className="fab fa-black-tie"> work experience</i>
                    </h4>
                    {profile.experience.length > 0 ? (
                      <Fragment>
                        {profile.experience.map(experience => (
                          <ProfileExperience
                            key={experience._id}
                            experience={experience}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h3>No experience listed</h3>
                    )}
                  </div>
                </div>
                <hr
                  style={{
                    backgroundColor: "white",
                    height: "1px",
                    border: "0"
                  }}
                />
                <h4 className="mb-4">
                  <i className="fab fa-github-square">
                    {" "}
                    your repositories from github
                  </i>
                </h4>
                {profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
