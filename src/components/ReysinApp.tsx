import {Provider} from "inversify-react";
import type {AppContainer} from "../core/AppContainer.js";
import type {FC} from "react";
import React from "react";

interface ReysinAppProps {
	container: AppContainer;
}

const ReysinApp: FC<ReysinAppProps> = ({container}) => {

	return (
		<Provider container={container.container}>
			<p>NOW ADD ROUTES</p>
		</Provider>
	)
}

export default ReysinApp;