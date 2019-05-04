import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import DashbActions from "./DashbActions";
import { getCurrentProfle } from "../../redux/actions/profileAction";

const Dashboard = ({
  getCurrentProfle,
  auth: { user },
  profile: { profile, loading }
}) => {
  // use EFFECT
  useEffect(() => {
    getCurrentProfle();
  }, []);
  //
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="display-5">Profile for {user && user.name}</h3>
            <hr />
            {profile !== null ? (
              <Fragment>
                <DashbActions />
              </Fragment>
            ) : (
              <Fragment>
                <p className="lead">
                  Thank you for signing up, please continue to setting up your
                  profile:
                </p>
                <Link to="/create-profile" className="btn btn-lg btn-primary">
                  complete profile
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfle }
)(Dashboard);
