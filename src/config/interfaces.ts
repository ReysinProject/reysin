export interface ReysinConfig {
	app: {
		title: string;
		description: string;
	};
	server: {
		port: number;
		base: string;
		host: boolean;
		outDir: string;
		assetsDir: string;
	};
	framework: {
		appPath: string;
		apps: string[];
	};
}
