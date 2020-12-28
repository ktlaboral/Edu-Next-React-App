import React, { Component } from "react";
import { Link } from "react-router-dom";

import Edunext from "../img/edunext.png";

export default class NavBar extends Component {
  render() {
    let subscription = this.props.subscription;

    return (
      <div className="nav-container">
        <nav className="container d-flex align-items-center justify-content-around">
          <div className="image-container col-6 d-flex justify-content-start">
            <Link className="navbar-brand" to="/">
              {" "}
              <img src={Edunext} alt="" />{" "}
            </Link>
          </div>

          <div className="nav-item col-6 d-flex justify-content-end">
            <h6>
              {" "}
              Subscription:
              <span className={subscription}>{subscription}</span>
            </h6>
          </div>
        </nav>
      </div>
    );
  }
}
