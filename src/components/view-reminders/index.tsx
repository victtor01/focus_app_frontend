import { useFetchRemindersDay } from "@/hooks/use-fetch-reminders";
import dayjs from "dayjs";
import { ReminderShowComponent } from "../reminder-show-component";
import { useRouter } from "next/navigation";

interface ViewRemindersProps {
  date: string;
}

export const ViewReminders = (props: ViewRemindersProps) => {
  const { date } = props;
  const { data: calendar } = useFetchRemindersDay(dayjs(date));
  const router = useRouter();

  const openModalToAddLog = (taskId: string | undefined, reminderId: string) => {
    if (taskId) {
      router.push(`?modal=log-task&date=${date}&reminderId=${reminderId}`, {
        scroll: false,
      });
    }
  };

  const lenght: boolean =
    !calendar ||
    Object.keys(calendar)?.every(
      (key) => Array.isArray(calendar[key]) && calendar[key].length === 0
    );

  return (
    <section className="flex flex-col gap-2">
      {lenght && (
        <div className="font-semibold p-1">Sem lembretes para esse dia</div>
      )}

      {calendar &&
        Object.entries(calendar)?.map(([date, reminders], index) => {
          if (!reminders || reminders.length === 0) return null;

          const completeThis = reminders[0]?.tasksLogs?.find(
            (taskLog) => taskLog.day === date && taskLog.id
          );

          return (
            <div
              key={index}
              className="flex divide-y divide-zinc-100 dark:divide-zinc-800 flex-col w-full"
            >
              {reminders?.map((reminder, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => openModalToAddLog(date, reminder.id)}
                    className="p-2 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 flex flex-1"
                  >
                    <ReminderShowComponent
                      name={reminder?.task?.name || ""}
                      completed={!!completeThis}
                      date={date}
                    />
                  </button>
                );
              })}
            </div>
          );
        })}
    </section>
  );
};
