"use client";

import { fontSaira } from "@/utils/fonts";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface ModalDefaultProps extends HTMLAttributes<HTMLDivElement> {}

interface ModalFormProps extends HTMLAttributes<HTMLFormElement> {}

const ModalBackground = (props: ModalDefaultProps) => {
  const { children, className } = props;
  const style = twMerge(
    "fixed top-0 left-0 w-full h-screen overflow-auto px-4 flex flex-col bg-indigo-50 dark:bg-zinc-900/80 backdrop-blur-[1px] z-20",
    className
  );

  return (
    <motion.div
      transition={{ type: "keyframes", duration: 0.1 }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1 }}
      className={style}
    >
      {children}
    </motion.div>
  );
};

const ModalContainer = (props: ModalFormProps) => {
  const { children, className, ...rest } = props;
  const style = twMerge(
    " w-full overflow-auto flex flex-col w-full max-w-[20rem] bg-white dark:bg-zinc-800 m-auto",
    className
  );

  return (
    <form className={style} {...rest}>
      {children}
    </form>
  );
};

const ModalHeader = (props: ModalDefaultProps & { title?: string }) => {
  const { className, title = "Modal", ...rest } = props;
  const style = twMerge(
    "w-full p-1 flex justify-between items-center",
    className
  );

  return (
    <header className={style}>
      <div className="text-lg">
        <h1 className={fontSaira}>{title}</h1>
      </div>
      <Link href="?">close</Link>
    </header>
  );
};

const modal = {
  background: ModalBackground,
  container: ModalContainer,
  header: ModalHeader,
};

export { modal };
