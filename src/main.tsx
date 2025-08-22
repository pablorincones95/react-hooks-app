import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from "./HooksApp";

import "./index.css";
// import { TrafficLight } from "./traffic-light/TrafficLight";
import { TrafficLightWithEffect } from "./traffic-light/TrafficLightWithEffect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TrafficLight /> */}
    <TrafficLightWithEffect />
    {/* <HooksApp /> */}
  </StrictMode>
);
