import React from "react";
import Map from "../components/Map";

const Park = (props) => {
  return (
    <div className="container">
      <h1 className="header center ">Parks</h1>
      <div className="container">
        <Map />
      </div>
    </div>
  );
};

export default Park;
