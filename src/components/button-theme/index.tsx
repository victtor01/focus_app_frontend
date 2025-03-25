"use client";

import { FaMoon } from "react-icons/fa";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { TbSunFilled } from "react-icons/tb";

const useButtonTheme = () => {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(Cookies.get("theme") === "dark" || false);
  }, []);

  const getHTML = () =>
    window?.document.getElementsByTagName("html")?.[0] || null;

  const newClass = (html: HTMLElement) => {
    const classList = html.className;
    return classList === "dark" ? "light" : "dark";
  };

  const setNewThemeInCookies = (theme: string) => {
    Cookies.set("theme", theme);
  };

  const handle = () => {
    const html = getHTML();
    if (html) {
      const newClassStyle = newClass(html);
      setNewThemeInCookies(newClassStyle);
      setDark(newClassStyle === "dark");
      html.className = newClassStyle;
    }
  };

  return {
    dark,
    handle,
  };
};

export const ButtonTheme = () => {
  const { dark, handle } = useButtonTheme();

  if (dark === null) return;

  return (
    <button
      type="button"
      onClick={handle}
      className="w-8 h-8 grid place-items-center text-gray-500 hover:opacity-100 dark:text-gray-100 opacity-80 bg-zinc-200  dark:bg-zinc-700 rounded-md"
    >
      {!dark && <TbSunFilled size={12} />}

      {dark && <FaMoon size={12} />}
    </button>
  );
};
