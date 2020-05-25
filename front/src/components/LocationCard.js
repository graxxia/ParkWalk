import React, { Component } from "react";
import "materialize-css";

class LocationCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }
  render() {
    return (
      <div className="row" onClick={this.handleClick}>
        <div className="col s12 m7">
          <div className="card">
            <div className="card-content">
              <p>{this.props.name}</p>
              <br />
              <p>{this.props.PARK_TYPE}</p>
              <br />
              <p>{this.props.distance}</p>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationCard;
