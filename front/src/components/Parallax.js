import React, { Component } from "react";
import MainImage from "../images/img1.jpg";
import SecondImage from "../images/img3.jpg";
import M from "materialize-css";

class Parallax extends Component {
  componentDidMount() {
    M.Parallax.init(this.Parallax1);
    M.Parallax.init(this.Parallax2);
  }

  render() {
    return (
      <body>
        <div className="parallax-container ">
          <div
            ref={(Parallax) => {
              this.Parallax1 = Parallax;
            }}
            className="parallax"
          >
            <img src={MainImage} alt="es un lugar en Ottawa" />
          </div>
        </div>
        <div className="container">
          <div className="row container">
            <h2 className="header header center ">{this.props.title}</h2>
            <p className="grey-text text-darken-3 lighten-3">
              The City's parks are a great outdoor alternative to being inside.
              Parks are open faily from 6 am to 11pm, unless otherwise posted.
            </p>
            <div className="row center">
              <a
                href="/parks"
                id="download-button"
                className="btn-large waves-effect waves-light light-green darken-3"
              >
                Find your Path
              </a>
            </div>
          </div>
        </div>
        <div className="parallax-container ">
          <div
            ref={(Parallax) => {
              this.Parallax2 = Parallax;
            }}
            className="parallax"
          >
            <img src={SecondImage} alt="Trees in Ottawa near the river" />
          </div>
        </div>
      </body>
    );
  }
}

export default Parallax;
