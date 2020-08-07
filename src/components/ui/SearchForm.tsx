import React from "react";
import { useData } from "../data/DataProvider";

function SearchForm() {
  const { query, setQuery, fetchData, toggleLoading } = useData();
  const handleChange = (value: string) => {
    toggleLoading(true);
    setQuery(value);
  };
  return (
    <input
      style={{ height: "30px", width: "300px", marginBottom: "10px" }}
      placeholder={"Enter city"}
      value={query}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e.currentTarget.value)
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && fetchData(query)
      }
    />
  );
}

export default SearchForm;
