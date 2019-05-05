import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import DashbActions from "./DashbActions";
import {
  getCurrentProfle,
  deleteAccount
} from "../../redux/actions/profileAction";
import DashExperience from "./DashExperience";
import DashEducation from "./DashEducation";

const Dashboard = ({
  getCurrentProfle,
  deleteAccount,
  auth: { user },
  history,
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
                <DashExperience experience={profile.experience} />
                <DashEducation education={profile.education} />
                {/* profile delete button */}
                <button
                  className=" btn btn-danger btn-lg"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete My Account
                </button>
                {/* modal */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  style={{ color: "black", backgroundColor: "#2e2f34" }}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Are you Sure?
                        </h5>
                      </div>
                      <div className="modal-body text-danger">
                        WARNING! This cannot be undone
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            deleteAccount();
                            history.go(0);
                          }}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfle, deleteAccount }
)(Dashboard);
