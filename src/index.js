import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Home from "./Home";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.js";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
