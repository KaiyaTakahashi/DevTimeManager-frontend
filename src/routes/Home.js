import React from "react"

import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import WeeklyTable from "../components/WeeklyTable/WeeklyTable";
import ProgressGraph from "../components/ProgressGraph/ProgressGraph"

const Home = () => {
  return (
    <div id="home-window">
      <ProgressGraph></ProgressGraph>
      <WeeklyTable></WeeklyTable>
    </div>
  );
};

export default Home;