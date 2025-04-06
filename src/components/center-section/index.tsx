import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function CenterSection ({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	const className = twMerge("w-full mx-auto max-w-[60rem] flex gap-2", props.className);

	return (
		<div className={className}>
			{children}
		</div>
	)
}