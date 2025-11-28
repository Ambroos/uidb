export const IMAGE_REDIRECTER = `https://images.svc.ui.com/?u=`;
export const IMAGE_BASE = `https://static.ui.com/fingerprint/ui/images/`;
export const IMAGE_QUALITY = 75;

export function imgUrl(
	product: string,
	image: string,
	size: number,
	type: string = "default",
) {
	const encodedUrl = encodeURIComponent(
		`${IMAGE_BASE}${product}/${type}/${image}.png`,
	);
	return `${IMAGE_REDIRECTER}${encodedUrl}&w=${size}&q=${IMAGE_QUALITY}`;
}
