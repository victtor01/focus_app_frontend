import { ButtonTheme } from "@/components/button-theme";
import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import { TbClockHour3Filled } from "react-icons/tb";
import { AllTasks } from "./all-tasks";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <header className="w-full px-2 flex border-b dark:border-zinc-600 border-zinc-200 bg-transparent text-gray-500 dark:text-zinc-200">
        <CenterSection className="p-0 justify-between items-center">
          <div className="flex gap-7">
            <Link
              href="#"
              className="py-3 flex gap-2 items-center font-semibold border-b-2 border-indigo-400 text-indigo-500 dark:text-indigo-300"
            >
              <FaRocket size={16} />
              <span className={`${fontSaira}`}>All Tasks</span>
            </Link>
            <Link
              href="#"
              className="py-3 flex gap-2 items-center font-semibold border-b-2 border-transparent text-zinc-400"
            >
              <TbClockHour3Filled size={16} />
              <span className={`${fontSaira}`}>Reminders</span>
            </Link>
          </div>

          <div>
            <ButtonTheme />
          </div>
        </CenterSection>
      </header>

      <AllTasks/>
    </div>
  );
}
