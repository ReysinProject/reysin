import { Provider } from "inversify-react";
import React, { type FC, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import type { AppContainer } from "../core/AppContainer.js";
import { Router } from "../core/Router.js";

interface ReysinAppProps {
	container: AppContainer;
}
const RouteMetaUpdater: FC<ReysinAppProps> = ({ container }) => {
	const location = useLocation();
	const router = container.get<Router>(Router);

	useEffect(() => {
		router.applyMetaData(location.pathname);
	}, [location, router]);

	return null;
};

export const ReysinApp: FC<ReysinAppProps> = ({ container }) => {
	console.log("Rendering ReysinApp with container: ", container.container.id);
	console.log(container);
	const router = container.get<Router>(Router);
	const routes = router.getRoutes();

	console.log(routes);
	console.log(router.getRoutes());
	console.log(router);

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
