import React from "react";
import { useData } from "../data/DataProvider";

function SearchForm() {
  const { query, setQuery, fetchData } = useData();
  return (
    <input
      placeholder={"Enter city"}
      value={query}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.currentTarget.value)
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && fetchData(query)
      }
    />
  );
}

export default SearchForm;
