import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { profile } = props;

  const { title } = profile;
  return (
    <div className="row">
      <div className="col-md-12 p-0">
        <nav className="navbar navbar-light bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand text-white">Drug Tracking System</a>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {title}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link to="/moh" className="dropdown-item">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/moh/logout" className="dropdown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
