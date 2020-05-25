import React from "react";
import Map from "../components/Map";

const Parks = (props) => {
  return (
    <div>
      <h1>Parks</h1>
      <Map />
      <div className="row" id="cardRow"></div>
    </div>
  );
};

export default Parks;
