import React, { createRef, useEffect, useRef } from "react";
import DisplayCurrent from "./DisplayCurrent";
import { useData } from "../data/DataProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import LineChart from "./chart/LineChart";
import WeekTable from "./weekForecast/WeekTable";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "3rem",
    overflow: "hidden",
  },
}));
function DisplayWeatherContainer() {
  const classes = useStyles();
  const currentRef = createRef<HTMLDivElement>();
  const chartRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(currentRef.current, 1.5, {
      opacity: 0,
      y: 50,
    }).from(chartRef.current, { opacity: 0, y: 50, delay: -1.5 });
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} lg={6}>
        <DisplayCurrent ref={currentRef} />
        <LineChart ref={chartRef} />
      </Grid>
      <Grid item xs={12} lg={6}>
        {/*<span>7-day Forecast</span>*/}
        <WeekTable />
      </Grid>
    </Grid>
  );
}

export default DisplayWeatherContainer;
