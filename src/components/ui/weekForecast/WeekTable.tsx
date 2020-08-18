import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

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
  container: {
    padding: "2rem",
    width: "70%",
    marginLeft: "auto",
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

const formatDate = (dt: any) => {
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
  const [day, setDay] = useState<Daily | undefined>(undefined);
  const handleClick = (index: number) => {
    setDay(daily[index]);
    toggle(true);
  };

  if (!show) {
    return (
      <TableContainer className={classes.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>7-day Forecast</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daily.map((row: Daily, index: number) => (
              <TableRow key={row.dt} onClick={() => handleClick(index)}>
                <TableCell component="th" scope="row">
                  {formatDate(row.dt)}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={`http://openweathermap.org/img/w/${row.weather[0].icon}.png`}
                    style={{
                      height: "2rem",
                      // marginLeft: "1rem",
                      // marginTop: "1rem",
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
    );
  } else {
    return <SingleDay weekDay={day} />;
  }
};
export default WeekTable;
