import { IFiberNodeType } from "./types";
import { currentRoot, WipRoot } from "./workStore";

// while (nextUnitOfWork) {
//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
// }
// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。
export function commitRoot() {
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
