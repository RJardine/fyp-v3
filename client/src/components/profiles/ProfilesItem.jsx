import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfilesItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div>
      {/* card profile */}
      <div className="container">
        <div className="row">
          <div
            className="card card-body bg-dark cstmCI cstmCI2"
            style={{
              boxShadow:
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
              border: "solid 1px #1c1c1c"
            }}
          >
            <div className="row">
              {/* image */}
              <div className=" m-3">
                <img className="" src={avatar} width="120px" alt="" />
              </div>
              {/* user basic info */}
              <div className="pt-2 pl-2">
                <h3>{name}</h3>
                <p>status: {status}</p>
                <p> {company && <span> at {company}</span>}</p>
                <p>{location && <span> at {location}</span>}</p>
                <Link
                  to={`/profile/${_id}`}
                  className="btn btn-primary btn-block"
                >
                  view profile
                </Link>
              </div>
              {/* skills */}
              <div className="col-md-12">
                <h4>
                  {" "}
                  <i className="fas fa-laptop-code" /> skills
                </h4>
                <hr
                  style={{
                    backgroundColor: "white",
                    height: "1px",
                    border: "0"
                  }}
                />
                <ul className="list-inline">
                  {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="list-inline-item">
                      <i className="fas fa-code"> {skill}</i>
                    </li>
                  ))}
                  <hr
                    style={{
                      backgroundColor: "white",
                      height: "1px",
                      border: "0"
                    }}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfilesItem;
