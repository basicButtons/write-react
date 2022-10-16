import { createDom } from "./render";
import { IFiberNodeType, NodeFiber } from "./types";
import { currentRoot, nextUnitOfWork, WipRoot } from "./workStore";

export function workLoop(deadline: any) {
  let shouldYield: boolean = false;
  while (nextUnitOfWork.current && !shouldYield) {
    nextUnitOfWork.current = performUnitOfWork(nextUnitOfWork.current);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork.current && WipRoot.current) {
    commitRoot();
  }
  // 上面是 render 的过程，我们建立的 fiber tree 下面我会把 fiber tree commit 到 真实的 dom 上去
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: IFiberNodeType): IFiberNodeType | undefined {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // if (fiber.parent) {
  //   // 因为是一个深度优先遍历的过程，所以说如果遍历到子的时候，那么父亲一定被首先指定了dom
  //   fiber.parent.dom!.appendChild(fiber.dom);
  // }
  // 关闭在 performUnitOfWork 阶段的 dom 操作。
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling: IFiberNodeType;
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
      prevSibling!.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // 核心的递归的逻辑在这里，对于每一次 requestIdleCallback 在 performUnitOfWork 阶段会进行该 fiber 节点的修改，就是fiber节点创建出来，其中包含了创建他的所有子节点，并将子节点的 sibling 联系建立起来，以及parent属性建立起来。

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent!;
  }

  // 当有子节点的时候，我们去把下一个 unitWork 设置为 sibling ，当没有子节点的时候，我们将其设置为他的parent。然后去便利该parent 的 sibling 然后再去parent 的 parent直到结束。
}

// while (nextUnitOfWork) {
//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
// }
// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。

function commitRoot() {
  // console.log("WipRoot.current", WipRoot.current);
  // console.log("nextUnitOfWork.current", nextUnitOfWork.current);
  commitWork(WipRoot.current!.child);
  // 当 commit 阶段结束之后， 我们将目前构建的那个 fiber tree 交给 currentRoot 这个就很好理解了，就是两个 tree 了，再次 render 的时候还是在 WipRoot中调用。
  currentRoot.current = WipRoot.current;
  WipRoot.current = undefined;
  console.log(currentRoot.current);
}
// 在执行完所有的 rerender 之后，我们会去进行 commit 工作，但是在这个阶段，我们还是同步的过程，该过程同样也是 dfs 的过程。
function commitWork(fiber: IFiberNodeType | undefined) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent!.dom;
  domParent!.appendChild(fiber.dom!);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
