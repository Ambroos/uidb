import { createLink } from "@tanstack/react-router";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { PropsWithChildren } from "react";
import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";
import { token } from "#panda/tokens/index.js";

export type ButtonProps = PropsWithChildren<{
	onClick?: () => void;
	className?: string;
	icon: IconName;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}>;

export function Button(props: ButtonProps) {
	const { onClick, className, type = "button", icon, children } = props;
	return (
		<button
			type={type}
			onClick={onClick}
			className={cx(
				css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "Text-Text-3",
					padding: "0.5x",
					borderRadius: "standard",
					boxShadow: "Shadow-low-light",
					cursor: "pointer",
				}),
				className,
			)}
		>
			{icon && (
				<DynamicIcon
					name={props.icon}
					size={16}
					color={token("colors.Text-Text-3")}
				/>
			)}
			{children}
		</button>
	);
}

export const LinkButton = createLink(Button);
