import React, { Component } from "react";
import Header from "./Header.js";
import images from "./assets/honor_diamond.png";
import { Link } from "react-router-dom";
import './styles.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        
        <div className="home-image">
          <img src={images} className="card-image" alt="Four cards fanned"></img>
        </div>
        <div className="">
          <button className="play-button btn btn-dark btn-circle btn-xl">
            <Link
              to="/Game"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <h1> Play BlackJack21</h1>
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
export default Home;