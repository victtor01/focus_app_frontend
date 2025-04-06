import { api } from "@/utils/api";

const deleteReminder = async (reminderId: string) => {
  try {
    const res = await api.delete(`/reminders/${reminderId}`);
    console.log(res);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const useReminders = () => ({
  deleteReminder,
});
