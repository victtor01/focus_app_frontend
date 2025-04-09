import { modal } from "@/components/modal-container";
import { fontSaira } from "@/utils/fonts";
import { labelsColors } from "@/utils/label-colors";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AiOutlineCaretRight } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { useState, useRef, useEffect } from "react";
import { FaRegSquare } from "react-icons/fa";
import { useReminders } from "@/hooks/use-reminders";
import { RiResetLeftFill } from "react-icons/ri";
import { formatTime } from "@/utils/format-time";

const REMINDER_ID_KEY = "reminderId";
const DATE_KEY = "date";

const useCompleteTask = (date: string | null, reminderId: string | null) => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const keyStore = `${date}@${reminderId}`;

  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (time < 2 || !reminderId) return;

    const isEvenTime = time % 2 === 0;
    if (isEvenTime) {
      const currentTasks = JSON.parse(
        localStorage.getItem("current_tasks") || "{}"
      );

      const updatedTasks = {
        ...currentTasks,
        [keyStore]: time.toString(),
      };

      localStorage.setItem("current_tasks", JSON.stringify(updatedTasks));
    }
  }, [time, reminderId, keyStore]);

  useEffect(() => {
    const currentTasks = JSON.parse(
      localStorage.getItem("current_tasks") || "{}"
    );

    const savedTime = currentTasks[keyStore];
    console.log(currentTasks);

    if (savedTime) {
      setTime(Number(savedTime));
      start();
    }
  }, [date, reminderId, keyStore]);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return { time, start, stop, reset };
};

export const CompleteTask = (props: { params: ReadonlyURLSearchParams }) => {
  const { params } = props;
  const reminderId = params.get(REMINDER_ID_KEY);
  const date = params.get(DATE_KEY);

  const { useFetchReminderById } = useReminders();

  const fetchResult = useFetchReminderById(reminderId || "");
  const reminder = reminderId ? fetchResult.data : null;
  const isLoading = reminderId ? fetchResult.isLoading : false;

  const { time, start, stop, reset } = useCompleteTask(date, reminderId);

  return (
    <modal.background>
      <modal.form className="p-3 rounded border gap-2 border-zinc-100 dark:border-zinc-800 max-w-[30rem]">
        <modal.header title="Registre task" />
        {isLoading && <>loading...</>}

        {reminder?.task?.id && (
          <section className="flex p-3 border border-zinc-100 dark:border-zinc-800 rounded-md gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-zinc-800 rounded-md grid place-items-center">
                <CgGym />
              </div>
              <span className={`${fontSaira} font-semibold text-xl`}>
                {reminder?.task?.name}
              </span>
            </div>
            {reminder?.task?.categories?.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    labelsColors[category.color as keyof typeof labelsColors]
                  } px-2 rounded-md`}
                >
                  Test
                </div>
              );
            })}
          </section>
        )}

        <section className="flex mt-5 flex-col shadow-xl dark:shadow-black border gap-2 bg-zinc-50 dark:bg-zinc-900 p-2 px-4 rounded-xl border-zinc-100 dark:border-zinc-700 justify-center items-center">
          <div className="p-2 px-4 bg-indigo-500 shadow-xl shadow-zinc-600/40 dark:shadow-black rounded-full flex items-center justify-center text-indigo-100 ">
            <span className={`${fontSaira} text-3xl font-semibold`}>
              {formatTime(time)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={start}
              className="w-10 h-10 border opacity-80 hover:opacity-100 border-transparent text-zinc-500 bg-white shadow-xl dark:border-zinc-800 dark:bg-black grid place-items-center rounded-full"
            >
              <AiOutlineCaretRight size={22} />
            </button>
            <button
              type="button"
              onClick={stop}
              className="w-10 h-10 border opacity-80 hover:opacity-100 border-transparent text-zinc-500 bg-white shadow-xl dark:border-zinc-800 dark:bg-black grid place-items-center rounded-full"
            >
              <FaRegSquare />
            </button>

            <button
              type="button"
              onClick={reset}
              className="w-10 h-10 border opacity-80 hover:opacity-100 border-transparent text-zinc-500 bg-white shadow-xl dark:border-zinc-800 dark:bg-black grid place-items-center rounded-full"
            >
              <RiResetLeftFill />
            </button>
          </div>
        </section>

        <footer className="flex justify-between items-center mt-5">
          <div></div>

          <button className="p-2 px-4 bg-indigo-500 text-black font-semibold rounded-md opacity-90 hover:opacity-100">
            Pronto
          </button>
        </footer>
      </modal.form>
    </modal.background>
  );
};
