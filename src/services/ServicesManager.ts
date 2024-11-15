import consola from "consola";

type ServiceConstructor = new (...args: unknown[]) => object;

export class ServicesManager {
  private static instance: ServicesManager;
  private services: Record<string, new (...args: unknown[]) => object> = {};

  constructor() {
    if (!ServicesManager.instance) {
      ServicesManager.instance = new ServicesManager();
      ServicesManager.instance.loadServices();
    }
    return ServicesManager.instance;
  }

  private loadServices() {
    const context = import.meta.glob('/src/apps/**/services/**.ts', { eager: true }) as {[key: string]: {[key: string]: ServiceConstructor}};
    console.log(context)
    for (const path in context) {
      try {
        const serviceModule = context[path];
        console.log(serviceModule)
        const keys = Object.keys(serviceModule)
        console.log(keys)

        for (let key of keys) {
          console.log(key)
          console.log(serviceModule[key])
          this.services[key] = serviceModule[key];
        }
        console.log(this.services)
      } catch (error) {
        consola.error(`Error loading service at path ${path}:`, error);
      }
    }
  }

  getService<T extends new (...args: unknown[]) => object>(serviceName: string): InstanceType<T> {
    if (!this.services[serviceName]) {
      throw new Error(`Service "${serviceName}" not found.`);
    }
    return new this.services[serviceName]() as InstanceType<T>;
  }
}