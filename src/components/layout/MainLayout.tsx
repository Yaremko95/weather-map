import React from "react";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";

function MainLayout(props: { children: any } & RouteComponentProps) {
  const useStyles = createUseStyles({
    wrapper: {
      width: "100%",
      height: "100vh",

      position: "relative",
    },
    container: {
      backgroundImage:
        " linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) ",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      minHeight: "100%",
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
