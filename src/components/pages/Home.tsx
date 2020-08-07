import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useData } from "../data/DataProvider";
import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
function Home(props: RouteComponentProps) {
  return (
    <div>
      <Header />
      <SearchForm />
    </div>
  );
}

export default Home;
