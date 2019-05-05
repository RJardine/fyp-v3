import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../redux/actions/profileAction";
import Spinner from "../../common/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  // usefffect
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div>
      {/* repo */}
      {
        (repos = null ? (
          <Spinner />
        ) : (
          repos.map(repo => (
            <div
              key={repo.id}
              className="card card-body bg-dark text-white mb-3"
              style={{
                boxShadow:
                  "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
                border: "solid 1px #1c1c1c"
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <a
                      href={repo.html_url}
                      className="text-info"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    stars: {repo.stargazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                    watchers: {repo.watchers_count}
                  </span>
                  <span className="badge badge-success">
                    forks: {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          ))
        ))
      }
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
