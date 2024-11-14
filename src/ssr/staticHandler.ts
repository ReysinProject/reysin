import type * as http from "node:http";
import type { RouteObject } from "react-router-dom";
import {
	type StaticHandlerContext,
	createStaticHandler,
} from "react-router-dom/server.js";
import type { ExtendedIncomingMessage } from "./interfaces.js";

export async function createFetchRequest(
	req: ExtendedIncomingMessage,
): Promise<globalThis.Request> {
	const origin = `${req.protocol}://${req.get("host")}`;
	const url = new URL(req.originalUrl || req.url || "/", origin);

	const headers = new Headers();
	for (const [key, values] of Object.entries(req.headers)) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value);
				}
			} else {
				headers.set(key, values);
			}
		}
	}

	const init: RequestInit = {
		method: req.method || "GET",
		headers,
		cache: "no-cache",
		credentials: "same-origin",
		redirect: "follow",
		referrerPolicy: "strict-origin-when-cross-origin",
	};

	if (req.method !== "GET" && req.method !== "HEAD") {
		const chunks: Buffer[] = [];
		for await (const chunk of req) {
			chunks.push(Buffer.from(chunk));
		}
		init.body = Buffer.concat(chunks);
	}

	return new globalThis.Request(url.href, init);
}

export async function handleSSRRequest(
	req: ExtendedIncomingMessage,
	_res: http.ServerResponse,
	routes: RouteObject[],
): Promise<StaticHandlerContext | Response> {
	const handler = createStaticHandler(routes);
	const fetchRequest = await createFetchRequest(req);
	return await handler.query(fetchRequest);
}
