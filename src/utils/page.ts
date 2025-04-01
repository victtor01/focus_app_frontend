import { CgGoogleTasks } from "react-icons/cg";
import { FaRocket } from "react-icons/fa";
import { TbClockHour3Filled } from "react-icons/tb";

export const Pages = {
  home: { name: "Tasks Log", icon: FaRocket, size: 16 },
  tasks: { name: "All Tasks", icon: CgGoogleTasks, size: 16 },
  reminders: { name: "Reminders", icon: TbClockHour3Filled, size: 16 },
} as const;
