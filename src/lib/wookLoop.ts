import { createDom } from "./render";
import { IFiberNodeType, NodeFiber } from "./types";

// 存储当前需要处理的 unit
export let nextUnitOfWork: { current: IFiberNodeType | null } = {
  current: null,
};

export function workLoop(deadline: any) {
  let shouldYield: boolean = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork.current = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: IFiberNodeType) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    // 因为是一个深度优先遍历的过程，所以说如果遍历到子的时候，那么父亲一定被首先指定了dom
    fiber.parent.dom!.appendChild(fiber.dom);
  }
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling: IFiberNodeType;
  if (elements.length === 0) return;
  // 这个时候说明 elements 是由长度的，不是TextFiber
  while (index < elements.length) {
    const element = elements[index];
    const newFiber: NodeFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: undefined,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

// while (nextUnitOfWork) {
//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
// }
// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。
