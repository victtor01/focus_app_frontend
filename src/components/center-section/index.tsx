import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CenterSectionProps extends HTMLAttributes<HTMLDivElement> {}

export function CenterSection ({ children, ...props }: CenterSectionProps) {
	const className = twMerge("w-full mx-auto max-w-[50rem] flex gap-2", props.className);

	return (
		<div className={className}>
			{children}

		</div>
	)
}