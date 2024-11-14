import React from "react";
import type { RouteObject } from "react-router-dom";
import type {
	ExtendedIncomingMessage,
	ExtendedServerResponse,
} from "./interfaces.js";
import {createStaticRouter, StaticHandlerContext, StaticRouterProvider} from "react-router-dom/server.js";
import ReactDOMServer from "react-dom/server";

interface RenderOptions {
	routes: RouteObject[];
	context: StaticHandlerContext;
}

export async function renderApp(
	_req: ExtendedIncomingMessage,
	_res: ExtendedServerResponse,
	options: RenderOptions,
): Promise<string> {
	const { routes, context } = options;
	const router = createStaticRouter(routes, context);

	const html = ReactDOMServer.renderToString(
		<StaticRouterProvider router={router} context={context} />,
	);

	return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Reysin App</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script type="module" src="/src/entry-client.tsx"></script>
            </body>
        </html>`;
}
