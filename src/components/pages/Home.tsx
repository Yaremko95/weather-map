import React, { useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import NavBar from "../NavBar/NavBar";

function Home(props: RouteComponentProps) {
  return (
    <Grid container>
      <NavBar />
    </Grid>
  );
}

export default Home;
