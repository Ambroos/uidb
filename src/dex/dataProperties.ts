import type { DexLine, DexProperties, DexProperty, UIDBDevice } from "./types";

/**
 * This is where the main mapping from raw UIDB JSON happens, for grids and lists.
 * We extract only the properties we need to render the basic device info.
 */
export function rawDeviceToDevice(
	// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
	raw: any,
): { device: UIDBDevice; lineName: string | undefined } | undefined {
	const id = // ID is the one thing we must have to render
		raw && typeof raw === "object" && typeof raw.id === "string"
			? raw.id
			: undefined;
	if (!id) {
		return undefined;
	}

	return {
		device: {
			id,
			name: // robustness can be added if needed
				s(raw?.product?.name) ??
				s(raw?.product?.abbrev) ??
				s(raw?.sku) ??
				sa(raw?.shortnames),
			lineID: s(raw?.line?.id),
			sku: s(raw?.sku),
			imageID: s(raw?.images?.default),
		},
		lineName: s(raw?.line?.name),
	};
}

type PropertyExtractor = [
	string,
	(
		// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
		raw: any,
	) => DexLine | Array<DexLine> | undefined,
];

const PROPERTIES: PropertyExtractor[] = [
	["Product Line", (raw) => tl(raw?.line?.name)],
	["ID", (raw) => tl(raw?.id)],
	["Name", (raw) => tl(raw?.product?.name)],
	["Short Name", (raw) => tl(raw?.product?.abbrev)],
	[
		"WiFi Radios",
		(raw) => {
			const radios = raw?.unifi?.network?.radios;
			if (radios != null && typeof radios === "object") {
				const lines: DexLine[] = [];
				if (radios["6e"]) {
					const line = radioLine(radios["6e"]);
					if (line) {
						lines.push({ text: `6Ghz: ${line}` });
					}
				}
				if (radios.na) {
					const line = radioLine(radios.na);
					if (line) {
						lines.push({ text: `5Ghz: ${line}` });
					}
				}
				if (radios.ng) {
					const line = radioLine(radios.ng);
					if (line) {
						lines.push({ text: `2Ghz: ${line}` });
					}
				}
				if (lines.length > 0) {
					return lines;
				}
			}
			return undefined;
		},
	],
	["Number of Ports", (raw) => tl(raw?.unifi?.network?.numberOfPorts)],
];

function radioLine(
	// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
	singleRadio: any,
): string | undefined {
	const rawSpeed = s(singleRadio?.maxSpeedMegabitsPerSecond);
	const rawGain = s(singleRadio?.gain);
	const rawPower = s(singleRadio?.maxPower);

	if (!rawSpeed && !rawGain && !rawPower) {
		return undefined;
	}

	const speed = rawSpeed ? `${rawSpeed.trim()} Mbps` : undefined;
	const gain = rawGain ? `${rawGain.trim()} dBi` : undefined;
	const power = rawPower ? `${rawPower.trim()} dBm` : undefined;

	// Goal is `speed (gain, power)`
	const parts: string[] = [
		speed,
		gain || power ? " (" : undefined,
		[gain, power]
			.filter((part): part is string => part !== undefined)
			.join(", "),
		gain || power ? ")" : undefined,
	].filter((part): part is string => part !== undefined);

	return parts.join("").trim() || undefined;
}

/**
 * Takes the configured properties above and extracts them from the raw device data.
 */
export function propertiesFromRawDevice(
	// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
	raw: any,
): DexProperties {
	return PROPERTIES.map(([label, extractor]) => {
		const line = extractor(raw);
		if (line) {
			const contents = Array.isArray(line) ? line : [line];
			return {
				label,
				contents,
			};
		}
		return undefined;
	}).filter((prop): prop is DexProperty => prop !== undefined);
}

// Utility functions below

/**
 * Safely convert a raw value to string, if possible
 */
function s(value: unknown): string | undefined {
	if (typeof value === "string") {
		return value;
	}
	if (typeof value === "number") {
		return value.toString();
	}
	return undefined;
}

/**
 * Safely convert a raw value to string, if possible
 * Allows taking the first string from an array
 */
function sa(value: unknown): string | undefined {
	if (Array.isArray(value)) {
		for (const v of value) {
			const sv = s(v);
			if (sv !== undefined) {
				return sv;
			}
		}
		return undefined;
	}
	return s(value);
}

/** Text line from raw data */
function tl(value: unknown): DexLine | undefined {
	const svalue = s(value);
	if (svalue !== undefined) {
		return { text: svalue };
	}
	return undefined;
}
