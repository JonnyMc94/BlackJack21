import React, { Component } from "react";
import Header from "./Header.js";
import images from "./assets/aces.png";
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
              <h1> Play BlackJack21</h1>
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