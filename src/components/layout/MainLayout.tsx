import React from "react";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";

function MainLayout(props: { children: any } & RouteComponentProps) {
  const useStyles = createUseStyles({
    wrapper: {
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
    },
    container: {
      backgroundImage:
        " linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {React.cloneElement(props.children)}
      </div>
    </div>
  );
}

export default MainLayout;
