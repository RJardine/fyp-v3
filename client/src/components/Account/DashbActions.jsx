import React from "react";
import { Link } from "react-router-dom";

const DashbActions = () => {
  return (
    <div>
      {/* profile buttons */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div
              className="btn-group mb-4"
              role="group"
              style={{
                boxShadow:
                  "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                border: "solid 1px #1c1c1c"
              }}
            >
              {/* edit profile button */}
              <Link to="/edit-profile" className="btn btn-dark">
                <i className="fas fa-user-circle text-info mr-1">Profile</i>
              </Link>
              {/* edit education button */}
              <Link to="/add-education" className="btn btn-dark">
                <i className="fas fa-graduation-cap text-info mr-1">
                  Education
                </i>
              </Link>
              {/* edit experience button */}
              <Link to="/add-experience" className="btn btn-dark">
                <i className="fas fa-briefcase text-info mr-1">Experience</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbActions;
