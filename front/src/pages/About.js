import React from "react";
import "../css/style.css";
import "materialize-css";

const About = (props) => {
  return (
    <div className="container">
      <h1 className="header center ">About</h1>
      <div className="row center">
        The Park & Walk app will help you easily discover and access the parkss
        in Ottawa area. Most people don’t know how much public parks and
        recreation centers actually have to offer. Park & Walk will guide you to
        a place to walk, jog, run, let your dog of leash, bird watch and so much
        more! This app is completely free and by downloading this app and
        visiting your local parks, you are supporting the role parks and
        recreation plays in creating healthy and sustainable communities for all
        people.{" "}
      </div>

      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <div className="icon">
              <h2 className="center grey-text text-lighten-1">
                <i className="material-icons md-25">filter_hdr</i>
              </h2>
              <h5 className="center">Parks</h5>

              <p className="light">
                The City operates and maintains roughly 4,300 hectares of
                parkland at over 1,300 sites, including 2,000 play structure
                components. Are you holding a special event or family reunion?
                The City’s parks are a great outdoor alternative to being
                inside. Parks are open daily from 6 am to 11 pm, unless
                otherwise posted. People in a park while it is closed may be
                subject to a fine.
              </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon">
              <h2 className="center grey-text text-lighten-1">
                <i className="material-icons md-25">pin_drop</i>
              </h2>
              <h5 className="center">Park locations</h5>

              <p className="light">
                The interactive map and table below display the locations of the
                City's parks. The number of parks listed in the table will
                expand or contract as you zoom in, zoom out or pan the map view.
                You can navigate to an area of interest by searching for a park
                name, address, intersection or City facility in the “Find
                address or place” search box. Click on a park for more
                information about that location. Park information is also
                available in the City’s Open Data Catalogue.
              </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon">
              <h2 className="center grey-text text-lighten-1">
                <i className="material-icons md-25">nature_people</i>
              </h2>
              <h5 className="center">Parks Projects</h5>

              <p className="light">
                Parks in consultation and development. The City of Ottawa wants
                input from you on the design of new parks! Find all new park
                projects on our Public Engagement Project search tool and
                provide comments on designs currently being reviewed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
