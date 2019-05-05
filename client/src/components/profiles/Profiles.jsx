import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { getProfiles } from "../../redux/actions/profileAction";
import ProfilesItem from "./ProfilesItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  // get profiles
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Spinner />
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-md-12">
              {/* title */}
              <h2 className="display-4 text-center">Developer Profiles</h2>
              <p className="lead text-center">
                Check out other Users and connect with them
              </p>
            </div>
            <hr />
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfilesItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
