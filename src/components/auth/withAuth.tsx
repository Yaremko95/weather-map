import React, { useEffect } from "react";
import { useData } from "../data/DataProvider";
import Login from "./Login";

function withAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const { user } = useData();
    return user ? <Component {...props} /> : <Login />;
  };
}

export default withAuth;
