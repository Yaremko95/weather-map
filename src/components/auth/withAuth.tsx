import React, { useEffect } from "react";
import DataProvider, { useData } from "../data/DataProvider";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import Login from "./Login";
import authAxios from "./authAxios";

function withAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [user, setUser] = React.useState(false);
    React.useEffect(() => {
      // let mounted = true;
      // authAxios.get("/users/me", { withCredentials: true }).then((res) => {
      //   console.log(res);
      //   if (mounted) {
      //     setUser(true);
      //   }
      // });
      //
      // return () => {
      //   mounted = false;
      // };
      setUser(true);
    }, []);
    return user ? (
      <DataProvider>
        <Component {...props} />
      </DataProvider>
    ) : (
      <Redirect to={"/login"} />
    );
  };
}

export default withAuth;
