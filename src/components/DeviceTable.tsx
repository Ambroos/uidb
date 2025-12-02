import { Link } from "@tanstack/react-router";
import type { UIDBDevice, UIDBDevices } from "#dex/types.js";
import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";
import { ProductImage } from "./uiui/ProductImage";

const cellStyle = css({
	display: "flex",
	alignItems: "center",
	height: "productTable.rowHeight",
	borderBottomWidth: "1px",
	borderBottomStyle: "solid",
	borderBottomColor: "Neutral-Neutral-03-light",
});

const tableHeaderStyle = css({
	textStyle: "headingMedium",
	position: "sticky",
	top: "[0px]",
	backgroundColor: "blurBackdrop",
	backdropFilter: "[blur(2px)]",
});

export type DeviceTableProps = {
	className?: string;
	idsToShow: string[];
	devices: UIDBDevices;
	lineNames: Record<string, string>;
};

export function DeviceTable(props: DeviceTableProps) {
	const { idsToShow, devices, lineNames } = props;
	return (
		<div
			className={cx(
				props.className,
				css({
					display: "grid",
					gridTemplateColumns: "36px 1fr 1fr",
					width: "100%",
					textStyle: "bodyPrimary",
				}),
			)}
		>
			<div
				className={css({
					display: "contents",
				})}
			>
				<div
					className={cx(cellStyle, tableHeaderStyle) /* image column */}
				></div>
				<div className={cx(cellStyle, tableHeaderStyle)}>Product Line</div>
				<div className={cx(cellStyle, tableHeaderStyle)}>Name</div>
			</div>
			<div className={css({ display: "contents" })}>
				{idsToShow.map((id) => {
					const device = devices[id];
					return <DeviceRow key={id} device={device} lineNames={lineNames} />;
				})}
			</div>
		</div>
	);
}

const rowHoverStyle = css({
	_groupHover: {
		backgroundColor: "Neutral-web-unifi-color-neutral-02",
	},
});

function DeviceRow(props: {
	device: UIDBDevice;
	lineNames: Record<string, string>;
}) {
	const { device, lineNames } = props;
	return (
		<Link
			to={`/products/$productId`}
			params={{ productId: device.id }}
			className={cx(
				"group",
				css({
					display: "contents",
					height: "productTable.rowHeight",
				}),
			)}
		>
			<div className={cx(rowHoverStyle, cellStyle)}>
				{device.imageID ? (
					<ProductImage
						productId={device.id}
						imageId={device.imageID}
						productName={device.name}
						sizes="20px"
						className={css({ width: "[20px]", height: "[20px]" })}
					/>
				) : null}
			</div>
			<div className={cx(rowHoverStyle, cellStyle)}>
				{device.lineID ? lineNames[device.lineID] : undefined}
			</div>
			<div className={cx(rowHoverStyle, cellStyle)}>
				{device.name ?? device.sku ?? device.id}
			</div>
		</Link>
	);
}
