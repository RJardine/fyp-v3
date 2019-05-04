import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  // option list mapping
  // const selectOptions = options.map(option => (
  //   <option key={option.label} value={option.value}>
  //     {option.label}
  //   </option>
  // ));
  return (
    <div>
      {/* Form Input*/}
      <div className="form-group">
        <select
          className="form-control form-control"
          style={{ background: "#2e2f34", color: "white" }}
          name={name}
          value={value}
          onChange={onChange}
        >
          {/* {selectOptions} */}
        </select>
        {error && <div className="invalid-feedback">{error} </div>}
        {info && <small className="form-text text-white">{info}</small>}
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,

  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
