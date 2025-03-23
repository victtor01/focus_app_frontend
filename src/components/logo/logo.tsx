import { fontSaira } from "@/utils/fonts";
import "./logo.css"

export const Logo = () => {
  return (
    <div
      className={`${fontSaira} logo text-2xl text-gray-600 dark:text-indigo-100 font-bold`}
    >
      FOCUS APP
    </div>
  );
};
