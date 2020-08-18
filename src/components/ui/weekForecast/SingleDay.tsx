import React from "react";
import { Daily } from "../../../types/types";
function SingleDay(props: { weekDay: Daily | undefined }) {
  const { weekDay } = props;
  return <div>{weekDay && weekDay.weather[0].description}</div>;
}

export default SingleDay;
