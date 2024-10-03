import "reflect-metadata";

export interface Constructor<T = unknown> {
	new (...args: unknown[]): T;
}

export interface ModuleType extends Constructor {
	[key: string]: unknown;
}

export function isModuleType(obj: unknown): obj is ModuleType {
	return typeof obj === "function" && obj.prototype !== undefined;
}

export async function loadModules(appPath: string): Promise<ModuleType[]> {
	const modules: ModuleType[] = [];
	const moduleFiles = import.meta.glob(["/src/apps/**/*.{ts,tsx}"], {
		eager: false,
	});

	for (const path in moduleFiles) {
		if (path.startsWith(appPath) || path.includes("/routes/")) {
			const module = await moduleFiles[path]();
			if (typeof module === "object" && module !== null) {
				const moduleValues = Object.values(module).filter(isModuleType);
				for (const m of moduleValues) {
					modules.push(m);
				}
			}
			await moduleFiles[path]();
		}
	}

	return modules;
}
