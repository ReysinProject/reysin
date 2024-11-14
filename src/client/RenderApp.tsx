import React, { type ReactNode } from "react";
import { Suspense, useEffect, useState } from "react";
import type { RouteObject } from "../interfaces/index.js";

interface AppRouterProps {
	routes: RouteObject[];
}

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="layout">
			<header>My App</header>
			<main>{children}</main>
			<footer>© 2023</footer>
		</div>
	);
}

export function RenderApp(props: AppRouterProps) {
	const [currentRoute, setCurrentRoute] = useState<RouteObject | null>(null);

	useEffect(() => {
		const handleNavigation = () => {
			const pathname = window.location.pathname;
			const route = props.routes.find((r) => r.path === pathname);
			setCurrentRoute(route || null);
		};

		window.addEventListener("popstate", handleNavigation);
		handleNavigation();

		return () => {
			window.removeEventListener("popstate", handleNavigation);
		};
	}, [props.routes]);

	// const navigateTo = (path: string) => {
	//   window.history.pushState({}, '', path);
	//   const route = props.routes.find((r) => r.path === path);
	//   setCurrentRoute(route || null);
	// };

	if (!currentRoute) {
		return <div>Loading...</div>;
	}

	const UsedLayout = currentRoute.layout || Layout;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UsedLayout>
				<currentRoute.component />
			</UsedLayout>
		</Suspense>
	);
}

export default RenderApp;
