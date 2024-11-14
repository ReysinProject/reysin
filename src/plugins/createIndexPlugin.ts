import type { Plugin, ViteDevServer } from "vite";

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

interface IndexPluginOptions {
	title?: string;
	meta?: MetaTag[];
	links?: LinkTag[];
	scripts?: ScriptTag[];
}

function generateHtml(options: IndexPluginOptions = {}): string {
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
  <div id="app"></div>
  ${scriptTags}
</body>
</html>`;
}

export default function createIndexPlugin(
	options: IndexPluginOptions = {},
): Plugin {
	return {
		name: "generate-index",

		configureServer(server: ViteDevServer): () => void {
			return () => {
				server.middlewares.use((_req, res) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "text/html");
					res.end(generateHtml(options));
				});
			};
		},

		async generateBundle(): Promise<void> {
			this.emitFile({
				type: "asset",
				fileName: "index.html",
				source: generateHtml(options),
			});
		},
	};
}
