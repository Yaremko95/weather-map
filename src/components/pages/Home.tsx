import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useData } from "../data/DataProvider";
import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
import DisplayWeatherContainer from "../ui/DisplayWeatherContainer";
function Home(props: RouteComponentProps) {
  return (
    <div>
      <Header />
      <SearchForm />
      <DisplayWeatherContainer />
    </div>
  );
}

export default Home;
