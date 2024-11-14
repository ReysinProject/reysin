import {Route} from "./Route.js";

export type RouteModule = {
  default: new () => Route;
};