import { createDom } from "./render";
import { IFiberNodeType } from "./types";

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

// react 的调和函数
function reconcileChildren(
  wipFiber: IFiberNodeType,
  elements: IFiberNodeType[]
) {
  let index = 0;
  let prevSibling = null;
  // 要知道，在第一次渲染的时候，是没有 alternate 的
  let oldFiber = wipFiber.alternate?.child;
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];

    // 现在我们已经拿到了之前的 oldFiberNode 和 我们新的 fiberNode 这个时候，我们需要进行对比。
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      // TODO update the node
    }
    if (element && !sameType) {
      // TODO add this node
    }
    if (oldFiber && !sameType) {
      // TODO delete the oldFiber's node
    }

    const newFiber: IFiberNodeType = {
      type: element.type,
      props: element.props,
      parent: wipFiber,
      dom: undefined,
    };
    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling!.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // 核心的递归的逻辑在这里，对于每一次 requestIdleCallback 在 performUnitOfWork 阶段会进行该 fiber 节点的修改，就是fiber节点创建出来，其中包含了创建他的所有子节点，并将子节点的 sibling 联系建立起来，以及parent属性建立起来。
}
