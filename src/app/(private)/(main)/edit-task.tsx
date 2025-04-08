import { modal } from "@/components/modal-container";
import { ReminderCustom, ReminderWeek } from "@/components/reminder-component";
import { useCategories } from "@/hooks/use-categories";
import { useTasks } from "@/hooks/use-tasks";
import { fontOpenSans, fontSaira } from "@/utils/fonts";
import { labelsColors } from "@/utils/label-colors";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { TbClockHour4Filled } from "react-icons/tb";

interface ModalProps {
  params: ReadonlyURLSearchParams;
}

type Action = "EDIT" | "REMINDERS";

const useShowTasks = () => {
  const [action, setAction] = useState<Action>("EDIT");

  return {
    action,
    setAction,
  };
};

const ShowTasks = ({ taskId }: { taskId: string }) => {
  const { useFindById, deleteTask } = useTasks();
  const { task, isLoading } = useFindById(taskId);
  const { action, setAction } = useShowTasks();
  const { categories } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Não há task</div>;
  }

  return (
    <modal.background className="dark:bg-zinc-950/90 backdrop-blur-sm">
      <modal.form className="border border-gray-200 mb-[10rem] dark:border-zinc-700 rounded-md max-w-[45rem] mt-[5rem] z-20">
        <modal.header
          title="Edit task"
          className="p-4 border-b border-gray-200 dark:border-zinc-700"
        />

        <div className="flex gap-2 items-center p-2">
          <button
            type="button"
            onClick={() => setAction("EDIT")}
            className="bg-white dark:bg-zinc-800 rounded-md text-gray-500 dark:text-indigo-200 flex gap-2 items-center shadow dark:shadow-black p-1 px-5"
          >
            <FaPen size={12} />
            <span className={fontSaira}>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => setAction("REMINDERS")}
            className="bg-white dark:bg-zinc-800 rounded-md text-gray-500 dark:text-indigo-200 flex gap-2 items-center shadow dark:shadow-black p-1 px-5"
          >
            <TbClockHour4Filled size={12} />
            <span className={fontSaira}>Reminders</span>
          </button>
        </div>

        {action === "EDIT" && (
          <section className="flex flex-col gap-2 p-4 ">
            <label htmlFor="name" className="flex flex-col gap-1">
              <span
                className={`${fontOpenSans} text-gray-500 dark:text-indigo-200`}
              >
                Nome
              </span>
              <input
                type="text"
                id="name"
                className="border p-2 border-gray-200 dark:border-zinc-700 rounded-md outline-none"
                placeholder="Push Commit..."
              />
            </label>

            <label htmlFor="description" className="flex flex-col gap-1">
              <span
                className={`${fontOpenSans} text-gray-500 dark:text-indigo-200`}
              >
                Description
              </span>
              <input
                type="text"
                id="description"
                className="border p-2 border-gray-200 dark:border-zinc-700 rounded-md outline-none"
                placeholder="Push Commit..."
              />
            </label>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 flex-1">
                <span
                  className={`${fontOpenSans} text-gray-500 dark:text-indigo-200`}
                >
                  Categories
                </span>

                <div className="p-1 bg-zinc-50 rounded-md dark:bg-zinc-800">
                  <span className="text-sm opacity-60">Not selected</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className={`${fontOpenSans} text-gray-500 dark:text-indigo-200`}
                >
                  Select
                </span>

                <div className="flex flex-wrap gap-2">
                  {categories?.map((category, index) => {
                    const style =
                      category?.color in labelsColors
                        ? labelsColors[
                            category.color as keyof typeof labelsColors
                          ]
                        : "";

                    return (
                      <button
                        type="button"
                        key={index}
                        className={`${style} p-1 px-3 rounded-md text-sm`}
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {action === "REMINDERS" && (
          <div className="flex flex-col gap-2 px-4 border-zinc-200 dark:border-zinc-700 py-3 mt-2">
            <header className="flex text-zinc-400 dark:text-indigo-200">
              <h1 className={fontSaira}>Reminders</h1>
            </header>

            <section className="flex flex-col gap-2">
              {task?.reminders?.map((reminder, index: number) => {
                switch (reminder.reminderType) {
                  case "CUSTOM":
                    return (
                      <ReminderCustom
                        key={index}
                        reminder={reminder}
                        taskId={task.id}
                      />
                    );

                  case "WEEKLY":
                    return (
                      <ReminderWeek
                        key={index}
                        reminder={reminder}
                        taskId={task.id}
                      />
                    );
                }
              })}

              <button
                className="flex p-4 border border-dashed opacity-90 hover:opacity-100 bg-indigo-100 dark:bg-indigo-500/5 
              shadow shadow-indigo-600/40 dark:border-indigo-500 rounded-md text-indigo-500"
              >
                New Reminder
              </button>
            </section>
          </div>
        )}
        <footer className="flex w-full p-4 px-4 border-t border-gray-300 dark:border-zinc-700 justify-between">
          <button
            type="submit"
            className="p-2 px-4 bg-indigo-500 shadow-md hover:shadow-xl dark:shadow-black text-indigo-50 rounded-md opacity-90 hover:opacity-100"
          >
            <span className={fontSaira}>Save changes</span>
          </button>

          <button
            type="button"
            onClick={() => {
              deleteTask(taskId);
              router.push("?");
            }}
            className="p-1 px-4 bg-zinc-100 opacity-90 hover:opacity-100 dark:bg-zinc-800 rounded-lg"
          >
            <span className={`${fontSaira} text-red-500`}>Del</span>
          </button>
        </footer>
      </modal.form>
    </modal.background>
  );
};

export const EditTask = ({ params }: ModalProps) => {
  const taskId = params?.get("taskId") || null;

  if (!taskId) {
    return <div>Não há taskId</div>;
  }

  return <ShowTasks taskId={taskId} />;
};
