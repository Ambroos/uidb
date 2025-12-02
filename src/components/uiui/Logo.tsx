import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";
import LogoSvg from "./icons/logo.svg?react";

export type LogoProps = {
	className?: string;
	fitWidth?: boolean;
	fitHeight?: boolean;
	size?: number;
}; /**
 * Logo component. 32px by default. Set fitWidth or fitHeight to make responsive (and always square).
 * @param props
 */
export function Logo(props: LogoProps) {
	const { fitWidth, fitHeight, size = 32 } = props;
	return (
		<div
			className={cx(
				props.className,
				css({
					backgroundColor: "bg.inverseHoverable",
					aspectRatio: "1 / 1",
					_hover: {
						backgroundColor: "bg.inverseHoverable.hover",
					},
				}),
				"group",
			)}
			style={{
				width: fitWidth ? "100%" : fitHeight ? "" : size,
				height: fitHeight ? "100%" : fitWidth ? "" : size,
			}}
		>
			<LogoSvg
				className={css({
					width: "100%",
					height: "100%",
					"& path": {
						fill: "Neutral-web-unifi-color-neutral-10",
						_groupHover: {
							fill: "Primary-web-unifi-color-ublue-06",
						},
					},
				})}
				role="img"
				aria-label="Ubiquiti Logo"
			/>
		</div>
	);
}
