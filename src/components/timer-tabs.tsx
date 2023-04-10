import { Tab } from "@headlessui/react";
import Timer from "./timer";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MyTabs() {
  const pomodoroDuration = 25 * 60 * 1000;
  const shortBreakDuration = 5 * 60 * 1000;
  const longBreakDuration = 10 * 60 * 1000;

  const [pomodoroTimeRamain, setPomodoroTimeRemain] =
    useState(pomodoroDuration);
  const [shortBreakTimeRamain, setshortBreakTimeRemain] =
    useState(shortBreakDuration);
  const [longBreakRamain, setlongBreakRemain] = useState(longBreakDuration);

  const tabContent = {
    pomodoro: {
      duration: pomodoroDuration,
      timeRemain: pomodoroTimeRamain,
      setTimeRemain: setPomodoroTimeRemain,
    },
    "short break": {
      duration: shortBreakDuration,
      timeRemain: shortBreakTimeRamain,
      setTimeRemain: setshortBreakTimeRemain,
    },
    "long break": {
      duration: longBreakDuration,
      timeRemain: longBreakRamain,
      setTimeRemain: setlongBreakRemain,
    },
  };

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="bg-purple-dark flex space-x-1 rounded-full p-2">
          {Object.keys(tabContent).map((category) => (
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
          {Object.keys(tabContent).map((category, idx) => (
            <Tab.Panel
              key={idx}
              className="btn-gradient-2 mx-auto mt-24 rounded-full"
            >
              <Timer
                duration={
                  tabContent[category as keyof typeof tabContent].duration
                }
                timeRemain={
                  tabContent[category as keyof typeof tabContent].timeRemain
                }
                setTimeRemain={
                  tabContent[category as keyof typeof tabContent].setTimeRemain
                }
              ></Timer>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
