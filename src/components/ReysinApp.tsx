import { Provider } from "inversify-react";
import type { FC } from "react";
import React from "react";
import type { AppContainer } from "../core/AppContainer.js";

interface ReysinAppProps {
	container: AppContainer;
}

export const ReysinApp: FC<ReysinAppProps> = ({ container }) => {
	return (
		<Provider container={container.container}>
			<p>NOW ADD ROUTES</p>
		</Provider>
	);
};
