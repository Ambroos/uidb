import { createFileRoute, notFound } from "@tanstack/react-router";
import { Fingerprint } from "#components/Fingerprint.js";
import { LinkButton } from "#components/uiui/Button.js";
import { Page } from "#components/uiui/Page.js";
import { getDeviceProperties } from "#dex/getters.js";
import { css } from "#panda/css/css.js";

export const Route = createFileRoute("/products/$productId")({
	loader: async ({ params }) => {
		const { productId } = params;
		const data = await getDeviceProperties({
			data: { id: productId },
		});
		if (!data) {
			throw notFound();
		}
		return data;
	},
	component: ProductPage,
	notFoundComponent: () => <div>Yikes...</div>,
});

function ProductPage() {
	const { properties, device, lineName } = Route.useLoaderData();
	return (
		<Page>
			<div
				className={css({
					marginBlock: "2x",
					display: "flex",
					justifyContent: "space-between",
				})}
			>
				<LinkButton to="/" icon="chevron-left">
					Back
				</LinkButton>
				{/* TODO: previous/next buttons */}
			</div>
			<div
				className={css({
					display: "flex",
					width: "100%",
					justifyContent: "center",
				})}
			>
				<Fingerprint
					device={device}
					lineName={lineName}
					properties={properties}
				/>
			</div>
		</Page>
	);
}
