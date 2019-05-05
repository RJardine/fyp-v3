import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../redux/actions/profileAction";

const DashEducation = ({ education, deleteEducation }) => {
  // loop through education
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Current"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
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
            education list <i className="fas fa-graduation-cap" />
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
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{educations}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

DashEducation.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(DashEducation);
