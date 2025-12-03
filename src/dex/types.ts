import type { IconName } from "lucide-react/dynamic";

/**
 * A core UIDB device, for indexes.
 */
export type UIDBDevice = {
	id: string;
	name?: string;
	lineID?: string;
	sku?: string;
	imageID?: string;
};

/**
 * Raw device as in the UIDB JSON.
 */
// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
export type RawDevice = any;

/**
 * The full set of UIDB devices, indexed by ID.
 */
export type UIDBDevices = Record<string, UIDBDevice>;

/**
 * Renderable properties
 */

/**
 * A single renderable data value line
 */
export type DexLine = { text?: string; badges?: string[]; icon?: IconName };

/**
 * Base property with just a label
 */
export type DexProperty = {
	label: string;
	contents: Array<DexLine>;
};

/**
 * A list of renderable properties
 * Could be expanded and split into sections later
 */
export type DexProperties = Array<DexProperty>;
