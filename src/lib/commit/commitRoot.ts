import { currentRoot, deletions, WipRoot } from "../workStore";
import { commitWork } from "./commitWork";

// while (nextUnitOfWork) {
//   nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
// }
// 其实wookLopp可以简单的理解为 while(newUnitOfWork)  perform 只不过是 套用了一下 requestIdleCallback 而已。
export function commitRoot() {
  // 首先将 各个 deletions 执行了
  deletions.current.forEach(commitWork);
  commitWork(WipRoot.current!.child);
  // 当 commit 阶段结束之后， 我们将目前构建的那个 fiber tree 交给 currentRoot 这个就很好理解了，就是两个 tree 了，再次 render 的时候还是在 WipRoot中调用。
  currentRoot.current = WipRoot.current;
  WipRoot.current = undefined;
}
