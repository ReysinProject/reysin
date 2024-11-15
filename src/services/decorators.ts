export function service<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: InstanceType<T>;

  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this as InstanceType<T>;
    }
  };
}