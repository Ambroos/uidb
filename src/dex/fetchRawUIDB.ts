export type RawUIDB = {
	// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
	devices?: Array<Record<string, any>> | any | null;
	// biome-ignore lint/suspicious/noExplicitAny: UIDB is intentionally untyped, the contents may change
	version?: any;
};

export const fetchRawUIDB = async (): Promise<RawUIDB> => {
	const req = await fetch("https://static.ui.com/fingerprint/ui/public.json");
	return (await req.json()) as RawUIDB;
};
