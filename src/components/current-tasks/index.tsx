"use client";

import { fontSaira } from "@/utils/fonts";
import { formatTime } from "@/utils/format-time";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TaskReminderLocalStorage {
  reminderId: string;
  date: string;
  time: number;
}

const getCurrentTasksFromLocalStorage = (): Record<string, string> => {
  return JSON.parse(localStorage.getItem("current_tasks") || "{}");
};

const saveCurrentTaskToLocalStorage = (key: string, time: number): void => {
  const currentTasks = getCurrentTasksFromLocalStorage();
  localStorage.setItem(
    "current_tasks",
    JSON.stringify({
      ...currentTasks,
      [key]: time.toString(),
    })
  );
};

const initializeTaskTime = (
  keyStore: string,
  setTime: (time: number) => void
): void => {
  const currentTasks = getCurrentTasksFromLocalStorage();
  const savedTime = currentTasks[keyStore];
  if (savedTime) {
    setTime(Number(savedTime));
  }
};

const startTimer = (
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
  setTime: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (!timerRef.current) {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }
};

const Hour = (props: { data: TaskReminderLocalStorage }) => {
  const {
    data: { reminderId, date, time },
  } = props;

  const keyStore = `${date}@${reminderId}`;
  const [timeCurr, setTime] = useState(time);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeTaskTime(keyStore, setTime);
  }, [keyStore]);

  useEffect(() => {
    startTimer(timerRef, setTime);
  }, []);

  useEffect(() => {
    if (timeCurr % 2 === 0 && reminderId) {
      saveCurrentTaskToLocalStorage(keyStore, timeCurr);
    }
  }, [timeCurr, reminderId, keyStore]);

  return (
    <Link
      key={date}
      href={`?modal=log-task&reminderId=${reminderId}&date=${date}`}
      className="p-2 bg-indigo-500 font-semibold text-indigo-100 rounded-xl  px-5 z-20 shadow dark:shadow-black opacity-90 hover:opacity-100"
    >
      <span className={fontSaira}>{formatTime(timeCurr)}</span>
    </Link>
  );
};

const parseTasksFromLocalStorage = (): TaskReminderLocalStorage[] => {
  const currentTasks = getCurrentTasksFromLocalStorage();
  return Object.entries(currentTasks).map(([key, time]) => {
    const [date, reminderId] = key.split("@");
    return { date, reminderId, time: Number(time || 0) };
  });
};

export const CurrentTasks = () => {
  const [tasks, setTasks] = useState<TaskReminderLocalStorage[]>([]);

  useEffect(() => {
    const parsedTasks = parseTasksFromLocalStorage();
    setTasks(parsedTasks);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-20">
      {tasks?.map((task, index) => {
        return <Hour data={task} key={index} />;
      })}
    </div>
  );
};
