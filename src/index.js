import React from "react";
import ReactDOM from "react-dom";
// import reference to the About page
import About from "./About";
// import reference to the Home page
import Home from "./Home";
// import reference to the Error404 page not found page, used to indicate the user has reached an undefined page of the application
import Error404 from "./Error404";
import "bootstrap/dist/css/bootstrap.css";
// import necessary features from react-router-dom package to allow for page routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import reference to app file
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Switch is used to render each route exclusively, once a route has been found Switch will stop looking for matches and render the first route it matches */}
      <Routes>
        <Route path="/Game" exact component={App} />
        <Route path="/About" exact component={About} />
        <Route path="/" exact component={Home} />
        <Route path="" component={Error404} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);