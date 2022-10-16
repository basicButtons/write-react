import { FunctionFiber, IFiberNodeType } from "./types";

// 存储当前需要处理的 unit
export let nextUnitOfWork: { current: IFiberNodeType | undefined } = {
  current: undefined,
};

export let WipRoot: { current: IFiberNodeType | undefined } = {
  current: undefined,
};

export let currentRoot: { current: IFiberNodeType | undefined } = {
  current: undefined,
};

export let deletions: { current: IFiberNodeType[] } = {
  current: [],
};

export let hookIndex: { current: number } = {
  current: 0,
};

export let wipFiber: { current: FunctionFiber | undefined } = {
  current: undefined,
};
