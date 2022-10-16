import { render, createElement } from "./render";
import { workLoop } from "./workLoop";
export * from "./types";

requestIdleCallback(workLoop);

export const Didact = {
  createElement,
  render,
};
