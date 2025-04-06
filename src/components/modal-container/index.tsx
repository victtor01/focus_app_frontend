"use client";

import { fontOpenSans, fontSaira } from "@/utils/fonts";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const ModalBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, className } = props;
  const style = twMerge(
    "fixed top-0 left-0 w-full h-screen overflow-auto px-4 flex flex-col bg-gray-50 dark:bg-zinc-950 backdrop-blur-[1px] z-20",
    className
  );

  return (
    <motion.div
      transition={{ type: "keyframes", duration: 0.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={style}
    >
      {children}
    </motion.div>
  );
};

const ModalContainer = (props: HTMLAttributes<HTMLFormElement>) => {
  const { children, className, ...rest } = props;
  const style = twMerge(
    " w-full flex flex-col w-full max-w-[20rem] h-auto bg-white dark:bg-zinc-900/40 m-auto",
    className
  );

  return (
    <form className={style} {...rest}>
      {children}
    </form>
  );
};

const ModalHeader = (
  props: HTMLAttributes<HTMLDivElement> & { title?: string }
) => {
  const { className, title = "Modal" } = props;
  const style = twMerge(
    "w-full p-1 flex justify-between items-center",
    className
  );

  return (
    <header className={style}>
      <div className={`${fontOpenSans} text-lg`}>
        <h1 className={fontSaira}>{title}</h1>
      </div>
      <Link href="?">close</Link>
    </header>
  );
};

const modal = {
  background: ModalBackground,
  form: ModalContainer,
  header: ModalHeader,
};

export { modal };
