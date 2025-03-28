"use client";

import { ButtonTheme } from "@/components/button-theme";
import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import { TbClockHour3Filled } from "react-icons/tb";
import { CreateTask } from "./create-task";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { CgGoogleTasks } from "react-icons/cg";

interface LayoutMainProps {
  children: React.ReactNode;
}

export type ModalType = keyof typeof MODALS;

const animations = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
} satisfies MotionProps;

const MODALS = {
  "create-task": CreateTask,
};

export default function LayoutMain({ children }: LayoutMainProps) {
  const params = useSearchParams();
  const modalType = params.get("modal") as ModalType;

  const ModalComponent =
    modalType && MODALS.hasOwnProperty(modalType) ? MODALS[modalType] : null;

  return (
    <AnimatePresence>
      {ModalComponent && <ModalComponent params={params} key={modalType} />}

      {!ModalComponent && (
        <motion.main
          variants={animations}
          key="main"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "keyframes", duration: 0.2 }}
          className="w-full h-screen overflow-auto"
        >
          <header className="w-full flex border-b dark:border-zinc-600 border-zinc-200 bg-transparent text-gray-500 dark:text-zinc-200">
            <CenterSection className="p-0 px-2 justify-between items-center">
              <div className="flex gap-7">
                <Link
                  href="#"
                  className="py-3 flex gap-2 items-center font-semibold border-b-2 border-indigo-400 text-indigo-500 dark:text-indigo-300"
                >
                  <FaRocket size={16} />
                  <span className={`${fontSaira}`}>Tasks log</span>
                </Link>
                <Link
                  href="#"
                  className="py-3 flex gap-2 items-center font-semibold border-b-2 border-transparent text-zinc-400"
                >
                  <CgGoogleTasks />
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
              <ButtonTheme />
            </CenterSection>
          </header>

          <section className="flex flex-1 h-auto w-full">{children}</section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
