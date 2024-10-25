import { type FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { AppContainer } from "../core/AppContainer.js";
import { Router } from "../core/Router.js";

interface RouteMetaUpdaterProps {
	container: AppContainer;
}

export const RouteMetaUpdater: FC<RouteMetaUpdaterProps> = ({ container }) => {
	const location = useLocation();
	const router = container.get<Router>(Router);

	useEffect(() => {
		router.applyMetaData(location.pathname);
	}, [location, router]);

	return null;
};
