import { Circle } from "rc-progress";
import { useEffect, useState } from "react";
import styles from "./timer.module.css";

export default function Timer({
  duration,
  timeRemain,
  setTimeRemain,
}: {
  duration: number;
  timeRemain: number;
  setTimeRemain: (duration: number) => void;
}) {
  const [isPausing, setIsPausing] = useState(true);
  const [percentage, setPercentage] = useState((timeRemain / duration) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausing && duration > 0) {
        const remaining = timeRemain - 100;

        if (remaining > 0) {
          setTimeRemain(remaining);
          setPercentage((remaining / duration) * 100);
        } else {
          setTimeRemain(0);
          setPercentage(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const minutes = Math.floor((timeRemain % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemain % (1000 * 60)) / 1000);

  const reset = () => {
    setTimeRemain(duration);
    setPercentage(100);
    setIsPausing(true);
  };

  return (
    <div className="relative flex h-96 flex-col items-center justify-center gap-8">
      <p className="text-light text-7xl font-bold text-white">
        {minutes.toString().padStart(2, "0")} :{" "}
        {seconds.toString().padStart(2, "0")}
      </p>

      {timeRemain > 0 && (
        <button
          onClick={() => setIsPausing(!isPausing)}
          type="button"
          className={`${
            styles.button || ""
          } action-button text-light z-10 text-2xl font-bold uppercase`}
        >
          {isPausing ? "Start" : "Pause"}
        </button>
      )}

      {timeRemain <= 0 && (
        <button
          onClick={() => reset()}
          type="button"
          className={`${
            styles.button || ""
          } action-button text-light z-10 text-2xl font-bold uppercase`}
        >
          Reset
        </button>
      )}

      <Circle
        className={`circle-progress-bar absolute z-0 w-full`}
        percent={percentage}
        strokeWidth={3}
        trailColor="#1e2140"
        strokeColor="#f87070"
      />
    </div>
  );
}
