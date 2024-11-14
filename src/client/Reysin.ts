import { createRoot } from "react-dom/client";
import {RenderApp} from "./renderApp.js";

export class Reysin {
  private rootElement: HTMLElement | null = null;

  constructor() {
    this.init().then(() => {
      console.log("Reysin framework initialized and rendered");
    });
  }

  private async init(): Promise<void> {
    try {
      this.render();
    } catch (error) {
      console.error("Failed to initialize or render Reysin framework:", error);
    }
  }

  private render(): void {
    if (!this.rootElement) {
      throw new Error(
        "Root element not found. Make sure the framework is properly initialized.",
      );
    }

    const root = createRoot(this.rootElement);
    root.render(RenderApp());
    console.log("Reysin framework rendered application");
  }
}