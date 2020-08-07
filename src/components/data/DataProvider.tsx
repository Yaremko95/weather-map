import React from "react";

type DataProviderProps = { children: React.ReactNode };

const DataContext = React.createContext<any | undefined>(undefined);

export const useData = () => {
  const context = React.useContext(DataContext);
  const [
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
  ] = context;
  console.log(context);
  const fetchData = async (query: string) => {
    fetch(
      `https://geocode.xyz?auth=828220760012715928584x6950&locate=${query}&json=1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.latt}&lon=${data.longt}&appid=f7732eb7779ab961cc3c1d0b2cc8f9e3`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTimezone(data.timezone);
            setCurrent(data.current);
            setHourly(data.hourly);
            setDaily(data.daily);
          });
      })
      .catch((e) => console.log(e));

    // const data = await response.json();
    // // setData(data.data);
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
  };
};

function DataProvider({ children }: DataProviderProps) {
  const [current, setCurrent] = React.useState({});
  const [hourly, setHourly] = React.useState([]);
  const [daily, setDaily] = React.useState([]);
  const [timezone, setTimezone] = React.useState("");
  const [query, setQuery] = React.useState("");
  const queryValue = React.useMemo(() => [query, setQuery], [query]);
  const currentValue = React.useMemo(() => [current, setCurrent], [current]);
  const hourlyValue = React.useMemo(() => [hourly, setHourly], [hourly]);
  const dailyValue = React.useMemo(() => [daily, setDaily], [daily]);
  const timezoneValue = React.useMemo(() => [timezone, setTimezone], [daily]);
  return (
    <DataContext.Provider
      value={[
        ...currentValue,
        ...hourlyValue,
        dailyValue,
        ...timezoneValue,
        ...queryValue,
      ]}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
