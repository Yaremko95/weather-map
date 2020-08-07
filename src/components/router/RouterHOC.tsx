import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "./routes";
import DataProvider from "../data/DataProvider";

function RouterHoc() {
  return (
    <DataProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Router>
    </DataProvider>
  );
}

export default RouterHoc;
