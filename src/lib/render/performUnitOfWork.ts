import { reconcileChildren } from "./reconcileChildren";
import { createDom } from "./render";
import { IFiberNodeType } from "../types";

export function performUnitOfWork(
  fiber: IFiberNodeType
): IFiberNodeType | undefined {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
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
