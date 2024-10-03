import { Provider } from "inversify-react";
import React, { type FC } from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import type { AppContainer } from "../core/AppContainer.js";
import { Router } from "../core/Router.js";
// import type { RouteDefinition } from "../types/RouteDefinition.js";

interface ReysinAppProps {
	container: AppContainer;
}
// const RouteMetaUpdater: FC<ReysinAppProps> = ({ container }) => {
// 	const location = useLocation();
// 	const router = container.get<Router>(Router);
//
// 	useEffect(() => {
// 		router.applyMetaData(location.pathname);
// 	}, [location, router]);
//
// 	return null;
// };

export const ReysinApp: FC<ReysinAppProps> = ({ container }) => {
	console.log("Rendering ReysinApp with container: ", container.container.id);
	console.log(container);
	const router = container.container.get<Router>(Router);
	const routes = router.getRoutes();

	console.log(routes);
	console.log(router.getRoutes());

	return (
		<Provider container={container.container}>
			{/*<BrowserRouter>*/}
			{/*	<Routes>*/}
			{/*		{routes.map((route, index) => {*/}
			{/*			const app = apps.find((a) => a.getRoutes().includes(route as any));*/}
			{/*			const Layout = app ? app.getLayout() : React.Fragment;*/}
			{/*			return (*/}
			{/*				<Route*/}
			{/*					key={index.toString()}*/}
			{/*					path={route.path}*/}
			{/*					element={*/}
			{/*						<Layout>{React.createElement(route.Component)}</Layout>*/}
			{/*					}*/}
			{/*				/>*/}
			{/*			);*/}
			{/*		})}*/}
			{/*	</Routes>*/}
			{/*	<RouteMetaUpdater container={container} apps={apps} />*/}
			{/*</BrowserRouter>*/}
		</Provider>
	);
};
