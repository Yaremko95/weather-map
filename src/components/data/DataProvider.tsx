import React from "react";
import { Forecast, Current, Daily } from "../../types/types";
import authAxios from "../auth/authAxios";
import axios from "axios";
export const formatDirection = (angle: number) => {
  const val = Math.floor(angle / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const formatDate = (dt: number) => {
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
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const day = weekDays[a.getDay()];
  return {
    year,
    month,
    date,
    day,
    hour,
    min,
    sec,
  };
};
export const getData = async (
  latt: number,
  longt: number,
  successCallback: (data: Forecast) => void
) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${longt}&appid=f7732eb7779ab961cc3c1d0b2cc8f9e3`
  )
    .then((response) => response.json())
    .then((data) => {
      successCallback(data);
    });
};
const authorize = async () => {
  const res = await authAxios.get("/list", { withCredentials: true });
  let user = {};
  console.log("res", res);
  if (!res) {
    const secondRes = await axios.get("/list", {
      withCredentials: true,
    });
    user = secondRes.data;
  } else {
    user = res.data;
  }
  return user;
  // const {setUser} =useData()
  console.log(user);
};
type DataProviderProps = { children: React.ReactNode };

const DataContext = React.createContext<any | undefined>(undefined);

export const useData = () => {
  const context = React.useContext(DataContext);
  const [
    user,
    setUser,
    [current, setCurrent],
    [hourly, setHourly],
    [daily, setDaily],
    timezone,
    setTimezone,
    query,
    setQuery,
    loading,
    toggleLoading,
    position,
    setPosition,
  ] = context;

  const fetchData = async (query: string) => {
    fetch(
      `https://geocode.xyz?auth=828220760012715928584x6950&locate=${query}&json=1`
    )
      .then((response) => response.json())
      .then((data) => {
        getData(data.latt, data.longt, (data) => {
          if (!loading) {
            toggleLoading(true);
          }
          setTimezone(data.timezone);
          setCurrent(data.current);
          setHourly(data.hourly);
          setDaily(data.daily);
          toggleLoading(false);
        });
      })
      .catch((e) => console.log(e));
  };
  return {
    query,
    setQuery,
    current,
    setCurrent,
    hourly,
    setHourly,
    daily,
    setDaily,
    timezone,
    setTimezone,
    fetchData,
    loading,
    toggleLoading,
    user,
    setUser,
  };
};

function DataProvider({ children }: DataProviderProps) {
  const [current, setCurrent] = React.useState({});
  const [hourly, setHourly] = React.useState<Array<Current | undefined>>([]);
  const [daily, setDaily] = React.useState<Array<Daily | undefined>>([]);
  const [timezone, setTimezone] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [loading, toggleLoading] = React.useState(true);
  const [position, setPosition] = React.useState({});
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // const authorized = authorize();

    // setUser(authorized);
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        // authAxios
        //   .get(
        //     `/weather?lat=${position.coords.latitude}&longt=${position.coords.longitude}`,
        //     { withCredentials: true }
        //   )
        //   .then((res) => console.log(res));

        // fetch(
        //   // `https://geocode.xyz?auth=828220760012715928584x6950&locate=${position.coords.latitude},${position.coords.longitude}&json=1`
        //   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     setQuery(`${data.city}`);
        //   });
        // getData(position.coords.latitude, position.coords.longitude, (data) => {
        //   if (!loading) {
        //     toggleLoading(true);
        //   }
        //   setTimezone(data.timezone);
        //   setCurrent(data.current);
        //   setHourly(data.hourly);
        //   setDaily(data.daily);
        //   toggleLoading(false);
        // });
      },
      (e) => {
        console.log(e);
      },
      {
        // timeout: 0,
        enableHighAccuracy: true,
      }
    );
  }, []);
  const value = React.useMemo(
    () => [
      user,
      setUser,
      [current, setCurrent],
      [hourly, setHourly],
      [daily, setDaily],
      timezone,
      setTimezone,
      query,
      setQuery,
      loading,
      toggleLoading,
      position,
      setPosition,
    ],
    [current, hourly, daily, timezone, query, loading, position, user]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
