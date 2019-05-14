import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../redux/actions/authAction";

const Navbar = ({ auth: { isAuthenticated, loading }, logOut }) => {
  // if user is authenticated links
  const authenticatedLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/profiles" className="nav-link">
          <i className="fas fa-users" /> <span className="hide-sm">Users</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/posts" className="nav-link">
          <i className="fas fa-comments" />{" "}
          <span className="hide-sm">Feed</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          <i className="fas fa-user" />
          <span className="hide-sm"> Account</span>
        </Link>
      </li>
      <li className="nav-item">
        <a href="#!" onClick={logOut} className="nav-link">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"> Log Out </span>
        </a>
      </li>
    </ul>
  );

  // if user is not authenticated links
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/profiles" className="nav-link">
          <i className="fas fa-users" /> Developers
        </Link>
      </li>
      {/* auth */}
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <i className="fas fa-sign-in-alt" /> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          <i className="fas fa-user-plus" /> Register
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark mb-4"
        style={{
          boxShadow:
            "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
        }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-home" /> Home
          </Link>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
            className="navbar-toggler"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            {!loading && (
              <Fragment>
                {" "}
                {isAuthenticated ? authenticatedLinks : guestLinks}{" "}
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

// proptype
Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
