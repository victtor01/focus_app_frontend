"use client";

import { ButtonTheme } from "@/components/button-theme";
import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import { Pages } from "@/utils/page";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CreateTask } from "./create-task";
import { EditTask } from "./edit-task";

export type ModalType = keyof typeof MODALS;

interface LayoutMainProps {
  children: React.ReactNode;
}

const MODALS = {
  "create-task": CreateTask,
  "edit-task": EditTask,
};

const animations = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
} satisfies MotionProps;

export default function LayoutMain({ children }: LayoutMainProps) {
  const params = useSearchParams();
  const modalType = params.get("modal") as ModalType;
  const pathname = usePathname();

  const ModalComponent =
    modalType && MODALS.hasOwnProperty(modalType) ? MODALS[modalType] : null;

  return (
    <AnimatePresence mode="wait">
      {ModalComponent && <ModalComponent params={params} key={modalType} />}

      {!ModalComponent && (
        <motion.main
          variants={animations}
          key="main"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "keyframes", duration: 0.2 }}
          className="w-full h-screen"
        >
          <header className="w-full flex border-b dark:border-zinc-600 border-zinc-200 bg-transparent text-gray-500 dark:text-zinc-200">
            <CenterSection className="p-0 px-2 justify-between items-center">
              <div className="flex gap-7">
                {Object.entries(Pages)?.map(
                  ([link, { name, icon: Icon, size }]) => {
                    const linkT = `/${link}`;
                    const selected = pathname.startsWith(linkT);

                    return (
                      <Link
                        key={name}
                        href={linkT}
                        data-selected={selected}
                        className="py-3 flex gap-2 items-center font-semibold border-b-2 data-[selected=true]:border-indigo-400 data-[selected=true]:scale-[1.05]
                        text-zinc-400 data-[selected=true]:text-indigo-500 dark:text-zinc-500 border-transparent data-[selected=true]:dark:text-indigo-300"
                      >
                        <Icon size={size} />
                        <span className={`${fontSaira}`}>{name}</span>
                      </Link>
                    );
                  }
                )}
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
