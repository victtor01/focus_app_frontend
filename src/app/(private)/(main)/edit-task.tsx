import { modal } from "@/components/modal-container";
import { ReminderCustom, ReminderWeek } from "@/components/reminder-component";
import { useTasks } from "@/hooks/use-tasks";
import { fontOpenSans, fontSaira } from "@/utils/fonts";
import { ReadonlyURLSearchParams } from "next/navigation";

interface ModalProps {
  params: ReadonlyURLSearchParams;
}

const ShowTasks = ({ taskId }: { taskId: string }) => {
  const { useFindById } = useTasks();
  const { task, isLoading } = useFindById(taskId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Não há task</div>;
  }

  return (
    <modal.background className="dark:bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-950">
      <modal.form className="border border-gray-200 mb-[10rem] dark:border-zinc-700 rounded-md max-w-[45rem] mt-[5rem] z-20">
        <modal.header
          title="Edit task"
          className="p-4 border-b border-gray-200 dark:border-zinc-700"
        />

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
        </section>

        <div className="flex flex-col gap-2 px-4 border-t border-zinc-200 dark:border-zinc-700 py-3 mt-2">
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

        <footer className="flex w-full p-4 px-4 border-t border-gray-300 dark:border-zinc-700">
          <button className="p-2 px-4 bg-indigo-500 shadow-md hover:shadow-xl dark:shadow-black font-semibold text-indigo-100 rounded-md opacity-90 hover:opacity-100">
            <span className={fontSaira}>Save changes</span>
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
