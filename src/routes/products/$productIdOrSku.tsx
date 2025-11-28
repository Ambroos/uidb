import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getDeviceProperties } from "#dex/getters.js";

export const Route = createFileRoute("/products/$productIdOrSku")({
	loader: async ({ params }) => {
		const { productIdOrSku } = params;
		const data = await getDeviceProperties({
			data: { idOrSku: productIdOrSku },
		});
		if (!data) {
			throw notFound();
		}
		const { properties, version, date, sku } = data;
		if (sku && sku.toLowerCase() !== productIdOrSku) {
			throw redirect({
				to: "/products/$productIdOrSku",
				params: { productIdOrSku: sku.toLowerCase() },
			});
		}
		return { properties, version, date };
	},
	component: ProductPage,
	notFoundComponent: () => <div>Yikes...</div>,
});

function ProductPage() {
	const { properties, date, version } = Route.useLoaderData();
	const { productIdOrSku } = Route.useParams();
	return (
		<div>
			<h2>Product page</h2>
			<p>{productIdOrSku}</p>
			<p>
				UIDB version: {version} (fetched at {date})
			</p>
			<ul>
				{properties.map((prop) => (
					<li key={prop.label}>
						<strong>{prop.label}:</strong>
						<ul>
							{prop.contents.map((line, index) => {
								const id = line.text ?? line.icon;
								return (
									<li key={id ?? index}>
										{line.icon ? <small>todo icon</small> : null}
										{line.text}
									</li>
								);
							})}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
