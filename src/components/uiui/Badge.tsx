import { css } from "#panda/css/css.js";

export function Badge(props: { text: string }) {
	const { text } = props;
	return (
		<span
			className={css({
				backgroundColor: "Neutral-web-unifi-color-neutral-02",
				paddingBlock: "0.5x",
				paddingInline: "1x",
				borderRadius: "standard",
				color: "Text-Text-3",
			})}
		>
			{text}
		</span>
	);
}
