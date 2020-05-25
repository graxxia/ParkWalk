import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";
import history from "../history";
import Navigation from "../components/Navigation";
import Parallax from "../components/Parallax";
import Feed from "../components/Feed";
import Parks from "./Parks";

import Contact from "./Contact";
import About from "./About";
import Loading from "../components/Loading";
import "materialize-css";
import LogoParkWalk from "../images/logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Park & Walk - Ottawa",
      parallaxTitle: "Ottawa",
      feeds: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:5000/parksOttawa";
    const response = await axios.get(url);
    return this.setState({ feeds: response.data });
  }

  render() {
    const { loading } = useAuth0;

    if (loading) {
      return <Loading />;
    }
    return (
      <React.StrictMode>
        <Router history={history}>
          <nav className="white" role="navigation">
            <Navigation />
          </nav>

          <div className="row center">
            <img
              src={LogoParkWalk}
              className="brand-logo black-text"
              width="300
                  px"
              alt="un lugar en Ottawa"
            ></img>
          </div>

          <Switch>
            <Route path="/parks" component={Parks} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.StrictMode>
                  {" "}
                  <Parallax title={this.state.parallaxTitle} />
                  <div className="container">
                    <div className="row center">
                      <h3>
                        {" "}
                        Find the ideal recreation place for you and your family
                      </h3>
                      <div className="icon light-green-text text-darken-3">
                        <i className="material-icons">filter_hdr</i>
                      </div>
                    </div>

                    <Feed feeds={this.state.feeds} />
                  </div>
                </React.StrictMode>
              )}
            />
            />
          </Switch>
          <div className="container">
            <div className="footer header center">
              <p>&copy; {this.state.name}</p>
            </div>
          </div>
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
