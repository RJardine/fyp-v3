import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { degree, from, to, school, description, _id }
}) => {
  return (
    <div>
      {/* education */}
      <ul className="list-group">
        <li
          key={_id}
          className="list-group-item list-group-item-dark mb-2"
          style={{
            boxShadow:
              "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
            border: "solid 1px #1c1c1c"
          }}
        >
          <h4>{school}</h4>
          <p>
            {" "}
            <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
            {!to ? "Current" : <Moment format="DD/MM/YYYY">{to}</Moment>}{" "}
          </p>
          <p>
            {" "}
            <strong>Course :</strong> {degree}
          </p>
          <p>
            <strong>About:</strong> {description}
          </p>
        </li>
      </ul>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
