import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from "./HooksApp";
// import { TrafficLight } from "./traffic-light/TrafficLight";
// import { TrafficLightWithEffect } from "./traffic-light/TrafficLightWithEffect";
// import { PokemonPage } from "./pages/PokemonPage";
// import { FocusScreen } from "./FocusScreen";
// import { TasksApp } from "./tasks/TasksApp";
// import { ScrambleWords } from "./scramble-words/ScrambelWords";
import { ClientInformation } from "./use-suspense/ClientInformation";

import "./index.css";
import { getUserAction } from "./use-suspense/get-user-action";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <HooksApp /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}

    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col gap-4">
          <h1 className="text-4xl font-thin text-white">Loading...</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(11)} />
    </Suspense>
  </StrictMode>
);
