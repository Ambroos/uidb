import { createServerFn } from "@tanstack/react-start";
import { indexUIDB } from "./dataProcessor";
import { propertiesFromRawDevice, rawDeviceToDevice } from "./dataProperties";
import { fetchRawUIDB } from "./fetchRawUIDB";

const getData = createServerFn({ method: "GET" })
	// import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
	// .middleware([staticFunctionMiddleware]) // broken but would be _lovely_
	.handler(async () => {
		const raw = await fetchRawUIDB();
		const { ids, devices, lineNames, rawDevices, version } = indexUIDB(raw);
		return {
			ids,
			devices,
			lineNames,
			rawDevices,
			version,
			date: new Date().toISOString(),
			rawUIDB: raw,
		};
	});

export const getDevices = createServerFn({ method: "GET" }).handler(
	async () => {
		const { ids, devices, lineNames, version, date } = await getData();
		return { ids, devices, lineNames, version, date };
	},
);

export const getDeviceProperties = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const { rawDevices, version, date } = await getData();
		const rawDevice = rawDevices[data.id];
		if (!rawDevice) return;
		const properties = propertiesFromRawDevice(rawDevice);
		const deviceResult = rawDeviceToDevice(rawDevice);
		const device = deviceResult?.device;
		const lineName = deviceResult?.lineName;
		return { properties, device, lineName, version, date };
	});

export const getDeviceRawData = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const { rawDevices, version, date } = await getData();
		const rawDevice = rawDevices[data.id];
		return { rawDevice, version, date };
	});
