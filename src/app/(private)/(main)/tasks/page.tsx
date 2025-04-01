"use client";

import { CenterSection } from "@/components/center-section";
import { useTasks } from "@/hooks/use-tasks";
import { ITask } from "@/interfaces/ITask";
import { fontOpenSans, fontSaira } from "@/utils/fonts";
import { labelsColors } from "@/utils/label-colors";
import Link from "next/link";
import { TbClockHour7Filled } from "react-icons/tb";

export default function AllTasks() {
  const { useAllTasks } = useTasks();
  const { tasks, isLoading } = useAllTasks();

  return (
    <CenterSection className="flex-col px-2">
      <header className="flex text-lg dark:text-zinc-300 font-semibold mt-4">
        <h1 className={fontSaira}>Minhas tarefas</h1>
      </header>

      <section className="flex flex-col border rounded-md dark:bg-zinc-900 border-zinc-300 bg-white w-full divide-y dark:divide-zinc-700 dark:border-zinc-700 divide-zinc-300">
        {tasks?.map((task: ITask) => {
          return (
            <Link
              key={task?.id}
              href={`?modal=edit-task&taskId=${task.id}`}
              className="justify-between flex opacity-90 hover:opacity-100 hover:dark:bg-zinc-800"
            >
              <section className="flex items-center gap-5 p-2">
                <div
                  className={`${fontSaira} text-lg text-gray-500 dark:text-zinc-200 underline underline-offset-2 font-semibold`}
                >
                  {task?.name}
                </div>

                <div
                  className={`${fontSaira} flex items-center gap-2 text-xs font-semibold`}
                >
                  {task?.categories?.map((category) => {
                    const color = category?.color;
                    const style =
                      color in labelsColors
                        ? labelsColors[color as keyof typeof labelsColors]
                        : "";

                    return (
                      <div
                        key={category?.id}
                        className={`flex border rounded-md text-sm px-2 items-center gap-2 ${style}`}
                      >
                        {category?.name}
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className="flex gap-4 border-l border-zinc-200 dark:border-zinc-700 px-4 ">
                <div className="font-semibold text-sm opacity-50 flex gap-2 items-center">
                  <TbClockHour7Filled />
                  <span>{task?.reminders?.length} Reminders</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </CenterSection>
  );
}
