import fs from 'fs/promises';
import path from 'path';

/**
 * Interface for route configuration
 */
export interface RouteConfig {
	path: string;
	component: unknown;
	exact?: boolean;
	children?: RouteConfig[];
	[key: string]: unknown;
}

/**
 * Interface for route module class
 */
export interface RouteModule {
	new (): {
		get_config(): RouteConfig;
	};
}

/**
 * Type for dynamically imported module
 */
interface RouteFileModule {
	default: RouteModule;
}

/**
 * Options for file search
 */
interface FileSearchOptions {
	extensions: string[];
	routeFolderName: string;
}

/**
 * Recursively finds all route files in the specified directory
 * @param dir - Directory to search in
 * @param options - Search options for file extensions and route folder name
 * @returns Array of file paths
 */
async function findRouteFiles(
	dir: string,
	options: FileSearchOptions
): Promise<string[]> {
	const files = await fs.readdir(dir, { withFileTypes: true });
	const paths: string[] = [];

	for (const file of files) {
		const fullPath = path.join(dir, file.name);

		if (file.isDirectory()) {
			paths.push(...await findRouteFiles(fullPath, options));
		} else if (
			file.isFile() &&
			options.extensions.some(ext => file.name.endsWith(ext)) &&
			fullPath.includes(`/${options.routeFolderName}/`)
		) {
			paths.push(fullPath);
		}
	}

	return paths;
}

/**
 * Dynamically imports a module from a file path
 * @param filePath - Path to the module file
 * @returns Imported module
 * @throws Error if module import fails
 */
async function importModule(filePath: string): Promise<RouteFileModule> {
	// Convert file path to module path (OS-independent)
	const modulePath = filePath.split(path.sep).join('/');
	return await import(modulePath) as RouteFileModule;
}

/**
 * Error type for route loading failures
 */
export class RouteLoadError extends Error {
	constructor(
		message: string,
		public readonly filePath?: string,
		public readonly originalError?: Error
	) {
		super(message);
		this.name = 'RouteLoadError';
	}
}

/**
 * Loads all route configurations from the apps directory
 * @param options - Optional configuration for route loading
 * @returns Array of route configurations
 * @throws RouteLoadError if the base directory cannot be accessed
 */
export async function loadRoutes(
	options: Partial<FileSearchOptions> = {}
): Promise<RouteConfig[]> {
	const defaultOptions: FileSearchOptions = {
		extensions: ['.ts', '.tsx'],
		routeFolderName: 'routes',
		...options
	};

	try {
		// Start search from the src/apps directory
		const baseDir = path.resolve(process.cwd(), 'src', 'apps');
		const routeFiles = await findRouteFiles(baseDir, defaultOptions);

		const routes: RouteConfig[] = [];
		const loadErrors: RouteLoadError[] = [];

		await Promise.all(routeFiles.map(async (filePath) => {
			try {
				const module = await importModule(filePath);
				const routeInstance = new module.default();
				routes.push(routeInstance.get_config());
			} catch (error) {
				loadErrors.push(new RouteLoadError(
					`Failed to load route`,
					filePath,
					error instanceof Error ? error : undefined
				));
			}
		}));

		// If there were any errors, log them but continue with successfully loaded routes
		if (loadErrors.length > 0) {
			console.error('Errors occurred while loading routes:', loadErrors);
		}

		return routes;
	} catch (error) {
		throw new RouteLoadError(
			'Failed to access routes directory',
			undefined,
			error instanceof Error ? error : undefined
		);
	}
}

/**
 * Example usage:
 * try {
 *   const routes = await loadRoutes({
 *     extensions: ['.ts', '.tsx'],
 *     routeFolderName: 'routes'
 *   });
 *   console.log(routes);
 * } catch (error) {
 *   if (error instanceof RouteLoadError) {
 *     console.error('Route loading failed:', error.message);
 *   }
 * }
 */