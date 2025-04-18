"use client";

import { ButtonTheme } from "@/components/button-theme";
import { CenterSection } from "@/components/center-section";
import { fontSaira } from "@/utils/fonts";
import { Pages } from "@/utils/page";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CompleteTask } from "./complete-task";
import { CreateTask } from "./create-task";
import { EditTask } from "./edit-task";

export type ModalType = keyof typeof MODALS;

interface LayoutMainProps {
  children: React.ReactNode;
}

const MODALS = {
  "create-task": CreateTask,
  "edit-task": EditTask,
  "log-task": CompleteTask,
};

export default function LayoutMain({ children }: LayoutMainProps) {
  const params = useSearchParams();
  const modalType = params.get("modal") as ModalType;
  const pathname = usePathname();

  const ModalComponent =
    modalType && MODALS.hasOwnProperty(modalType) ? MODALS[modalType] : null;

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <AnimatePresence mode="wait">
      {ModalComponent && <ModalComponent params={params} key={modalType} />}

      <main className="w-full h-screen overflow-auto dark:bg-zinc-950 bg-white text-gray-600 dark:text-gray-200">
        <header className="w-full flex z-20 border-b dark:border-zinc-800 dark:bg-zinc-950 border-zinc-200 bg-white text-gray-500 dark:text-zinc-200">
          <CenterSection className="p-0 z-20 px-2 justify-between items-center">
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
                      className="py-3 flex gap-2 items-center font-semibold border-b-2 data-[selected=true]:border-indigo-400
                        text-zinc-400 data-[selected=true]:text-indigo-500 dark:text-zinc-500 border-transparent data-[selected=true]:dark:text-indigo-300"
                    >
                      <Icon size={size} />
                      <span className={`${fontSaira}`}>{name}</span>
                    </Link>
                  );
                }
              )}
            </div>
            <div className="relative flex">
              <button
                type="button"
                onClick={() => setOpenSettings((prev) => !prev)}
                className="flex gap-2 p-1 px-2 rounded bg-white dark:bg-zinc-900 items-center relative"
              >
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <span
                      className={`${fontSaira} font-semibold text-sm text-zinc-400 dark:text-indigo-200`}
                    >
                      José Victor
                    </span>
                    <span
                      className={`${fontSaira} font-semibold text-xs text-zinc-400`}
                    >
                      Nivel 1
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full flex relative overflow-hidden">
                    <div className="w-[50%] bg-indigo-500 rounded-full" />
                  </div>
                </div>
                <div className="w-8 h-8 flex bg-gray-200 rounded-full dark:bg-zinc-800"></div>
              </button>
              {openSettings && (
                <div className="absolute flex flex-col w-full overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-700 shadow rounded-md bg-white dark:bg-zinc-800 top-[100%] mt-2">
                  <ButtonTheme />
                </div>
              )}
            </div>
          </CenterSection>
        </header>

        <section className="flex flex-1 h-auto w-full">{children}</section>
      </main>
    </AnimatePresence>
  );
}
