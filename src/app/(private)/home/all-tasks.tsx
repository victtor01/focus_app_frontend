"use client";

import { CenterSection } from "@/components/center-section";
import { ITask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { fontSaira } from "@/utils/fonts";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface TaskContainerProps {
  children: React.ReactNode;
}

const useAllTasksLog = () => {
  const { data: calendar, isLoading } = useQuery<Record<string, ITask[]>>({
    queryKey: ["tasks"],
    queryFn: async () =>
      (await api.get("/tasks-log/list?start=2025-01-01&end=2025-12-12"))?.data,
  });

  return {
    calendar,
    isLoading,
  };
};

const useAllTasks = () => {
  const { data: tasks, isLoading } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks"))?.data,
  });

  return {
    tasks,
    isLoading,
  };
};

export const AllTasks = () => {
  const { calendar, isLoading } = useAllTasksLog();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!calendar) {
    return <>not found</>;
  }

  const taskCounts = Object.values(calendar).map((tasks) => tasks.length);
  const maxTasks = Math.max(...taskCounts);

  return (
    <CenterSection className="flex flex-col gap-2 mt-4">
      <section className="flex justify-between bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800 border border-zinc-100 rounded-md">
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
        <section className="flex items-center justify-center">
          <div className="grid grid-cols-26 gap-1">
            {Object?.entries(calendar)?.map(([date, tasks]) => {
              return (
                <div
                  key={date}
                  data-havetask={tasks?.length > 0}
                  style={{ opacity: 1 }}
                  className="w-6 h-6 bg-zinc-100 dark:bg-zinc-700 relative group z-10 hover:z-20 rounded-md data-[havetask=true]:bg-indigo-400"
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
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </CenterSection>
  );
};
