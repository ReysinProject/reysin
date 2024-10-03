export async function loadModules(appPath: string): Promise<any[]> {
	const modules: any[] = [];
	const moduleFiles = import.meta.glob('/src/apps/**/*.ts', { eager: false });

	for (const path in moduleFiles) {
		if (path.startsWith(appPath)) {
			const module = await moduleFiles[path]();
			if (typeof module === 'object' && module !== null) {
				modules.push(...Object.values(module));
			}
		}
	}

	return modules;
}