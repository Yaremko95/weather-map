import React, { useEffect, useRef, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import gsap, { TweenLite, Power3, TimelineLite } from "gsap";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Daily } from "../../../types/types";
import { useData } from "../../data/DataProvider";
import { Grid } from "@material-ui/core";
import { RiCelsiusLine } from "react-icons/ri";
import { AiFillCaretDown } from "react-icons/ai";
import MuiTableCell from "@material-ui/core/TableCell";
import SingleDay from "./SingleDay";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    visibility: "hidden",
  },
  container: {
    padding: "2rem",
    width: "70%",
    marginLeft: "auto",
    overflow: "hidden",
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "5px",
    color: "#ffffff",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
})(MuiTableCell);

export const formatDate = (dt: any) => {
  const a = new Date(dt * 1000);
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
  return (
    weekDays[a.getDay()] + ", " + months[a.getMonth()] + ", " + a.getDate()
  );
};
const WeekTable = () => {
  const classes = useStyles();
  const { daily } = useData();
  const [show, toggle] = useState(false);
  const [day, setDay] = useState(0);
  const handleClick = (index: number) => {
    setDay(index);
    toggle(true);
  };
  const rows: any[] = [];
  useEffect(() => {
    const tl = new TimelineLite({ paused: true });

    tl.staggerFrom(rows, 1.5, { autoAlpha: 0, x: 40 }, 0.1);
    tl.play();
  }, [show]);

  const tableRef = React.useRef(null);
  if (!show) {
    return (
      <div>
        <TableContainer className={classes.container}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>7-day Forecast</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {daily.map((row: Daily, index: number) => (
                <TableRow
                  className={classes.tableRow}
                  key={row.dt}
                  onClick={() => handleClick(index)}
                  {...({ ref: (li: any) => (rows[index] = li) } as any)}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(row.dt)}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      src={`http://openweathermap.org/img/w/${row.weather[0].icon}.png`}
                      style={{
                        height: "2rem",
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    {(row.temp.min - 273.15).toFixed(1)}/
                    {(row.temp.max - 273.15).toFixed(1)}
                    <RiCelsiusLine style={{ fontSize: "1rem" }} />
                  </TableCell>
                  <TableCell align="right">
                    {row.weather[0].description}
                  </TableCell>
                  <TableCell align="right">
                    <AiFillCaretDown />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <SingleDay weekDayIndex={day} toggle={toggle} />;
  }
};
export default WeekTable;
