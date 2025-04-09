"use client";

import { useTasksLog } from "@/hooks/use-tasks-log";
import { fontSaira } from "@/utils/fonts";
import dayjs from "dayjs";
import Link from "next/link";

type TasksProps = {
  data: {
    day: string;
  };
};

export const TasksToday = ({ data }: TasksProps) => {
  const { day } = data;
  const { useGetTaskLogByDate } = useTasksLog();
  const { tasks } = useGetTaskLogByDate(day);

  return (
    <div className="border rounded-md dark:border-zinc-700 dark:bg-zinc-950 mt-4 bg-white border-zinc-100 divide-zinc-100 z-10 divide-y-2 dark:divide-zinc-700">
      <header className="flex w-full p-2 font-semibold opacity-70 justify-between">
        {dayjs(day).format("ddd, DD[th]")}

        <Link href="?" scroll={false}>
          Close
        </Link>
      </header>

      {tasks?.map((task, index) => {
        return (
          <div
            className="p-2 flex justify-between items-center first:rounded-t-md last:rounded-b-md hover:bg-zinc-100/40 dark:hover:bg-zinc-700/60"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <span
                className={`${fontSaira} w-28 text-nowrap p-1 bg-zinc-100 dark:bg-zinc-700 opacity-60 text-sm px-2 rounded-lg`}
              >
                {task?.hour}
                {!task?.hour && "not have hour"}
              </span>

              <div className="flex font-semibold dark:text-indigo-100 capitalize">
                {task?.task?.name}
              </div>
            </div>
          </div>
        );
      })}

      {!(tasks && tasks?.length > 0) && (
        <div className="flex justify-between p-2">
          <div className="p-2 flex flex-col w-full flex-1">
            <div className="text-indigo-100 p-2 px-5 rounded-md font-semibold">
              not have tasks this day!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
