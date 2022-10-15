import { createElement, createTextElement } from "./createElement";
import { render } from "./render";
import { workLoop } from "./wookLoop";
export * from "./types"
// requestIdleCallback(workLoop);

export const Didact = {
  createElement,
  createTextElement,
  render,
};
