"use client";

import { CenterSection } from "@/components/center-section";
import { ReminderShowComponent } from "@/components/reminder-show-component";
import { ViewReminders } from "@/components/view-reminders";
import { useFetchReminders } from "@/hooks/use-fetch-reminders";
import { queryClient } from "@/providers/query-client";
import { api } from "@/utils/api";
import { fontSaira } from "@/utils/fonts";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CgGoogleTasks } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

dayjs.extend(weekOfYear);
dayjs.extend(weekday);

type CreateLog = {
  reminderId: string;
  taskId: string | null;
  day: string;
};

type ViewType = "WEEKLY" | "CUSTOM";

const selectedDateKey = "reminder_day";

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
  const router = useRouter();

  const dateSelected = params?.get(selectedDateKey);
  const startDateParam = params?.get("startAt");

  const [view, setView] = useState<ViewType>("CUSTOM");

  const [startDate, setStartDate] = useState<Dayjs>(
    getInitialStartDate(view, startDateParam)
  );

  const endDate = calculateEndDate(view, startDate);

  const { data: reminders } = useFetchReminders(startDate, endDate);

  useEffect(() => {
    setStartDate(getInitialStartDate(view, startDateParam));
  }, [view, startDateParam]);

  const handleView = () =>
    setView((prev) => (prev === "CUSTOM" ? "WEEKLY" : "CUSTOM"));

  const next = () => updateStartDate(setStartDate, view, "next");
  const back = () => updateStartDate(setStartDate, view, "back");
  const handleNow = () => setStartDate(getInitialStartDate(view, null));

  const selectDate = (date: string) => {
    router.push(`?${selectedDateKey}=${date}`, {
      scroll: false,
    });
  };

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["tasks-log"],
    });

    await queryClient.invalidateQueries({
      queryKey: [
        "reminders",
        "calendar",
        { start: startDate.format(), end: endDate.format() },
      ],
    });
  };

  const deleteReminder = async (taskId: string) => {
    try {
      await api.delete(`/tasks-log/${taskId}`);
      await invalidateQueries();
      toast(<span className={`${fontSaira} text-indigo-200`}>Updated</span>);
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const completeReminder = async ({ day, reminderId, taskId }: CreateLog) => {
    if (!taskId) return;

    try {
      await api.post("/tasks-log", {
        day,
        reminderId,
        taskId,
      });

      await invalidateQueries();

      toast(<span className={`${fontSaira} text-indigo-200`}>Completed</span>);
    } catch (error) {
      console.error("Error completing reminder:", error);
    }
  };

  return {
    utils: {
      selectDate,
      dateSelected,
    },
    handles: {
      handleView,
      handleNow,
      deleteReminder,
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
  const { utils, handles, datas, constants } = useReminders();
  const { handleView, handleNow, ...rest } =
    handles;
  const { selectDate, dateSelected } = utils;
  const { next, back } = rest;
  const { startDate, endDate, view } = constants;
  const { reminders } = datas;

  return (
    <section className="flex flex-col mt-4 gap-2 w-full rounded-md z-10 overflow-x-hidden">
      <CenterSection className="py-2 flex-wrap gap-2 p-2 border-b justify-between flex overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <header className="flex items-center gap-3">
          <CgGoogleTasks size={20} />
          <span
            className={`${fontSaira} font-semibold text-gray-500 dark:text-indigo-200`}
          >
            Calendário
          </span>
        </header>
        <div className="flex items-center gap-2">
          <div
            className="dark:bg-zinc-900 text-gray-500 dark:text-indigo-100 rounded-md font-semibold flex
            divide-x divide-zinc-200 dark:border-zinc-800 border border-zinc-100 dark:divide-zinc-700 opacity-70 bg-white shadow"
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
              Month
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

      <CenterSection className="grid grid-cols-7 gap-2 p-1 px-2 pb-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = dayjs(startDate).weekday(index);

          return (
            <div
              key={index}
              className="w-full lg:max-w-[16rem] h-auto rounded dark:border-zinc-800 "
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
            const today: boolean = date === dayjs().format("YYYY-MM-DD");
            const isSameMonth: boolean = dayjs(date).isSame(startDate, "month");
            const selected: boolean = dateSelected === date;
            const completeThis = reminders[0]?.tasksLogs?.find(
              (taskLog) => taskLog.day === date && taskLog.id
            );

            return (
              <button
                type="button"
                key={index}
                data-lenght={lenght}
                data-today={today}
                data-same-month={isSameMonth}
                onClick={() => selectDate(date)}
                data-selected={selected}
                className="w-12 lg:w-full flex flex-col relative items-center justify-center lg:justify-start lg:items-start lg:max-w-[16rem] lg:min-h-[6rem] hover:ring-2 min-hh-12 bg-white 
                rounded-full lg:rounded dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 data-[lenght=false]:opacity-80 data-[today=true]:ring-2 
                ring-indigo-500 data-[same-month=false]:opacity-30 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800"
              >
                <header className="font-semibold text-zinc-500 dark:text-indigo-50/60 flex w-full p-1 px-2">
                  <span className={fontSaira}>{dayjs(date)?.format("DD")}</span>
                </header>

                <section className="flex-col p-2 gap-1 hidden lg:flex">
                  {reminders?.[0]?.task?.name && (
                    <ReminderShowComponent
                      name={reminders?.[0]?.task?.name}
                      completed={!!completeThis}
                      date={date}
                    />
                  )}

                  {reminders?.length - 1 > 0 && (
                    <div className="bg-indigo-500/50 border text-black border-indigo-500 dark:text-indigo-200 px-2 rounded font-semibold text-sm opacity-60 mt-1">
                      <span className={fontSaira}>
                        +{reminders?.length - 1} Tasks
                      </span>
                    </div>
                  )}
                </section>

                <span data-lenght={lenght} className="w-4 h-2 bg-blue-500 absolute bottom-0 right-0 rounded-full hidden data-[lenght=true]:flex lg:data-[lenght=true]:hidden lg:hidden"/>
              </button>
            );
          })}
      </CenterSection>

      {dateSelected && (
        <CenterSection className="flex flex-col gap-2 overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded">
          <ViewReminders date={dateSelected} />
        </CenterSection>
      )}
    </section>
  );
}
