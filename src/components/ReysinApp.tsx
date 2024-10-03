import { Provider } from "inversify-react";
import type { FC } from "react";
import React from "react";
import type { AppContainer } from "../core/AppContainer.js";

interface ReysinAppProps {
	container: AppContainer;
}

export const ReysinApp: FC<ReysinAppProps> = ({ container }) => {
	console.log("Rendering ReysinApp with container: ", container.container.id)
	console.log(container)

	return (
		<Provider container={container.container}>
			<p>NOW ADD ROUTES</p>
		</Provider>
	);
};
