import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";
import { getDeviceRawData } from "#dex/getters.js";
import { css } from "#panda/css/css.js";
import { Spinner } from "./uiui/Spinner";

/**
 * Shows a "See All Details as JSON" button, and when clicked will Suspense load in the RAW JSON + render it.
 */
export function SeeRawDeviceJSON(props: { id: string }) {
	const { id } = props;
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			{!isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen((v) => !v)}
					className={css({
						color: "Primary-web-unifi-color-ublue-06",
						cursor: "pointer",
					})}
				>
					{isOpen ? "Hide Raw JSON" : "See All Details as JSON"}
				</button>
			)}
			{isOpen && (
				<Suspense
					fallback={
						<div>
							<Spinner />
							<p className={css({ marginTop: "1x", fontSize: "[10px]" })}>
								(note from Ambroos: it's actually fast, 2 seconds bonus seconds
								to enjoy the spinner)
							</p>
						</div>
					}
				>
					<SuspenseRawDeviceJSON id={id} />
				</Suspense>
			)}
		</div>
	);
}

function SuspenseRawDeviceJSON(props: { id: string }) {
	const { id } = props;
	const getData = useServerFn(getDeviceRawData);
	const { data } = useSuspenseQuery({
		queryKey: ["deviceRawData", id],
		queryFn: async () => {
			// Adding 3 seconds artificial delay just to demo the spinner 😬
			await new Promise((r) => setTimeout(r, 3000));
			return getData({ data: { id } });
		},
	});
	return (
		<div
			className={css({
				backgroundColor: "Neutral-web-unifi-color-neutral-01",
				padding: "2x",
				marginTop: "2x",
				borderRadius: "card",
				maxWidth: "100%",
				overflowX: "scroll",
			})}
		>
			<pre>{JSON.stringify(data.rawDevice, null, 2)}</pre>
		</div>
	);
}
