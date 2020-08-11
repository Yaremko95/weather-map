import React, { useEffect, useState } from "react";
import { Current } from "../../../types/types";
import { Line } from "react-chartjs-2";
import { useData } from "../../data/DataProvider";
import "chartjs-plugin-datalabels";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
    marginLeft: "1rem",
    padding: "2rem",
    color: "whitesmoke",
    height: "80%",
  },
}));
const options = {
  responsive: true,
  // maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "white",
        },
      },
    ],
    yAxes: [
      {
        // ticks: {
        //   display: false,
        // },
        // stacked: true,
        gridLines: {
          display: false,
        },
      },
    ],
  },
};
function LineChart() {
  const [data, setData] = useState({});
  const { hourly } = useData();
  const classes = useStyles();

  useEffect(() => {
    const hrs = hourly.map((obj: Current) => {
      const hr = new Date(obj.dt * 1000);
      return hr.getHours();
    });
    const convertedData = hourly
      .filter(
        (hr: Current, index: number) =>
          index % 2 === 0 && index < hrs.indexOf(23, hrs.indexOf(23) + 1)
      )
      .map((hr: Current, index: number) => ({
        ...hr,
        dt: new Date(hr.dt * 1000).getHours().toFixed(2),
      }));
    const chartdata = {
      labels: convertedData.map((hr: Current) => hr.dt),
      datasets: [
        {
          label: {
            display: false,
          },
          datalabels: {
            anchor: "end",
            align: "top",
            offset: 4,
            color: "#FFF",
            font: {
              weight: "normal",
              size: 15,
            },

            display: (ctx: any) => {
              return true;
            },
          },
          data: convertedData.map((hr: Current) =>
            (hr.temp - 273.15).toFixed(1)
          ),
        },
      ],
    };
    console.log(chartdata);
    setData(chartdata);
  }, []);

  return (
    <div className={classes.paper}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
