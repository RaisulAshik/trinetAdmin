import React, { Component } from "react";
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./helperFunctions";

import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) =>
                !loggedIn ? <Login {...props} /> : <Redirect to={"/"} />
              }
            />

            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) =>
                !loggedIn ? <Register {...props} /> : <Redirect to={"/"} />
              }
            />

            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) =>
                loggedIn ? <Page404 {...props} /> : <Redirect to={"/login"} />
              }
            />

            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) =>
                loggedIn ? <Page500 {...props} /> : <Redirect to={"/login"} />
              }
            />

            <Route
              path="/"
              name="Home"
              render={(props) =>
                loggedIn ? <TheLayout {...props} /> : <Redirect to={"/login"} />
              }
            />

            {/* <Route
              name="Page 404"
              render={(props) =>
                loggedIn ? <Page404 {...props} /> : <Redirect to={"/login"} />
              }
            /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  const loggedIn = state.loggedIn;

  return { loggedIn };
}

export default connect(mapStateToProps)(App);
