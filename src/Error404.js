import React, { Component } from "react";
// import reference to Header file containing navigation bar
import Header from "./Header.js";
import error from "./Images/404-error-page.png";
import { Link } from "react-router-dom";

class Error404 extends Component {
  render() {
    return (
      <div className="Error404">
        <Header />
        <div>
          <img className="card-img" src={error} alt="error"></img>
        </div>
        <div className="homeButton">
          <div className="hButton">
            <button className="btn btn-light btn-circle btn-xl">
              <Link
                to="/"
                style={{ color: "inherit", textDecoration: "inheirit" }}
              >
                RETURN TO HOME
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Error404;