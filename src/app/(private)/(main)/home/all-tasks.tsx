"use client";

import { CenterSection } from "@/components/center-section";
import { ITask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { fontSaira } from "@/utils/fonts";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { TasksToday } from "./tasks-today";
import { useSearchParams } from "next/navigation";

const useAllTasksLog = () => {
  const { data: calendar, isLoading } = useQuery<Record<string, ITask[]>>({
    queryKey: ["tasks-log"],
    queryFn: async () =>
      (await api.get("/tasks-log/list?start=2025-01-01&end=2025-12-12"))?.data,
  });

  return {
    calendar,
    isLoading,
  };
};

export const AllTasks = () => {
  const { calendar, isLoading } = useAllTasksLog();
  const params = useSearchParams();
  const day = params.get("day") || null;

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!calendar) {
    return <>not found</>;
  }

  return (
    <CenterSection className="flex flex-col gap-2 relative pb-[10rem]">
      <div className="flex flex-col w-full relative">
        <section className="flex justify-between bg-white relative p-4 z-10 dark:border-zinc-700 dark:bg-zinc-900/70 border border-zinc-100 rounded-md">
          <header className="flex flex-col px-1 justify-between">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={`${fontSaira} text-sm text-zinc-500 dark:text-indigo-100 font-semibold`}
              >
                {dayjs().month(index).format("MMM")}
              </span>
            ))}
          </header>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-12 md:grid-cols-20 lg:grid-cols-26 gap-1">
              {Object?.entries(calendar)?.map(([date, tasks]) => {
                const isSelected = day && date === day;

                return (
                  <Link
                    key={date}
                    scroll={false}
                    href={`?day=${date}`}
                    data-selected={isSelected}
                    data-havetask={tasks?.length > 0}
                    className="w-6 h-6 bg-zinc-100 data-[selected=false]:opacity-30 transition-all dark:bg-zinc-800 relative group z-10 hover:z-20 rounded-md data-[havetask=true]:bg-indigo-400"
                  >
                    <div className="absolute top-0 -translate-y-10 left-[50%] translate-x-[-50%] rounded-md px-1 dark:text-indigo-100 bg-white dark:bg-zinc-600 w-auto group-hover:flex hidden">
                      {tasks?.length > 0 && (
                        <span
                          className={`${fontSaira} flex flex-nowrap text-nowrap text-sm p-1 font-semibold`}
                        >
                          {tasks?.length} conclued tasks on{" "}
                          {dayjs(date).format("MMM, DD[th]")}
                        </span>
                      )}

                      {tasks?.length == 0 && (
                        <span className="flex flex-nowrap text-nowrap text-sm p-1">
                          No tasks on {dayjs(date).format("MMM, DD[th]")}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {day && (
          <div
            className="w-[10rem] h-[10rem] translate-x-[-3rem] border-t-4 border-l-4 border-b-4 
            border-dotted dark:border-zinc-500 z-0 absolute bottom-0 translate-y-[50%] rounded-xl"
          />
        )}
      </div>

      {day && <TasksToday data={{ day }} />}
    </CenterSection>
  );
};
