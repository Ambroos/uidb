import { LoaderCircle } from "lucide-react";
import { css } from "#panda/css/css.js";
import { token } from "#panda/tokens/index.js";

export function Spinner(props: { size?: number }) {
	return (
		<LoaderCircle
			color={token("colors.Text-Text-3")}
			className={css({
				animation: "spin 1s linear infinite",
			})}
			size={props.size ?? 24}
		/>
	);
}
