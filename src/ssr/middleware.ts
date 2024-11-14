import type * as http from "node:http";
import type { RouteObject } from "react-router-dom";
import type { Connect } from "vite";
import type {
	ExtendedIncomingMessage,
	ExtendedServerResponse,
} from "./interfaces.js";
import { renderApp } from "./renderApp.js";
import { handleSSRRequest } from "./staticHandler.js";

export function createSSRMiddleware(routes: RouteObject[]) {
	return async function ssrMiddleware(
		req: Connect.IncomingMessage,
		res: http.ServerResponse,
		next: Connect.NextFunction,
	) {
		try {
			const enhancedReq = {
				...req,
				protocol: req.headers["x-forwarded-proto"] || "http",
				get: (name: string) => req.headers[name.toLowerCase()],
				originalUrl: req.url,
			};

			const enhancedRes = {
				...res,
				redirect(status: number, url: string) {
					res.writeHead(status, { Location: url });
					res.end();
				},
				status(code: number) {
					res.statusCode = code;
					return this;
				},
				set(field: string | Record<string, string>, value?: string) {
					if (typeof field === "string") {
						res.setHeader(field, value || "");
					} else {
						for (const [key, val] of Object.entries(field)) {
							res.setHeader(key, val);
						}
					}
					return this;
				},
				end(chunk?: string) {
					res.end(chunk);
					return this;
				},
			};

			const context = await handleSSRRequest(
				enhancedReq as ExtendedIncomingMessage,
				enhancedRes as ExtendedServerResponse,
				routes,
			);

			if (context instanceof Response) {
				return enhancedRes.redirect(
					context.status,
					context.headers.get("Location") || "/",
				);
			}

			const html = await renderApp(
				enhancedReq as ExtendedIncomingMessage,
				enhancedRes as ExtendedServerResponse,
				{
					routes,
					context,
				},
			);

			enhancedRes.status(200).set({ "Content-Type": "text/html" }).end(html);
		} catch (error) {
			next(error);
		}
	};
}
