"use client";

import rawAnimationData from "./fire-icon-animation.json";
import { useLottie } from "lottie-react";

export const FireIcon = () => {
  const animationData = JSON.parse(JSON.stringify(rawAnimationData)); // deep copy

  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions, { });

  return (
    <div className="w-12 bg-purple-500/20 rounded-full">
      {View}
    </div>
  );
};

