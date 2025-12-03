import { DynamicIcon } from "lucide-react/dynamic";
import type { DexProperties, UIDBDevice } from "#dex/types.js";
import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";
import { SeeRawDeviceJSON } from "./SeeRawDeviceJSON";
import { Badge } from "./uiui/Badge";
import { ProductImage } from "./uiui/ProductImage";

export type FingerprintProps = {
	className?: string;
	device?: UIDBDevice;
	lineName?: string;
	properties?: DexProperties;
};

/**
 * Device fingerprint component
 */
export function Fingerprint(props: FingerprintProps) {
	const { device, lineName, properties, className } = props;
	return (
		<div
			className={cx(
				className,
				css({
					marginTop: "4x",
					display: "flex",
					alignItems: "flex-start",
					width: "100%",
					maxWidth: "[768px]",
					gap: "4x",
				}),
			)}
		>
			{/* Image */}
			<div
				className={css({
					padding: "2x",
					flexShrink: device?.imageID ? 0 : 1,
					backgroundColor: "Neutral-web-unifi-color-neutral-01",
					borderRadius: "card",
				})}
			>
				{device?.imageID ? (
					<ProductImage
						className={css({ width: "[260px]", height: "[260px]" })}
						productId={device.id}
						imageId={device.imageID}
						sizes={"260px"}
					/>
				) : (
					<div
						className={css({
							width: "[260px]",
							height: "[260px]",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							textStyle: "caption",
						})}
					>
						{device?.name ?? device?.sku ?? "?"}
					</div>
				)}
			</div>
			{/* Right side */}
			<div
				className={css({
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					gap: "2x",
					contain: "inline-size",
				})}
			>
				{/* Headers */}
				<div
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "0.5x",
					})}
				>
					<h2 className={css({ textStyle: "headingXlarge1" })}>
						{device?.name ?? device?.sku}
					</h2>
					<p
						className={css({ textStyle: "bodyPrimary", color: "Text-Text-3" })}
					>
						{lineName}
					</p>
				</div>
				{/* Properties */}
				{properties && (
					<ul>
						{properties.map((prop) => (
							<li
								key={prop.label}
								className={css({
									marginBlock: "1x",
									display: "flex",
									flexDirection: "row",
									width: "100%",
									justifyContent: "space-between",
								})}
							>
								<div
									className={css({
										/* width: "[50%]" */
									})}
								>
									{prop.label}
								</div>
								<ul
									className={css({
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-end",
										color: "Text-Text-3",
									})}
								>
									{prop.contents.map((line, index) => {
										const id = line.text ?? line.icon;
										return (
											<li
												key={id ?? index}
												className={css({
													display: "inline-flex",
													alignItems: "center",
													gap: "0.5x",
												})}
											>
												{line.icon ? (
													<DynamicIcon name={line.icon} size={20} />
												) : null}
												{line.text}
												{line?.badges?.map((badge) => (
													<Badge key={badge} text={badge} />
												))}
											</li>
										);
									})}
								</ul>
							</li>
						))}
					</ul>
				)}
				{/* Raw JSON link + pre */}
				{device?.id ? <SeeRawDeviceJSON id={device.id} /> : null}
			</div>
		</div>
	);
}
