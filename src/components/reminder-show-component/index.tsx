import { fontSaira } from "@/utils/fonts";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";

interface ReminderShowComponentProps {
  completed: boolean;
  date: string;
  name: string;
}

export const ReminderShowComponent = (props: ReminderShowComponentProps) => {
  const { completed, date, name } = props;

  return (
    <div
      data-complete={completed}
      className="flex items-center gap-1 text-md justify-between data-[complete=true]:opacity-60"
    >
      {dayjs().isAfter(date) && (
        <div
          data-complete={completed}
          className={`w-6 h-6 rounded-full grid place-items-center text-white border data-[complete=true]:border-indigo-600 data-[complete=true]:bg-indigo-500 data-[complete=false]:bg-zinc-200 data-[complete=false]:dark:bg-zinc-800 data-[complete=false]:border-zinc-200 data-[complete=false]:dark:border-zinc-800`}
        >
          {completed && <FaCheck size={10} />}
        </div>
      )}
      <span
        className={`${fontSaira} font-semibold opacity-70  ${
          completed ? "line-through" : ""
        }`}
      >
        {name}
      </span>
    </div>
  );
};
