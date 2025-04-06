import { useReminders } from "@/hooks/use-reminders";
import { IReminderTask } from "@/interfaces/ITask";
import { queryClient } from "@/providers/query-client";
import { generateDaysInRange } from "@/utils/generate-days-in-range";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";

interface ReminderProps {
  reminder: IReminderTask;
  taskId: string;
}

const legend = {
  CUSTOM: "Custom",
  WEEKLY: "Weekly",
};

const FIRST_DAY_WEEK = 0;

const getDays = (date: string): string[] => {
  const startDate = dayjs(date).startOf("month");
  const endDate = startDate.endOf("month");

  return generateDaysInRange({
    startDate,
    endDate,
  });
};

const ButtonRepeat = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      {...props}
      className="w-[3rem] h-[1.5rem] bg-zinc-200 dark:bg-zinc-800 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800"
    >
      <div className="h-[1.5rem] w-[1.5rem] bg-zinc-400 dark:bg-zinc-600 rounded-full" />
    </button>
  );
};

export const ReminderCustom = ({ reminder, taskId }: ReminderProps) => {
  const { id } = reminder;
  const firstDay = reminder.customReminderDates[0];

  const days = getDays(firstDay);
  const { deleteReminder } = useReminders();

  const handleDelete = async () => {
    await deleteReminder(id);
    queryClient.invalidateQueries({
      queryKey: ["tasks", taskId],
    });
  };

  return (
    <div className="p-4 flex-col rounded-lg flex gap-2 border-zinc-200 bg-white dark:bg-zinc-950/30 border dark:border-zinc-800">
      <header className="flex justify-between items-center">
        <div>{legend[reminder.reminderType as keyof typeof legend]}</div>
        <span className="font-semibold dark:text-indigo-100 text-sm">
          {dayjs(firstDay).format("MMMM, YYYY")}
        </span>
      </header>
      <div className="flex flex-wrap gap-2">
        {days?.map((date) => {
          const includes = reminder.customReminderDates.includes(date);
          return (
            <button
              type="button"
              key={date}
              data-includes={includes}
              className="w-7 h-7 dark:bg-zinc-800 grid place-items-center rounded-md text-gray-400 font-semibold dark:text-indigo-200 opacity-70 hover:opacity-100
							data-[includes=true]:bg-indigo-600 data-[includes=true]:text-white data-[includes=true]:opacity-100"
            >
              {dayjs(date).format("DD")}
            </button>
          );
        })}
      </div>
      <footer className="flex gap-2 w-full mt-1 justify-between">
        <div className="text-sm rounded flex items-center gap-2">
          <ButtonRepeat />
          <span className="dark:text-indigo-200">Repetir todos os meses</span>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="font-semibold text-sm text-gray-400 dark:text-indigo-200"
        >
          Delete
        </button>
      </footer>
    </div>
  );
};

export const ReminderWeek = ({ reminder, taskId }: ReminderProps) => {
  const days = generateDaysInRange({
    startDate: dayjs(reminder.reminderDaysOfWeek[FIRST_DAY_WEEK]).startOf(
      "week"
    ),
    endDate: dayjs(reminder.reminderDaysOfWeek[FIRST_DAY_WEEK]).endOf("week"),
  });

  const { deleteReminder } = useReminders();

  const handleDelete = async () => {
    await deleteReminder(reminder.id);
    queryClient.invalidateQueries({
      queryKey: ["tasks", taskId],
    });
  };

  return (
    <div className="p-4 flex-col rounded-lg flex gap-2 bg-white border-zinc-200 dark:bg-zinc-950/30 border dark:border-zinc-800">
      <header className="flex">
        {legend[reminder.reminderType as keyof typeof legend]}
      </header>

      <div className="flex gap-2 flex-wrap">
        {days?.map((date) => {
          const includes = reminder.reminderDaysOfWeek.includes(date);

          return (
            <button
              type="button"
              key={date}
              data-includes={includes}
              className="w-auto px-2 h-7 dark:bg-zinc-700 grid place-items-center rounded-md 
              text-gray-400 font-semibold dark:text-indigo-200 opacity-70 hover:opacity-100
							data-[includes=true]:bg-indigo-600 data-[includes=true]:text-white"
            >
              {dayjs(date).format("ddd")}
            </button>
          );
        })}
      </div>

      <footer className="flex gap-2 w-full mt-1 justify-between">
        <div className="text-sm rounded flex items-center gap-2">
          <ButtonRepeat />
          <span className="dark:text-indigo-200">
            Repetir Semanas posteriores
          </span>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="font-semibold text-sm text-gray-400 dark:text-indigo-200"
        >
          Delete
        </button>
      </footer>
    </div>
  );
};
