import { Link } from "@tanstack/react-router";
import { css } from "#panda/css/css.js";
import { Logo } from "./uiui/Logo";

export default function Header() {
	return (
		<header
			className={css({
				display: "flex",
				alignItems: "center",
				textStyle: "bodyPrimary",
				width: "100%",
				height: "headerHeight",
				backgroundColor: "Neutral-web-unifi-color-neutral-02",
			})}
		>
			<Link to="/">
				<Logo fitHeight className={css({ padding: "1x" })} />
			</Link>
			<h1
				className={css({
					marginInline: "2x",
					color: "Text-web-unifi-text-3",
				})}
			>
				Devices
			</h1>
			<div className={css({ flexGrow: 1 })}></div> {/* middle spacer */}
			<p
				className={css({ marginInline: "4x", color: "Text-web-unifi-text-3" })}
			>
				Ambroos Vaes
			</p>
		</header>
	);
}
