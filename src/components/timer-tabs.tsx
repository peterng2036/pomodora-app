import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import styles from "./timer-tabs.module.css";
import { Circle } from "rc-progress";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const targetDate = new Date();
targetDate.setSeconds(targetDate.getSeconds() + 1);
targetDate.setMinutes(targetDate.getMinutes() + 1);


const totalTime = targetDate.getTime() - new Date().getTime();

export default function MyTabs() {
  const categories = ["pomodoro", "short break", "long break"];

  const [timeRemain, setTimeRemain] = useState(
    targetDate.getTime() - new Date().getTime()
  );

  const [isPausing, setIsPausing] = useState(true);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausing && timeRemain > 0) {
        const remaining = timeRemain - 100;

        if (remaining > 0) {
          setTimeRemain(remaining);
          setPercentage((remaining / totalTime) * 100);
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

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="bg-purple-dark flex space-x-1 rounded-full p-2">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "text-grey w-full rounded-full py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "text-dark bg-primary shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="btn-gradient-2 mx-auto mt-24 rounded-full"
            >
              <div className="relative flex h-96 flex-col items-center justify-center gap-8">
                <p className="text-light text-9xl font-bold text-white">
                  {minutes.toString().padStart(2, "0")} :{" "}
                  {seconds.toString().padStart(2, "0")}
                </p>

                <button
                  onClick={() => setIsPausing(!isPausing)}
                  type="button"
                  className={`${styles.button} action-button  text-light z-10 text-2xl font-bold uppercase`}
                >
                  {isPausing ? "Start" : "Pause"}
                </button>

                <Circle
                  className={`${styles["circle-progress-bar"]} circle-progress-bar absolute z-0 w-96`}
                  percent={percentage}
                  strokeWidth={3}
                  trailColor="#1e2140"
                  strokeColor="#f87070"
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
