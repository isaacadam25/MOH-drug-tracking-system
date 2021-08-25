import React from "react";
import { NavLink } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="list-group mt-2">
          <NavLink style={{ textDecoration: "none" }} to="/moh/dashboard">
            <li className="list-group-item active" aria-current="true">
              Dashboard
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/moh/trace">
            <li className="list-group-item" aria-current="true">
              Trace
            </li>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/moh/reports">
            <li className="list-group-item" aria-current="true">
              Reports
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
