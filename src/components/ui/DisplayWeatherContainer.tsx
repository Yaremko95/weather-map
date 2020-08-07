import React from "react";
import DisplayCurrent from "./DisplayCurrent";
import { useData } from "../data/DataProvider";

function DisplayWeatherContainer() {
  const { loading } = useData();
  if (!loading) {
    return (
      <>
        <DisplayCurrent />
      </>
    );
  } else {
    return <div></div>;
  }
}

export default DisplayWeatherContainer;
