import { IFiberNodeType } from "../types";
import { deletions } from "../workStore";

// react 的调和函数
export function reconcileChildren(
  wipFiber: IFiberNodeType,
  elements: IFiberNodeType[]
) {
  let index = 0;
  let prevSibling = null;
  // 要知道，在第一次渲染的时候，是没有 alternate 的
  let oldFiber = wipFiber.alternate?.child;
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber: IFiberNodeType;
    // 现在我们已经拿到了之前的 oldFiberNode 和 我们新的 fiberNode 这个时候，我们需要进行对比。
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      newFiber = {
        type: oldFiber!.type,
        props: element.props,
        dom: oldFiber!.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: undefined,
        parent: wipFiber,
        alternate: undefined,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.current.push(oldFiber);
    }

    // const newFiber: IFiberNodeType = {
    //   type: element.type,
    //   props: element.props,
    //   parent: wipFiber,
    //   dom: undefined,
    // };
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber!;
    } else {
      prevSibling!.sibling = newFiber!;
    }
    prevSibling = newFiber!;
    index++;
  }
  // 核心的递归的逻辑在这里，对于每一次 requestIdleCallback 在 performUnitOfWork 阶段会进行该 fiber 节点的修改，就是fiber节点创建出来，其中包含了创建他的所有子节点，并将子节点的 sibling 联系建立起来，以及parent属性建立起来。
}
