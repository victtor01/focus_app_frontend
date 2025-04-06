"use client";

import { CenterSection } from "@/components/center-section";
import { IReminderTask } from "@/interfaces/ITask";
import { queryClient } from "@/providers/query-client";
import { api } from "@/utils/api";
import { fontSaira } from "@/utils/fonts";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

dayjs.extend(weekOfYear);
dayjs.extend(weekday);

type ReminderCalendar = {
  [key: string]: IReminderTask[];
};

type CreateLog = {
  reminderId: string;
  taskId: string | null;
  day: string;
};

type ViewType = "WEEKLY" | "CUSTOM";

const getInitialStartDate = (view: ViewType, startDateParam: string | null) => {
  const defaultDate = dayjs();

  switch (view) {
    case "CUSTOM":
      return startDateParam
        ? dayjs(startDateParam).startOf("month")
        : defaultDate.startOf("month");
    case "WEEKLY":
      return startDateParam
        ? dayjs(startDateParam).weekday(0)
        : defaultDate.weekday(0);
    default:
      return defaultDate.weekday(0);
  }
};
const useReminders = () => {
  const params = useSearchParams();

  const [view, setView] = useState<ViewType>("CUSTOM");
  const handleView = () =>
    setView((prev) => (prev === "CUSTOM" ? "WEEKLY" : "CUSTOM"));

  const startDateParam = params?.get("startAt");
  const [startDate, setStartDate] = useState<Dayjs>(
    getInitialStartDate(view, startDateParam)
  );

  const endDate = calculateEndDate(view, startDate);

  const { data: reminders } = useFetchReminders(startDate, endDate);

  useEffect(() => {
    setStartDate(getInitialStartDate(view, startDateParam));
  }, [view, startDateParam]);

  const next = () => updateStartDate(setStartDate, view, "next");
  const back = () => updateStartDate(setStartDate, view, "back");
  const handleNow = () => setStartDate(getInitialStartDate(view, null));

  const completeReminder = async (data: CreateLog) => {
    const { day, reminderId, taskId } = data;

    if (!taskId) {
      return;
    }

    try {
      const res = await api.post("/tasks-log", {
        day,
        reminderId,
        taskId,
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["tasks-log"],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            "reminders",
            "calendar",
            { start: startDate.format(), end: endDate.format() },
          ],
        }),
      ]);

      console.log(res);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return {
    handles: {
      handleView,
      handleNow,
      completeReminder,
      next,
      back,
    },
    datas: {
      reminders,
    },
    constants: {
      startDate,
      endDate,
      view,
    },
  };
};

const calculateEndDate = (view: ViewType, startDate: Dayjs): Dayjs => {
  return view === "CUSTOM"
    ? dayjs(startDate).endOf("month").endOf("week")
    : dayjs(startDate).endOf("week");
};

