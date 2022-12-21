import React from "react"

import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import WeeklyTable from "../components/WeeklyTable/WeeklyTable";
import ProgressGraph from "../components/ProgressGraph/ProgressGraph"
import Timer from "../components/Timer/Timer";
import Header from "../components/Header/Header";


const Home = () => {
  return (
    <div id="home-window">
      <Header title="DEV TIME MANAGER"></Header>
      {/* <header id="home-header">
        <h1 className="app-title">DEV TIME MANAGER</h1>
        <div id="google-buttons">
          <Login></Login>
          <Logout></Logout>
        </div>
      </header> */}
      <div>
        <h1>Timer</h1>
        <Timer></Timer>
      </div>
      <h1>Weekly Table</h1>
      <WeeklyTable></WeeklyTable>
      <ProgressGraph></ProgressGraph>
    </div>
  );
};

export default Home;