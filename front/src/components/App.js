import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";
import history from "../history";
import Navigation from "./Navigation";
import Parallax from "./Parallax";
import Feed from "./Feed";
import Contact from "./Contact";
import About from "./About";
import Loading from "./Loading";
import "materialize-css";
import LogoParkWalk from "../components/logo.svg";

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
    const url = "http://localhost:5000/parks";
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
          <body class="grey-text text-darken-2">
            <nav class="white" role="navigation">
              <Navigation />
            </nav>
            <div class="container">
              <div class="row center">
                <img
                  src={LogoParkWalk}
                  class="brand-logo black-text"
                  width="300
                  px"
                  alt="un lugar en Ottawa"
                ></img>
              </div>

              <Parallax title={this.state.parallaxTitle} />
              <Switch>
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
                <Route
                  exact
                  path="/"
                  render={(props) => <Feed feeds={this.state.feeds} />}
                />
              </Switch>

              <div class="footer">
                <p>&copy; {this.state.name}</p>
              </div>
            </div>
          </body>
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
