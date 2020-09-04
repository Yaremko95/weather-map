import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  createRef,
} from "react";
import { Daily } from "../../../types/types";
import { formatDate } from "../../data/DataProvider";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import { useData } from "../../data/DataProvider";
import MuiTab from "@material-ui/core/Tab";
import MuiTabs from "@material-ui/core/Tabs";
import TabPanel from "./TabPanel";
import { TimelineLite } from "gsap";
import TableRow from "@material-ui/core/TableRow";

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem",
    width: "80%",
    marginLeft: "auto",
    backgroundColor: "transparent",
  },
  appBar: {
    visibility: "hidden",
    backgroundColor: "rgba(255, 255, 255, .1)",
    color: "whitesmoke",
    borderRadius: theme.shape.borderRadius,
  },
}));
const Tab = withStyles({
  root: {
    visibility: "hidden",
    color: "whitesmoke",
    cursor: "pointer",
  },
})(MuiTab);
const Tabs = withStyles({
  indicator: {
    backgroundColor: "#C26248",
  },
})(MuiTabs);

export default function SingleDay(props: {
  weekDayIndex: number;
  toggle: Dispatch<SetStateAction<boolean>>;
}) {
  const classes = useStyles();
  const { weekDayIndex, toggle } = props;
  const { daily } = useData();
  const [value, setValue] = React.useState(weekDayIndex);

  const handleChange = (event: object, newValue: any) => {
    if (value !== newValue) setValue(newValue);
    else toggle(false);
  };
  let tabsRef: any = null;

  const tabs: any[] = [];

  useEffect(() => {
    const tl = new TimelineLite({ paused: true });
    tl.from(tabsRef, 0.5, { opacity: 0, autoAlpha: 0 }).staggerFrom(
      tabs,
      0.5,
      { autoAlpha: 0, y: 40, delay: -0.2 },
      0.1
    );

    tl.play();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.appBar}
        {...({ ref: (e: any) => (tabsRef = e) } as any)}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {daily.map((day: Daily, index: number) => (
            <Tab
              {...({ ref: (e: any) => (tabs[index] = e) } as any)}
              label={
                formatDate(day.dt).day +
                ", " +
                formatDate(day.dt).month +
                " " +
                formatDate(day.dt).date
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {daily.map((day: Daily, index: number) => (
        <TabPanel value={value} index={index} />
      ))}
    </div>
  );
}
