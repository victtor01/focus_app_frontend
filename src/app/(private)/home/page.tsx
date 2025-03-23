import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { TbClockHour3Filled } from "react-icons/tb";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 text-zinc-200">
      <header className="w-full flex border-b border-zinc-600 bg-transparent">
        <CenterSection className="p-0 justify-between items-center">
          <div className="flex gap-7">
            <Link
              href="#"
              className="py-3 flex gap-2 items-center font-semibold border-b-2 border-indigo-400 text-indigo-300"
            >
              <FaRocket size={16} />
              <span className={`${fontSaira}`}>All Tasks</span>
            </Link>
            <Link
              href="#"
              className="py-3 flex gap-2 items-center font-semibold border-b-2 border-transparent text-zinc-400"
            >
              <TbClockHour3Filled size={16} />
              <span className={`${fontSaira}`}>All Tasks</span>
            </Link>
          </div>

          <div>
            <button className="w-8 h-8 grid place-items-center hover:opacity-100 opacity-80 bg-zinc-700 rounded-md">
              <FaMoon size={12}/>
            </button>
          </div>
        </CenterSection>
      </header>
    </div>
  );
}
