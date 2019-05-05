import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows
}) => {
  return (
    <div>
      {/* Form Input*/}
      <div className="form-group">
        <textarea
          className="form-control form-control"
          style={{ background: "#2e2f34", color: "white" }}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
        {error && <div className="invalid-feedback">{error} </div>}
        {info && <small className="form-text text-muted">{info}</small>}
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
