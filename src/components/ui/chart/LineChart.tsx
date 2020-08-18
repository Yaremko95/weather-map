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
    paddingTop: "2rem",
    paddingRight: "2rem",
    color: "whitesmoke",
    height: "300px",
  },
}));

const LineChart = React.forwardRef((props, ref?: React.Ref<HTMLDivElement>) => {
  const [data, setData] = useState({});
  const { hourly } = useData();
  const classes = useStyles();

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
  useEffect(() => {
    const getData = (canvas: any) => {
      console.log(canvas);
      const context = canvas.getContext("2d");

      var grad = context.createLinearGradient(102, 0, 98, 200);

      grad.addColorStop(0, "rgba(194,98,72,1)");
      grad.addColorStop(1, "rgba(255,255,255,0.1)");

      context.fillStyle = grad;
      context.fillRect(0, 0, 200, 200);
      return {
        labels: convertedData.map((hr: Current) => hr.dt),
        datasets: [
          {
            label: "Hourly Temperature",
            borderColor: "#C26248",
            backgroundColor: grad,
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
              // formatter: function (value: Number) {
              //   return value + "something";
              // },
            },
            data: convertedData.map((hr: Current) =>
              (hr.temp - 273.15).toFixed(1)
            ),
          },
        ],
      };
    };
    console.log("!!!!!!!!!!!!", convertedData);
    const canvas = document.createElement("canvas");
    const chartData = getData(canvas);
    setData(chartData);
  }, []);
  const options = {
    title: {
      display: true,
      text: "Hourly",
      fontColor: "#fff",
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 8,
        left: 15,
        right: 15,
        bottom: 15,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "white",
            maxRotation: 0.00001,
            padding: 5,
            labelOffset: 5,
            callback(value: Number, i: Number) {
              const data = convertedData.map((obj: Current) => obj.dt);
              if (i <= data.indexOf("22.00") || i <= data.indexOf("23.00")) {
                return [value, "Today"];
              } else {
                return [value, "Tomorrow"];
              }
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: false,
          },
          // stacked: true,
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      displayColors: false,
      titleFontSize: 16,
      bodyFontSize: 14,
      xPadding: 10,
      yPadding: 10,
      backgroundColor: "rgba(0,0,0,0.8)",
      bodyAlign: "left",
      bodyFontColor: "#fff",
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 0,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      custom: null,
      enabled: true,
      bodySpacing: 6,
      intersect: true,
      mode: "nearest",
      multiKeyBackground: "#fff",
      position: "average",
      titleAlign: "left",
      titleFontColor: "#fff",
      titleFontStyle: "bold",
      titleMarginBottom: 6,
      titleSpacing: 4,

      callbacks: {
        label: function (tooltipItem: any, data: any) {
          console.log("too00000000l", tooltipItem);
          let label = [
            `Temp:  ${data.datasets[0].data[tooltipItem.index]};`,
            `Wind: ${convertedData[tooltipItem.index].wind_speed}mm/s`,
          ];

          if (convertedData[tooltipItem.index].rain) {
            label.push(
              `Rain: ${convertedData[tooltipItem.index].rain["1h"]}mm/s;`
            );
          }
          label.push(convertedData[tooltipItem.index].weather[0].description);
          return label;
        },
      },
    },
  };

  return (
    <div className={classes.paper} ref={ref}>
      <Line data={data} options={options} />
    </div>
  );
});

export default LineChart;
