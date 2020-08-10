import React from "react";
import { Forecast, Current, Daily } from "../../types/types";

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

type DataProviderProps = { children: React.ReactNode };

const DataContext = React.createContext<any | undefined>(undefined);

export const useData = () => {
  const context = React.useContext(DataContext);
  const [
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

  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        fetch(
          `https://geocode.xyz?auth=828220760012715928584x6950&locate=${position.coords.latitude},${position.coords.longitude}&json=1`
        )
          .then((response) => response.json())
          .then((data) => {
            setQuery(`${data.city}, ${data.country}`);
          });
        getData(position.coords.latitude, position.coords.longitude, (data) => {
          if (!loading) {
            toggleLoading(true);
          }
          setTimezone(data.timezone);
          setCurrent(data.current);
          setHourly(data.hourly);
          setDaily(data.daily);
          toggleLoading(false);
        });
      },
      () => {},
      {
        timeout: 0,
        enableHighAccuracy: true,
      }
    );
  }, []);
  const value = React.useMemo(
    () => [
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
    [current, hourly, daily, timezone, query, loading, position]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
