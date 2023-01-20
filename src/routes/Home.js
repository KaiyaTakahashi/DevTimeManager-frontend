import React from "react"

import "../styles/components.css";
import WeeklyTable from "../components/WeeklyTable/WeeklyTable";
import ProgressGraph from "../components/ProgressGraph/ProgressGraph"
import Timer from "../components/Timer/Timer";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div id="home-window">
      <Header></Header>
      <Timer></Timer>
      <WeeklyTable></WeeklyTable>
      <ProgressGraph></ProgressGraph>
    </div>
  );
};

export default Home;