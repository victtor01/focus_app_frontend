import { generateDaysInRange } from "@/utils/generate-days-in-range";
import dayjs from "dayjs";

interface ReminderCustomProps {
  data: {
    type: string;
    daysCustom: string[];
  };
}

interface ReminderWeekProps {
  data: {
    type: string;
    daysWeek: string[];
  };
}

const legend = {
  CUSTOM: "Customizado",
  WEEKLY: "Semanalmente",
};

const FIRST_DAY_WEEK = 0;
const LAST_DAY_WEEK = 6;

const getDays = (date: string): string[] => {
  const startDate = dayjs(date).startOf("month");
  const endDate = startDate.endOf("month");

  return generateDaysInRange({
    startDate,
    endDate,
  });
};

export const ReminderCustom = ({ data }: ReminderCustomProps) => {
  const days = getDays(data.daysCustom[0]);

  return (
    <div className="p-4 flex-col rounded-lg flex gap-2 border-zinc-200 bg-white dark:bg-zinc-950/30 border dark:border-zinc-800">
      <header className="flex">
        {legend[data.type as keyof typeof legend]}
      </header>
      <div className="flex flex-wrap gap-2">
        {days?.map((date) => {
          const includes = data.daysCustom.includes(date);

          return (
            <button
              type="button"
              key={date}
              data-includes={includes}
              className="w-7 h-7 dark:bg-zinc-700 grid place-items-center rounded-md text-gray-400 font-semibold dark:text-indigo-200 opacity-70 hover:opacity-100
							data-[includes=true]:bg-indigo-600 data-[includes=true]:text-white"
            >
              {dayjs(date).format("DD")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const ReminderWeek = ({ data }: ReminderWeekProps) => {
  const days = generateDaysInRange({
    startDate: dayjs(data.daysWeek[FIRST_DAY_WEEK]),
    endDate: dayjs(data.daysWeek[LAST_DAY_WEEK]),
  });

  return (
    <div className="p-4 flex-col rounded-lg flex gap-2 bg-white border-zinc-200 dark:bg-zinc-950/30 border dark:border-zinc-800">
      <header className="flex">
        {legend[data.type as keyof typeof legend]}
      </header>
      <div className="flex gap-2 flex-wrap">
        {days?.map((date) => {
          const includes = data.daysWeek.includes(date);

          return (
            <button
              type="button"
              key={date}
              data-includes={includes}
              className="w-auto px-2 h-7 dark:bg-zinc-700 grid place-items-center rounded-md text-gray-400 font-semibold dark:text-indigo-200 opacity-70 hover:opacity-100
														data-[includes=true]:bg-indigo-600 data-[includes=true]:text-white"
            >
              {dayjs(date).format("ddd")}
            </button>
          );
        })}
      </div>
    </div>
  );
};
