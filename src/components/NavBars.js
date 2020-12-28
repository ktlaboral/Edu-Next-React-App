import React, {Component} from "react";
import NavBar from "./Navbar"

export default class NavBars extends Component {

  render() {
    return(
      <NavBar subscription={this.props.subscription} />
    )

  }
}
