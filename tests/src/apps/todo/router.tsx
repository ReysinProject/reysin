import {defineRoutes} from "@reysin/project";
import {lazy} from "react";
import {ofetch} from "ofetch";


export default defineRoutes([
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    prefetch: () => ofetch('/api/home-data')
  },
])