import { FaRocket } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";

export const Pages = {
  home: { name: "Home", icon: FaRocket, size: 16 },
  achievements: { name: "Conquistas", icon: HiMiniTrophy, size: 16 },
} as const;
