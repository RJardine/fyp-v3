import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div
            className="card card-body bg-dark text-white mb-3"
            style={{
              boxShadow:
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
              border: "solid 1px #1c1c1c"
            }}
          >
            <h5 className="text-center text-white bg-dark mb-3">
              {" "}
              About {name.trim().split(" ")[0]}{" "}
              <i className="fas fa-user-circle"> </i>
            </h5>
            {/* bio  isempty show or not*/}
            {bio && (
              <Fragment>
                <p className="lead">
                  <span>{bio}</span>
                </p>
              </Fragment>
            )}
            <hr />
            <h3 className="text-center text-white">skills</h3>
            <div className="row">
              <div className=" text-center d-flex flex-wrap justify-content-center align-items-center">
                {" "}
                {skills.map((skill, index) => (
                  <div key={index} className="p-3">
                    <i className="fas fa-code" /> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
