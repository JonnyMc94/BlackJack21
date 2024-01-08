import React from "react";
import { createRoot } from "react-dom/client";
import About from "./About";
import Home from "./Home";
import Error404 from "./Error404";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Game" element={<App />} />
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);