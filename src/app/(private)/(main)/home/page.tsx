import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { AllTasks } from "./all-tasks";

export default function Home() {
  return (
    <CenterSection className="flex-col px-2">
      <header className="flex justify-between items-center mt-2">
        <div></div>
        <div>
          <Link
            href="?modal=create-task"
            className="border dark:border-zinc-600 dark:text-indigo-100 dark:bg-zinc-800 flex rounded items-center gap-2 p-1 px-3 opacity-90 hover:opacity-100
            dark:hover:bg-indigo-500 dark:hover:shadow-xl dark:shadow-indigo-500/70 dark:hover:border-indigo-500"
          >
            <span className={fontSaira}>Task</span>
            <FaPlus size={14} />
          </Link>
        </div>
      </header>
      <AllTasks />
    </CenterSection>
  );
}