const useFetchReminders = (startDate: Dayjs, endDate: Dayjs) => {
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

const updateStartDate = (
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>,
  view: ViewType,
  direction: "next" | "back"
) => {
  setStartDate((prev) =>
    view === "CUSTOM"
      ? prev[direction === "next" ? "add" : "subtract"](1, "month")
      : prev[direction === "next" ? "add" : "subtract"](1, "week")
  );
};

export default function Reminders() {
  const { handles, datas, constants } = useReminders();
  const { handleView, handleNow, completeReminder, next, back } = handles;
  const { startDate, endDate, view } = constants;
  const { reminders } = datas;

  return (
    <section className="flex flex-col gap-2 w-full">
      <CenterSection className="mt-4 py-2 px-2 flex-wrap gap-2 justify-between flex overflow-hidden">
        <div className="flex items-center gap-2">
          <div
            className="dark:bg-zinc-800 text-gray-500 dark:text-indigo-100 rounded-md font-semibold flex
          divide-x divide-zinc-200 dark:divide-zinc-700 opacity-70 bg-white shadow"
          >
            <span className={`${fontSaira} p-1 px-3`}>
              {startDate.format("MMMM DD, YYYY")}
            </span>
            <span className={`${fontSaira} p-1 px-3`}>
              {endDate?.format("MMMM DD, YYYY")}
            </span>
          </div>

          <button
            onClick={handleNow}
            className="p-1 px-3 bg-indigo-500 rounded-md text-indigo-100 font-semibold"
          >
            <span className={fontSaira}>now</span>
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="items-center flex gap-2">
            <span
              className={`${fontSaira} font-semibold text-zinc-500 dark:text-indigo-100`}
            >
              Custom
            </span>
            <button
              type="button"
              onClick={handleView}
              data-right={view === "WEEKLY"}
              className={`${fontSaira} data-[right=true]:justify-end text-lg font-semibold ring-2 dark:ring-zinc-800 flex w-[3rem] h-[1.5rem] ring-zinc-200 bg-zinc-200 dark:bg-zinc-800 rounded-full `}
            >
              <div className="w-[1.5rem] h-[1.5rem] bg-indigo-500 rounded-full"></div>
            </button>
            <span
              className={`${fontSaira} font-semibold text-zinc-500 dark:text-indigo-100`}
            >
              Weekly
            </span>
          </div>

          <div className="dark:bg-indigo-500 bg-indigo-400 text-white text-gray-500 dark:text-indigo-100 rounded-md font-semibold flex divide-x divide-zinc-200 dark:divide-indigo-400 overflow-hidden">
            <button
              type="button"
              onClick={back}
              className="p-2 px-2 opacity-90 hover:opacity-100 hover:bg-indigo-600"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              className="p-2 px-2 opacity-90 hover:opacity-100 hover:bg-indigo-600"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </CenterSection>

      <CenterSection className="grid grid-cols-7 gap-2 px-3 p-2">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = dayjs(startDate).weekday(index);

          return (
            <div
              key={index}
              className="w-full lg:max-w-[16rem] h-auto rounded dark:bg-zinc-900 dark:border-zinc-800 "
            >
              <header className="font-semibold text-zinc-500 dark:text-indigo-50/60">
                <span className={fontSaira}>{date.format("ddd")}</span>
              </header>
            </div>
          );
        })}

        {reminders &&
          Object.entries(reminders)?.map(([date, reminders], index) => {
            const lenght: boolean = reminders?.length > 0;
            const today = date === dayjs().format("YYYY-MM-DD");
            const isSameMonth = dayjs(date).isSame(startDate, "month");
            const isComplete = !!reminders[0]?.tasksLogs?.find(
              (taskLog) => taskLog.day === date && taskLog.id
            );

            const taskId = reminders?.[0]?.task?.id || undefined;

            return (
              <div
                key={index}
                data-lenght={lenght}
                data-today={today}
                data-same-month={isSameMonth}
                className="w-full lg:max-w-[16rem] min-h-[6rem] hover:ring-2 h-auto bg-white rounded dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 data-[lenght=false]:opacity-80 data-[today=true]:ring-2 ring-indigo-500 data-[same-month=false]:opacity-30"
              >
                <header className="font-semibold text-zinc-500 dark:text-indigo-50/60 p-1 px-2">
                  <span className={fontSaira}>{dayjs(date)?.format("DD")}</span>
                </header>

                <section className="flex flex-col p-2 gap-1">
                  {reminders?.[0]?.task?.name && (
                    <div
                      data-complete={isComplete}
                      className="flex items-center gap-2 text-md justify-between data-[complete=true]:opacity-60"
                    >
                      {dayjs().isAfter(date) && (
                        <button
                          type="button"
                          onClick={() =>
                            completeReminder({
                              taskId: taskId || null,
                              reminderId: reminders[0]?.id,
                              day: date,
                            })
                          }
                          data-complete={isComplete}
                          className="w-6 h-6 rounded-full data-[complete=true]:border-indigo-600 grid text-white place-items-center bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 data-[complete=true]:bg-indigo-500"
                        >
                          {isComplete && <FaCheck size={10} />}
                        </button>
                      )}
                      <span
                        className={`${fontSaira} font-semibold opacity-70  ${
                          isComplete ? "line-through" : ""
                        }`}
                      >
                        {reminders?.[0]?.task?.name}
                      </span>
                    </div>
                  )}

                  {reminders?.length - 1 > 0 && (
                    <div className="bg-indigo-500/50 border border-indigo-500 text-indigo-200 px-2 rounded font-semibold text-sm opacity-60 mt-1">
                      <span className={fontSaira}>
                        +{reminders?.length - 1} Tasks
                      </span>
                    </div>
                  )}
                </section>
              </div>
            );
          })}
      </CenterSection>
    </section>
  );
}
