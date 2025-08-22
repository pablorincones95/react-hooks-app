import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(5);

    if (light === "red") {
      setLight("green");
      return;
    }
    if (light === "yellow") {
      setLight("red");
      return;
    }
    if (light === "green") {
      setLight("yellow");
      return;
    }
  }, [countdown, light]);

  return {
    // Props
    countdown,
    light,
    colors,

    // computed
    percentage: (countdown / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
  };
};
