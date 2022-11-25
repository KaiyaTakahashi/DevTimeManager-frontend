import React from "react"

import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import WeeklyTable from "../components/WeeklyTable/WeeklyTable";
import ProgressGraph from "../components/ProgressGraph/ProgressGraph"
import Timer from "../components/Timer/Timer";

const Home = () => {
  return (
    <div id="home-window">
      <h1>Timer</h1>
      <Timer></Timer>
      <ProgressGraph></ProgressGraph>
      <WeeklyTable></WeeklyTable>
    </div>
  );
};

export default Home;