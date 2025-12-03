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

export function commonImgSrcSet(
	product: string,
	image: string,
	type: string = "default",
) {
	// These are a bit extravagant, but they cover everything and gzip well enough to not really be an issue
	const sizes = [
		20, 40, 60, 80, 120, 160, 240, 260, 320, 480, 540, 720, 960, 1140,
	]; // common sizes at 1x/2x/3x
	return sizes
		.map((size) => `${imgUrl(product, image, size, type)} ${size}w`)
		.join(", ");
}
