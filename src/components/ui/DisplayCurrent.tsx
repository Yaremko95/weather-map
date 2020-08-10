import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useData } from "../data/DataProvider";
import { RiCelsiusLine } from "react-icons/ri";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import gsap, { TweenLite, Power2, TimelineMax, Sine } from "gsap";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
    marginLeft: "1rem",
    padding: "2rem",
    color: "whitesmoke",
  },
  title: {
    fontSize: "1rem",

    fontWeight: theme.typography.fontWeightMedium,
  },
  city: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "3rem",
  },
  temp: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "3rem",
    display: "flex",
    marginLeft: "auto",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));
const DisplayCurrent = React.forwardRef(
  (props, ref?: React.Ref<HTMLDivElement>) => {
    const classes = useStyles();
    const { current, timezone, query, loading, hourly } = useData();
    const [convertedDate, convert] = useState("");
    const iconRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
      const a = new Date(current.dt * 1000);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const day = weekDays[a.getDay()];

      convert(
        day + ", " + date + " " + month + " " + year + " " + hour + ":" + min
      );
      const tl = new TimelineMax({ repeat: -1 });

      tl.to(
        // @ts-ignore
        iconRef.current,
        2,
        { y: "-=10", ease: Sine.easeInOut }
      ).to(iconRef.current, 1.5, { y: "+=10", ease: Sine.easeInOut });
    }, [current]);
    console.log(hourly);
    return (
      <div ref={ref}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6} container direction={"column"}>
              <span className={classes.title}>{convertedDate}</span>
              <span className={classes.city}>{query.toUpperCase()}</span>
            </Grid>
            <Grid item xs={6} className={classes.temp}>
              <span>
                {(current.temp - 273.15).toFixed(1)} <RiCelsiusLine />
              </span>
              <img
                src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
                style={{
                  height: "5rem",
                  // marginLeft: "1rem",
                  // marginTop: "1rem",
                }}
                ref={iconRef}
              />
            </Grid>
            <Grid item xs={3} className={classes.temp}></Grid>
          </Grid>

          <div>
            <span>{query.toUpperCase()}</span>
            <span>{convertedDate}</span>
            <span>{current.weather[0].description}</span>

            <img
              src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
            />
            <span>
              {(current.temp - 273.15).toFixed(1)} <RiCelsiusLine />
            </span>

            <div>
              {current.rain && <span>Rain: </span>}
              <span>Humidity: {current.humidity}%</span>
              <span>Wind: {current.wind_speed}m/c</span>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
);

export default DisplayCurrent;
