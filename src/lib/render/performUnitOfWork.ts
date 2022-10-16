import { reconcileChildren } from "./reconcileChildren";
import { createDom } from "./render";
import { FunctionFiber, IFiberNodeType } from "../types";
import { hookIndex, wipFiber } from "../workStore";

export function performUnitOfWork(
  fiber: IFiberNodeType
): IFiberNodeType | undefined {
  // 当引入 funciton component 的时候，主要有两个区别
  // 1. the fiber from a function component doesn’t have a DOM node
  // 2. the children come from running the function instead of getting them directly from the props
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    // function component
    updateFunctionComponent(fiber as FunctionFiber);
  } else {
    updateHostComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber: IFiberNodeType = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent!;
  }
  // 当有子节点的时候，我们去把下一个 unitWork 设置为 sibling ，当没有子节点的时候，我们将其设置为他的parent。然后去便利该parent 的 sibling 然后再去parent 的 parent直到结束。
}

function updateFunctionComponent(fiber: FunctionFiber) {
  // 对于 Function Component，在 render 的时候，会执行一次。
  wipFiber.current = fiber;
  hookIndex.current = 0;
  wipFiber.current.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: IFiberNodeType) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber as Exclude<IFiberNodeType, FunctionFiber>);
  }
  reconcileChildren(fiber, fiber.props.children);
}
