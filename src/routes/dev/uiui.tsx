import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "#components/uiui/Logo.js";
import { css } from "#panda/css/css.js";

export const Route = createFileRoute("/dev/uiui")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>Component library</h1>
			<h3>Logo</h3>
			<Logo size={64} />
			<p>Height fit with outer container height</p>
			<div
				className={css({
					height: "[50px]",
					width: "[200px]",
					border: "1px solid hotpink",
					backgroundColor: "Semantic-Destructive-web-unifi-color-red-06",
				})}
			>
				<Logo fitHeight />
			</div>
		</div>
	);
}
