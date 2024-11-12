import { type AppContainer, Reysin, ReysinApp } from "@reysin/project";
import React from "react";

new Reysin((container: AppContainer) => {
	return (
		<React.StrictMode>
			<ReysinApp container={container} />
		</React.StrictMode>
	);
});
