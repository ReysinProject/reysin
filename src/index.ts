import cli from "./cli/cli.js";

export { Application } from "./core/Application.js";
export { Router } from "./core/Router.js";
export { Container } from "./core/Container.js";
export { BaseViewModel } from "./core/BaseViewModel.js";
export { BaseService } from "./core/BaseService.js";
export { BaseModel } from "./core/BaseModel.js";
export { injectable } from "./decorators/injectable.js";
export { singleton } from "./decorators/singleton.js";
export { transient } from "./decorators/transient.js";
export { route } from "./decorators/route.js";
export { observer } from "./decorators/observer.js";

cli.parse(process.argv);