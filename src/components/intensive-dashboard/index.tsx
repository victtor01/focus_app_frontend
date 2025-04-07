"use client";

import { fontSaira } from "@/utils/fonts";
import { FireIcon } from "../fire-icon";

export const IntensiveDashboard = () => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col lg:w-auto w-full gap-0 p-4 h-auto bg-white dark:bg-zinc-900 shadow dark:shadow-black rounded relative">
        <div className="flex items-center gap-3">
          <div className="w-12">
            <FireIcon />
          </div>

          <div
            className={`${fontSaira} flex-1 text-xl flex justify-between font-semibold text-zinc-500 dark:text-indigo-200`}
          >
            <span>255 Intensivos</span>
            <b className="p-1 px-2 bg-zinc-800 rounded-lg text-base">Commit</b>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12"></div>
          <div
            className={`${fontSaira} flex-1 gap-2 justify-between flex text-xl font-semibold text-zinc-500 dark:text-indigo-200`}
          >
            <span>14 Intensivos </span>
            <div className="p-1 px-2 bg-zinc-800 rounded-lg text-base">
              Estudar C#
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
