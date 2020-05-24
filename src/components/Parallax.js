import React from "react";
import MainImage from "../components/images/img1.jpg";

const Parallax = (props) => {
  return (
    <div class="container">
      <h1>{props.title}</h1>
      <p>
        The City’s parks are a great outdoor alternative to being inside. Parks
        are open daily from 6 am to 11 pm, unless otherwise posted.
      </p>

      <img src={MainImage} alt=" un lugar en Ottawa"></img>
    </div>
  );
};

export default Parallax;
