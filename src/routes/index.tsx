import { createFileRoute } from "@tanstack/react-router";
import { DeviceTable } from "#components/DeviceTable.js";
import { Page } from "#components/uiui/Page.js";
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
		<Page>
			<p>
				UIDB version: {version} (fetched at {date})
			</p>
			<DeviceTable idsToShow={ids} devices={devices} lineNames={lineNames} />
		</Page>
	);
}
