import { Provider } from "inversify-react";
import React, { type FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { AppContainer } from "../core/AppContainer.js";
import { Router } from "../core/Router.js";
import { RouteMetaUpdater } from "./RouteMetaUpdater.js";

interface ReysinAppProps {
	container: AppContainer;
}

export const ReysinApp: FC<ReysinAppProps> = ({ container }) => {
	const router = container.get<Router>(Router);
	const routes = router.getRoutes();

	return (
		<Provider container={container.container}>
			<BrowserRouter>
				<Routes>
					{routes.map((route, index) => {
						return (
							<Route
								key={index.toString()}
								path={route.path}
								element={route.element}
							/>
						);
					})}
				</Routes>
				<RouteMetaUpdater container={container} />
			</BrowserRouter>
		</Provider>
	);
};
