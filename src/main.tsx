import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from "./HooksApp";
// import { TrafficLight } from "./traffic-light/TrafficLight";
// import { TrafficLightWithEffect } from "./traffic-light/TrafficLightWithEffect";
// import { PokemonPage } from "./pages/PokemonPage";
// import { FocusScreen } from "./FocusScreen";
import { TasksApp } from "./tasks/TasksApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <HooksApp /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    <TasksApp />
  </StrictMode>
);
