import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { Button, LinkButton } from "./uiui/Button";

export function BackOrIndexButton() {
	const router = useRouter();
	const canGoBack = useCanGoBack();

	if (canGoBack) {
		// If we can go back, doing that restores the scroll position etc.
		return (
			<Button onClick={() => router.history.back()} icon="chevron-left">
				Back
			</Button>
		);
	}

	// Otherwise just go home
	return (
		<LinkButton to="/" icon="chevron-left">
			Back
		</LinkButton>
	);
}
