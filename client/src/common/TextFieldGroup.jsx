import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      {/* Form Input*/}
      <div className="form-group">
        <label htmlFor="email">{label}</label>
        <input
          type={type}
          className={classnames("form-control form-control-sm", {
            "is-invalid": error
          })}
          style={{ background: "#2e2f34", color: "white" }}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required
        />
        {error && <div className="invalid-feedback">{error} </div>}
        {info && <small className="form-text text-white">{info}</small>}
      </div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
