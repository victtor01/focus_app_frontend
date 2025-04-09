import { IReminderTask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const deleteReminder = async (reminderId: string) => {
  try {
    const res = await api.delete(`/reminders/${reminderId}`);
    console.log(res);
  } catch (error: unknown) {
    console.log(error);
  }
};

const useFetchReminderById = (reminderId: string) => {
  return useQuery<IReminderTask>({
    queryKey: ["reminders", reminderId],
    queryFn: async () => (await api.get(`/reminders/${reminderId}`))?.data,
  });
};

export const useReminders = () => ({
  deleteReminder,
  useFetchReminderById
});
