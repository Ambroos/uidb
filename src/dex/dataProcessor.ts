/**
 * UIDB is a big JSON of Ubiquiti devices.
 * The schema may change, the contents will change.
 * In this file we extract the data we need to build our viewer.
 */

import { rawDeviceToDevice } from "./dataProperties.js";
import type { RawUIDB } from "./fetchRawUIDB.js";

import type { RawDevice, UIDBDevice } from "./types.js";

/**
 * Index raw UIDB data into structured product basics.
 * This part only builds the device index.
 */
export function indexUIDB(raw: RawUIDB): {
	ids: string[];
	devices: Record<string, UIDBDevice>;
	rawDevices: Record<string, RawDevice>;
	lineNames: Record<string, string>;
	version?: string;
} {
	const devicesArray = Array.isArray(raw.devices)
		? raw.devices
		: typeof raw.devices === "object" && raw.devices !== null
			? Object.values(raw.devices)
			: [];

	const devices = new Map<string, UIDBDevice>();
	const rawDevices = new Map<string, RawDevice>();
	const lineNames = new Map<string, string>();

	for (const rawDevice of devicesArray) {
		const { device, lineName } = rawDeviceToDevice(rawDevice) ?? {};
		if (device) {
			devices.set(device.id, device);
			rawDevices.set(device.id, rawDevice);
		}
		if (device?.lineID && lineName) {
			lineNames.set(device.lineID, lineName);
		}
	}

	return {
		ids: Array.from(devices.keys()),
		devices: Object.fromEntries(devices),
		rawDevices: Object.fromEntries(rawDevices),
		lineNames: Object.fromEntries(lineNames),
		version: raw?.version ? String(raw.version) : undefined,
	};
}
