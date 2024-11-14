import type { Plugin, ViteDevServer } from "vite";
import fs from "fs";
import path from "path";

interface MetaTag {
	name: string;
	content: string;
}

interface LinkTag {
	rel: string;
	href: string;
}

interface ScriptTag {
	src: string;
	type?: "module" | "text/javascript";
}

interface PageOptions {
	title?: string;
	meta?: MetaTag[];
	links?: LinkTag[];
	scripts?: ScriptTag[];
	layout?: string;
}

interface IndexPluginOptions {
	pages: Record<string, PageOptions>;
	defaultLayout?: string;
}

function generateHtml(options: PageOptions = {}, layout?: string): string {
	const { title = "Vite App", meta = [], links = [], scripts = [] } = options;

	const metaTags = meta
		.map(({ name, content }) => `<meta name="${name}" content="${content}">`)
		.join("\n  ");

	const linkTags = links
		.map(({ rel, href }) => `<link rel="${rel}" href="${href}">`)
		.join("\n  ");

	const scriptTags = scripts
		.map(
			({ src, type = "module" }) =>
				`<script type="${type}" src="${src}"></script>`,
		)
		.join("\n  ");

	const content = `<div id="app"></div>`;

	if (layout) {
		return layout.replace("<!-- CONTENT -->", content);
	}

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${metaTags}
  <title>${title}</title>
  ${linkTags}
</head>
<body>
  ${content}
  ${scriptTags}
</body>
</html>`;
}

function readLayout(layoutPath: string): string | undefined {
	try {
		return fs.readFileSync(layoutPath, "utf-8");
	} catch (error) {
		console.error(`Error reading layout file: ${layoutPath}`);
		return undefined;
	}
}

export default function createIndexPlugin(
	options: IndexPluginOptions = { pages: {} },
): Plugin {
	return {
		name: "generate-index",

		configureServer(server: ViteDevServer): () => void {
			return () => {
				server.middlewares.use((req, res, next) => {
					const url = req.url || "/";
					const pageOptions = options.pages[url];

					if (pageOptions) {
						const layoutHtml = pageOptions.layout
							? readLayout(path.resolve(pageOptions.layout))
							: options.defaultLayout
								? readLayout(path.resolve(options.defaultLayout))
								: undefined;

						res.statusCode = 200;
						res.setHeader("Content-Type", "text/html");
						res.end(generateHtml(pageOptions, layoutHtml));
					} else {
						next();
					}
				});
			};
		},

		async generateBundle(): Promise<void> {
			for (const [url, pageOptions] of Object.entries(options.pages)) {
				const layoutHtml = pageOptions.layout
					? readLayout(path.resolve(pageOptions.layout))
					: options.defaultLayout
						? readLayout(path.resolve(options.defaultLayout))
						: undefined;

				this.emitFile({
					type: "asset",
					fileName: `${url === "/" ? "index" : url}.html`,
					source: generateHtml(pageOptions, layoutHtml),
				});
			}
		},
	};
}
