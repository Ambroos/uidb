/**
 * Product image component
 * Width should be fixed by a className provided to this component to make srcset behave. Height is auto with aspect ratio.
 */

import { css } from "#panda/css/css.js";
import { cx } from "#panda/css/cx.js";
import { commonImgSrcSet, imgUrl } from "#utils/imgUrl.js";

export function ProductImage(props: {
	productId: string;
	imageId: string;
	sizes: string;
	productName?: string;
	className?: string;
	fallbackSize?: number;
}) {
	const {
		productId,
		imageId,
		sizes,
		productName,
		className,
		fallbackSize = 120,
	} = props;
	const srcSet = commonImgSrcSet(productId, imageId);
	const src = imgUrl(productId, imageId, fallbackSize);
	return (
		<img
			loading="lazy"
			srcSet={srcSet}
			src={src}
			alt={productName ? `Image of ${productName}` : "Product image"}
			className={cx(
				css({ objectFit: "contain", aspectRatio: "1 / 1" }),
				className,
			)}
			sizes={sizes}
		/>
	);
}
