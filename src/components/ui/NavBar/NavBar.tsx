import React, { RefObject, useEffect, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography, { TypographyTypeMap } from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import gsap from "gsap";
import { useData } from "../../data/DataProvider";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white",
    padding: "1rem 1rem",
    overflow: "hidden",
  },
  paper: {
    backgroundColor: "transparent",
    color: "whitesmoke",
    padding: "1rem 0",
  },

  title: {
    flexGrow: 1,
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "48ch",
      },
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const titleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(paperRef.current, 1, { y: -100, opacity: 0 });
    tl.from(titleRef.current, 1.5, {
      height: 0,
      opacity: 0,
      display: "none",
      delay: -1,
    });
    tl.from(searchRef.current, {
      display: "none",
      delay: -1.5,
    });
    tl.from(searchRef.current, 1.5, {
      opacity: 0,
      width: 0,
      delay: -1.5,
    });
  }, []);
  const { query, setQuery, fetchData, toggleLoading } = useData();
  const handleChange = (value: string) => {
    toggleLoading(true);
    setQuery(value);
  };
  return (
    <div className={classes.root} ref={paperRef}>
      <Paper elevation={3} className={classes.paper}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <div ref={titleRef}>
              <img
                src={
                  "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
                }
                style={{ height: "3rem" }}
              />
            </div>
          </Typography>

          <div className={classes.search} ref={searchRef}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={query}
              onChange={(e) => handleChange(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchData(query)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </Paper>
    </div>
  );
};

export default NavBar;
