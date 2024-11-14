import {Route} from "@reysin/project"
import React from "react";

class TodoHomeRoute extends Route {
    loader() {}

    component() {
        return (
            <p>
                test
            </p>
        )
    }

    path = "/";
}