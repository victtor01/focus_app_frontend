"use client";

import { Slide, ToastContainer } from "react-toastify";

export const ToastfyContainer = () => {
  return (
    <ToastContainer
      theme="dark"
      autoClose={1200}
      position="top-center"
      toastClassName="text-normal font-semibold"
      transition={Slide}
      progressClassName="bg-indigo-500"
    />
  );
};
