import fs from 'node:fs/promises';
import path from 'node:path';

export async function loadModules(dir: string): Promise<any[]> {
	const modules: any[] = [];
	const files = await fs.readdir(dir, { withFileTypes: true });

	for (const file of files) {
		const fullPath = path.join(dir, file.name);

		if (file.isDirectory()) {
			modules.push(...await loadModules(fullPath));
		} else if (file.isFile() && /\.(ts|js)$/.test(file.name)) {
			const module = await import(fullPath);
			modules.push(...Object.values(module));
		}
	}

	return modules;
}