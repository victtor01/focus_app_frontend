"use client";

import { Logo } from "@/components/logo/logo";
import { loginSchema, LoginSchemaProps } from "@/schemas/login.schema";
import { api } from "@/utils/api";
import { fontOpenSans, fontSaira } from "@/utils/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRocket } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./login.module.css";

const useLogin = () => {
  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchemaProps) => {
    const res = await api.post("/auth", data);

    toast.success(<span className="text-indigo-200">Login success</span>, {
      autoClose: 1000,
      hideProgressBar: true,
      icon: <FaRocket size={16} className="text-indigo-200" />,
    });

    console.log(res);
  };

  return {
    form,
    handleLogin,
  };
};

export default function Page() {
  const { form, handleLogin } = useLogin();
  const { register } = form;

  return (
    <main
      className={`${styles.background} flex w-full h-screen overflow-auto dark:text-zinc-200`}
    >
      <div className="absolute inset-0 h-full w-full bg-transparent z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

      <section className="z-20 flex w-full max-w-[50rem] m-auto bg-white dark:bg-zinc-800 rounded-3xl border-rose-500 border-r shadow-xl shadow-gray-900/40 overflow-hidden">
        <header className="flex flex-col items-center justify-center border-r border-zinc-400/30 gap-4 w-[50%] bg-gray-900 dark:bg-zinc-900 p-3 text-indigo-100">
          <div className="flex w-full max-w-[12rem] flex-col">
            <h1 className={`${fontSaira} text-3xl font-semibold`}>Login</h1>
            <h2 className={`${fontOpenSans} text-xl	 font-semibold`}>
              Focus you time
            </h2>
          </div>
        </header>

        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="p-12 py-[5rem] flex flex-col gap-3 flex-1 z-60"
        >
          <header className="flex gap-2 items-center">
            <Logo />
          </header>

          <label htmlFor="email" className="flex flex-col mt-2">
            <span>Email</span>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="JoeDoe@gmail.com"
              className="mt-1 p-2 rounded-md bg-gray-100 outline-none dark:bg-zinc-700 dark:text-white"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            <span>Password</span>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="•••••••••••"
              className="mt-1 p-2 rounded-md bg-gray-100 outline-none dark:bg-zinc-700 dark:text-white"
            />
          </label>

          <footer className="mt-5 w-full z-20">
            <button
              type="submit"
              className="w-full p-2 py-3 bg-indigo-600 font-semibold opacity-90 hover:opacity-100 text-white rounded-md"
            >
              <span className={fontSaira}>Go</span>
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
