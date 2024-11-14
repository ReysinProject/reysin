import type * as http from "node:http";
import type { Connect } from "vite";

export interface ExtendedIncomingMessage extends Connect.IncomingMessage {
	protocol: string | string[];
	get: (name: string) => string | string[] | undefined;
	originalUrl?: string;
}

export interface ExtendedServerResponse extends http.ServerResponse {
	redirect: (status: number, url: string) => void;
	status: (code: number) => any;
	set: (field: string | Record<string, string>, value?: string) => any;
}
