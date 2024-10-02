import { observer as mobxObserver } from "mobx-react-lite";
import type React from "react";

export function observer<T extends React.ComponentType<any>>(target: T): T {
	return mobxObserver(target as React.FunctionComponent<any>) as any;
}
