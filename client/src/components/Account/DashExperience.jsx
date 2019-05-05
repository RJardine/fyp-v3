import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/actions/profileAction";
import { connect } from "react-redux";

const DashExperience = ({ experience, deleteExperience }) => {
  // loop through experience
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Current"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>{" "}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <h4 className="mb-4">
            work experience list <i className="fas fa-building" />
          </h4>
          <table
            className="table table-dark table-hover"
            style={{
              boxShadow:
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
              border: "solid 1px #1c1c1c"
            }}
          >
            <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

DashExperience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(DashExperience);
