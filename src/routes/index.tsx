import { createFileRoute, Link } from "@tanstack/react-router";
import { getDevices } from "#dex/getters.js";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		return await getDevices();
	},
});

function App() {
	const { ids, devices, lineNames, date, version } = Route.useLoaderData();
	return (
		<div>
			<h1>Start</h1>
			<p>
				UIDB version: {version} (fetched at {date})
			</p>
			<ul>
				{ids.map((id) => {
					const device = devices[id];
					return (
						<li key={id}>
							<Link
								to={`/products/$productId`}
								params={{
									productId: device.id,
								}}
							>
								{device.name} ({device.id})
							</Link>
							{device.lineID ? ` - Line: ${lineNames[device.lineID]}` : ""}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
