import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div>
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
              {/* image */}
              <div className="row">
                <div className="col-4 col-md-3 ml-2 m-auto">
                  <img
                    src={avatar}
                    alt=""
                    title="Personal Images not yet available"
                  />
                </div>
              </div>
              {/* name and other details */}
              <div className="text-center">
                <h2 className="display-4 ">{name}</h2>
                <p className="lead text-center ">
                  {" "}
                  <i className="fas fa-building">
                    {" "}
                    {status} at {company && <span>{company}</span>}
                  </i>
                </p>
                <p>
                  <i className="fas fa-home">
                    {" "}
                    {location && <span>{location}</span>}
                  </i>
                </p>
                <h3>
                  {social.facebook && (
                    <Link
                      to={social.facebook}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-facebook"
                        style={{ color: "#3b5998" }}
                      />
                    </Link>
                  )}
                  {/* isempty check */}
                  {/* isempty twitter */}
                  {social.twitter && (
                    <Link
                      to={social.twitter}
                      className="text-white p-2"
                      target="_blank"
                    >
                      <i
                        className="fab fa-twitter"
                        style={{ color: "#1b95e0" }}
                      />
                    </Link>
                  )}
                  {/* isempty insta */}
                  {social.instagram && (
                    <Link
                      to={social.instagram}
                      className="text-white p-2"
                      target="_blank"
                    >
                      <i
                        className="fab fa-instagram"
                        style={{ color: "#a41196" }}
                      />
                    </Link>
                  )}
                  {/* isempty linkedin */}
                  {social.linkedin && (
                    <Link
                      to={social.linkedin}
                      className="text-white p-2"
                      target="_blank"
                    >
                      <i
                        className="fab fa-linkedin"
                        style={{ color: "#005de1" }}
                      />
                    </Link>
                  )}
                  {/* isempty website */}
                  {website && (
                    <Link
                      to={website}
                      className="text-white p-2"
                      target="_blank"
                    >
                      <i className="fas fa-link" />
                    </Link>
                  )}
                  {/* isempty youtube */}
                  {social.youtube && (
                    <Link
                      to={social.youtube}
                      className="text-white p-2"
                      target="_blank"
                    >
                      <i
                        className="fab fa-youtube"
                        style={{ color: "#d32323" }}
                      />
                    </Link>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
