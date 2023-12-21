import React, { Component } from "react";
// import reference to Header file containing navigation bar
import Header from "./Header.js";
// import reference to homepage image from Images folder
import images from "./Images/aces.png";
// import Link feature from react-router-dom package, allows link to "/Game" page
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        <div className="play-button">
          <button className="btn btn-dark btn-circle btn-xl">
            <Link
              to="/Game"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <h1> Play BlackJack</h1>
            </Link>
          </button>
        </div>
        <div className="Home-image">
          <img className="card-img" src={images} alt="Four cards fanned"></img>
        </div>
      </div>
    );
  }
}
export default Home;