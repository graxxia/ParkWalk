import React, { Component } from "react";
import MainImage from "../components/images/img1.jpg";
import SecondImage from "../components/images/img2.jpg";
import M from "materialize-css";

class Parallax extends Component {
  componentDidMount() {
    M.Parallax.init(this.Parallax1);
    M.Parallax.init(this.Parallax2);
  }

  render() {
    return (
      <div className="addBottom">
        <div className="parallax-container">
          <div
            ref={(Parallax) => {
              this.Parallax1 = Parallax;
            }}
            className="parallax"
          >
            <img src={MainImage} alt="es un lugar en Ottawa" />
          </div>
        </div>
        <div className="section white">
          <div className="row container">
            <h2 className="header">{this.props.title}</h2>
            <p className="grey-text text-darken-3 lighten-3">
              The City's parks are a great outdoor alternative to being inside.
              Parks are open faily from 6 am to 11pm, unless otherwise posted.
            </p>
          </div>
        </div>
        <div
          ref={(Parallax) => {
            this.Parallax2 = Parallax;
          }}
          className="parallax-container"
        >
          <div className="parallax">
            <img src={SecondImage} alt="Trees in Ottawa near the river" />
          </div>
        </div>
      </div>
    );
  }
}

export default Parallax;
