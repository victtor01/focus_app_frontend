"use client";

import { CenterSection } from "@/components/center-section";
import { useTasks } from "@/hooks/use-tasks";
import { ITask } from "@/interfaces/ITask";
import { queryClient } from "@/providers/query-client";
import { api } from "@/utils/api";
import { fontSaira } from "@/utils/fonts";
import { labelsColors } from "@/utils/label-colors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgGym } from "react-icons/cg";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TbClockHour7Filled } from "react-icons/tb";
import { TiThList } from "react-icons/ti";
import { toast } from "react-toastify";
import { z } from "zod";

interface CreateTaskSchema {
  name: string;
}

const createTaskSchema = z.object({
  name: z.string(),
});

const useAllTasksList = () => {
  const [openInputToRegister, setOpenInputToRegister] =
    useState<boolean>(false);
  const handleSetOpenInputToRegister = () =>
    setOpenInputToRegister((prev) => !prev);

  return {
    openInputToRegister,
    handleSetOpenInputToRegister,
  };
};

const useFormAllTasksLists = () => {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  });

  const createTask = async (data: CreateTaskSchema) => {
    try {
      const res = await api.post("/tasks", data);
      console.log(res);

      if (res?.data) {
        queryClient.setQueriesData({ queryKey: ["tasks"] }, (prev: ITask[]) => {
          return [...prev, res.data];
        });
      }

      toast(
        <div className="font-semibold text-indigo-200">created task!</div>,
        {
          icon: <IoCheckmarkCircle className="text-indigo-200" />,
        }
      );

      form.reset();
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return {
    form,
    createTask,
  };
};

export default function AllTasksList() {
  const { openInputToRegister, handleSetOpenInputToRegister } =
    useAllTasksList();

  const { useAllTasks } = useTasks();
  const { form, createTask } = useFormAllTasksLists();
  const { tasks, isLoading } = useAllTasks();

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <CenterSection className="flex-col z-10">
      <header className="flex dark:text-indigo-200 font-semibold mt-4 gap-2 items-center">
        <TiThList />
        <h1 className={fontSaira}>Minhas tarefas</h1>
      </header>

      <section className="flex flex-col border rounded-md shadow overflow-hidden dark:shadow-black dark:bg-zinc-950 border-zinc-200 bg-white w-full divide-y dark:divide-zinc-700 dark:border-zinc-800 divide-zinc-300">
        {tasks?.map((task: ITask) => {
          return (
            <Link
              key={task?.id}
              href={`?modal=edit-task&taskId=${task.id}`}
              className="justify-between flex opacity-90 hover:opacity-100 hover:bg-zinc-50 hover:dark:bg-zinc-900"
            >
              <section className="flex items-center gap-2 p-2">
                <div className="grid place-items-center w-7 h-7 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                  <CgGym />
                </div>
                <div
                  className={`${fontSaira} text-lg text-gray-500 dark:text-zinc-200 font-semibold`}
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

              <div className="flex gap-4 px-2 items-center">
                <div className="font-semibold text-sm opacity-50 flex gap-2 items-center">
                  <TbClockHour7Filled />
                  <span>{task?.reminders?.length}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      {!openInputToRegister && (
        <div>
          <button
            type="button"
            onClick={handleSetOpenInputToRegister}
            className="p-2 px-4  bg-indigo-500/10 rounded-md text-indigo-800 dark:text-indigo-200 dark:border-indigo-300 text-sm font-semibold border border-dashed border-indigo-500 shadow-md shadow-indigo-500/20 opacity-70 hover:opacity-100"
          >
            <span className={fontSaira}>Create Task</span>
          </button>
        </div>
      )}

      {openInputToRegister && (
        <form
          onSubmit={form.handleSubmit(createTask)}
          className="w-full flex flex-col bg-white dark:bg-zinc-900 p-2 gap-2 border border-zinc-200 dark:border-zinc-800 rounded-md"
        >
          <header className="flex justify-between gap-2 items-center">
            <span
              className={`${fontSaira} font-semibold text-zinc-500 dark:text-zinc-200`}
            >
              Please, input name to task
            </span>

            <button
              type="button"
              onClick={handleSetOpenInputToRegister}
              className="font-semibold text-base p-1 px-2 rounded text-zinc-400 dark:text-zinc-200"
            >
              <span className={fontSaira}>Close</span>
            </button>
          </header>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              {...form.register("name")}
              className="outline-none p-2 flex-1 rounded-md border border-zinc-200 dark:border-zinc-800"
              placeholder="Commit on GitHub"
            />

            <button
              type="submit"
              data-valid={form.watch("name")?.length > 0}
              disabled={form.watch("name")?.length === 0}
              className="flex p-1 px-2 bg-gradient-to-bl opacity-90 hover:opacity-100 bg-blue-500 text-indigo-100 rounded shadow data-[valid=false]:opacity-50"
            >
              <span className={fontSaira}>Create</span>
            </button>
          </div>
        </form>
      )}
    </CenterSection>
  );
}
