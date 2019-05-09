import React from "react";

export default function NotFound() {
  return (
    <div>
      <h1 className="display-4">
        {" "}
        <span className="text-danger"> 404</span> Page Not Found{" "}
        <i className="fas fa-frown" />
      </h1>
      <p className="lead">Sorry, Page doesnt exist</p>
    </div>
  );
}
