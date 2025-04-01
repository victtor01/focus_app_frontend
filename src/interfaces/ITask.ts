export interface ITask {
  id: string;
  name: string;
  description?: string;
  categories: ICategoryTask[],
  reminders: IReminderTask[]
}

export interface ICategoryTask {
  id: string;
  name: string;
  color: string;
}

export interface IReminderTask {
  id: string;
  customReminderDates: string[],
  reminderDaysOfWeek: string[],
  reminderType: string;
}