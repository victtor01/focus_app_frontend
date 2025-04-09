import { IReminderTask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

type ReminderCalendar = {
  [key: string]: IReminderTask[];
};

export const useFetchRemindersDay = (day: Dayjs) => {
  return useQuery<ReminderCalendar>({
    queryKey: ["reminders", "calendar", day],
    queryFn: async () => {
      return (
        await api.get(
          `/reminders/calendar?start=${day.format(
            "YYYY-MM-DD"
          )}&end=${day.format("YYYY-MM-DD")}`
        )
      )?.data;
    },
  });
};

export const useFetchReminders = (startDate: Dayjs, endDate: Dayjs) => {
  return useQuery<ReminderCalendar>({
    queryKey: [
      "reminders",
      "calendar",
      { start: startDate.format(), end: endDate.format() },
    ],
    queryFn: async () => {
      const start = startDate.startOf("week").format("YYYY-MM-DD");
      const end = endDate.format("YYYY-MM-DD");
      return (await api.get(`/reminders/calendar?start=${start}&end=${end}`))
        ?.data;
    },
  });
};
