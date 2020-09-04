import React, { useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import NavBar from "../ui/NavBar/NavBar";
import DisplayWeatherContainer from "../ui/DisplayWeatherContainer";
import { useData } from "../data/DataProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import withAuth from "../auth/withAuth";
const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
  },
  spinner: {
    color: "white",
    marginTop: "20%",
  },
}));
function Home(props: RouteComponentProps) {
  const classes = useStyles();
  const { loading, query } = useData();
  return (
    <Grid container>
      <NavBar />
      {!loading ? (
        <DisplayWeatherContainer />
      ) : (
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          className={classes.main}
        >
          <CircularProgress className={classes.spinner} />
        </Grid>
      )}
    </Grid>
  );
}

export default withAuth(Home);
