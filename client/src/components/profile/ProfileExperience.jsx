import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, from, to, title, location, description, _id }
}) => {
  return (
    <div>
      {/* experience */}
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
          <h4>{company}</h4>
          <p>
            <strong>Period :</strong>{" "}
            <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
            {!to ? "Current" : <Moment format="DD/MM/YYYY">{to}</Moment>}{" "}
          </p>
          <p>
            <strong> Role: </strong>
            {title}
          </p>
          <p>
            <strong> Location: </strong>
            {location}
          </p>
          <p>
            <strong>About:</strong> {description}
          </p>
        </li>
      </ul>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileExperience;
