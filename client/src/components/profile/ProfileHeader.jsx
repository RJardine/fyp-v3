import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../common/is-empty";

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
                    {status && <span>{status}</span>} at{" "}
                    {company && <span>{company}</span>}
                  </i>
                </p>
                <p>
                  <i className="fas fa-home">
                    {" "}
                    {location && <span>{location}</span>}
                  </i>
                </p>
                <h3>
                  {isEmpty(social && social.facebook) ? null : (
                    <a
                      href={social.facebook}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <i
                        className="fab fa-facebook"
                        style={{ color: "#3b5998" }}
                      />
                    </a>
                  )}
                  {/* isempty check */}
                  {/* isempty twitter */}
                  {isEmpty(social && social.twitter) ? null : (
                    <a
                      href={social.twitter}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-twitter"
                        style={{ color: "#1b95e0" }}
                      />
                    </a>
                  )}
                  {/* isempty insta */}
                  {isEmpty(social && social.instagram) ? null : (
                    <a
                      href={social.instagram}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-instagram"
                        style={{ color: "#a41196" }}
                      />
                    </a>
                  )}
                  {/* isempty linkedin */}
                  {isEmpty(social && social.linkedin) ? null : (
                    <a
                      href={social.linkedin}
                      className="text-white p-2"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i
                        className="fab fa-linkedin"
                        style={{ color: "#005de1" }}
                      />
                    </a>
                  )}
                  {/* isempty website */}
                  {website ? null : (
                    <a
                      href={website}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-link" />
                    </a>
                  )}
                  {/* isempty youtube */}
                  {isEmpty(social && social.youtube) ? null : (
                    <a
                      href={social.youtube}
                      className="text-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-youtube"
                        style={{ color: "#d32323" }}
                      />
                    </a>
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
