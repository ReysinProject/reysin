import createIndexPlugin from "../../plugins/createIndexPlugin.js";

export function getPluginsConfig() {
	return [
		createIndexPlugin({
			pages: {
				"/": {
					title: "Home Page",
					meta: [{ name: "description", content: "This is the home page" }],
					layout: "path/to/layout.html",
				},
				"/about": {
					title: "About Page",
					meta: [{ name: "description", content: "This is the about page" }],
					layout: "path/to/layout.html",
				},
			},
			defaultLayout: "path/to/default-layout.html",
		}),
	];
}
