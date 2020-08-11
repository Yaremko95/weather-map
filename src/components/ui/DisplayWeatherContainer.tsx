import React, { createRef, useEffect, useRef } from "react";
import DisplayCurrent from "./DisplayCurrent";
import { useData } from "../data/DataProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import LineChart from "./chart/LineChart";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "3rem",
  },
}));
function DisplayWeatherContainer() {
  const classes = useStyles();
  const currentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(currentRef.current, { opacity: 0, y: 50, delay: 1 });
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} lg={6}>
        <DisplayCurrent ref={currentRef} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <LineChart />
      </Grid>
    </Grid>
  );
}

export default DisplayWeatherContainer;
