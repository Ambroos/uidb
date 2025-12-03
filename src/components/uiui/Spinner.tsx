import { LoaderCircle } from "lucide-react";
import { css } from "#panda/css/css.js";

export function Spinner() {
	return (
		<LoaderCircle
			className={css({
				animation: "spin 1s linear infinite",
			})}
		/>
	);
}
