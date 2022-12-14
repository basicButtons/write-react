import { render, createElement } from "./render";
import { workLoop } from "./workLoop";
import { useState } from "./hooks";
import { useEffect } from "./hooks";
export * from "./types";

requestIdleCallback(workLoop);

export const Didact = {
  createElement,
  render,
  useState,
  useEffect,
};
