import { useData } from "../../data/DataProvider";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";
import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";

const Paper = withStyles({
  root: {
    backgroundColor: "transparent",
    color: "whitesmoke",
    cursor: "pointer",
    padding: "2rem",
  },
})(MuiPaper);
const useStyles = makeStyles((theme) => ({
  tempSection: {
    display: "flex",
    alignItems: "center",
    color: "whitesmoke",
  },
  tempDescription: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2rem",
  },
  tempMain: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  table: {
    margin: "2rem 0",
  },
}));
const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "5px",
    color: "#ffffff",
  },
})(MuiTableCell);
function TabPanel(props: { value: number; index: number }) {
  const classes = useStyles();
  const { value, index } = props;
  const { daily } = useData();
  const [day, setDay] = useState(daily[value]);
  useEffect(() => {
    setDay(daily[value]);
  }, [value]);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && (
        <Paper>
          <Grid container>
            <Grid item xs={12} className={classes.tempSection}>
              <img
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                style={{
                  height: "5rem",
                  // marginLeft: "1rem",
                  // marginTop: "1rem",
                }}
              />
              <div className={classes.tempDescription}>
                <span className={classes.tempMain}>
                  {day.weather[0].main}. {day.weather[0].description}
                </span>
                <span>
                  The high will be {(day.temp.max - 273.15).toFixed(1)}°C, the
                  low will be
                  {(day.temp.min - 273.15).toFixed(1)}°C.
                </span>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.table}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Morning</TableCell>
                      <TableCell align="right">Afternoon</TableCell>
                      <TableCell align="right">Evening</TableCell>
                      <TableCell align="right">Night</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ color: "rgb(255,255,255,.7)" }}
                      >
                        TEMPERATURE
                      </TableCell>
                      <TableCell align="right">
                        {(day.temp.morn - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.temp.day - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.temp.eve - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.temp.night - 273.15).toFixed(1)}°C
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ color: "rgb(255,255,255,.7)" }}
                      >
                        FEELS lIKE
                      </TableCell>
                      <TableCell align="right">
                        {(day.feels_like.morn - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.feels_like.day - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.feels_like.eve - 273.15).toFixed(1)}°C
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(day.feels_like.night - 273.15).toFixed(1)}°C
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
export default TabPanel;
