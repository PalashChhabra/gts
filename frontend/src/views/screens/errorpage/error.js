import React from "react";
// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Link } from "react-router-dom";

const ErrorPage = (props) => {
  return (
    <>
      <div className="notfounddiv">
        <div className="notfound">
          <div className="notfound-404"></div>
          <h1>Authentication Error</h1>
          <h2>Oops! Your Session has Expired.</h2>
          <p>
            Sorry but your session is no longer active! Please Login again to
            continue.
          </p>
          <Link
            to="/login"
            className="btn-neutral btn-icon ml-1 btn btn-default"
            color="default"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
