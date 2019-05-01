import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType} text-center`}
      role="alert"
    >
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// mapstateto props
const mapSateToProps = state => ({
  alerts: state.alert
});

export default connect(mapSateToProps)(Alert);
