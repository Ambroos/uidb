import type { PropsWithChildren } from "react";
import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";

export function Page(props: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cx(css({ marginInline: "4x" }), props.className)}>
			{props.children}
		</div>
	);
}
